import { 
  type User, 
  type InsertUser, 
  type ContactRequest, 
  type InsertContactRequest,
  type Project,
  type InsertProject,
  type ProjectUpdate,
  type InsertProjectUpdate,
  type MaintenanceSchedule,
  type InsertMaintenanceSchedule,
  type Booking,
  type InsertBooking,
  type ChatMessage,
  type InsertChatMessage,
  type SustainabilityAssessment,
  type InsertSustainabilityAssessment
} from "@shared/schema";
import { Pool } from "pg";

// Create a single connection pool
let pool: Pool | undefined;

// Initialize database connection
function initializeDatabase() {
  if (pool) return; // Already initialized
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log("No database connection string available, using in-memory storage");
    return;
  }
  
  try {
    pool = new Pool({ connectionString });
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    pool = undefined;
  }
}

// Initialize the database when this module is loaded
initializeDatabase();

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  
  // Project management
  createProject(project: InsertProject & { userId: number }): Promise<Project>;
  getUserProjects(userId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project>;
  
  // Project updates
  createProjectUpdate(update: InsertProjectUpdate & { projectId: number }): Promise<ProjectUpdate>;
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  
  // Maintenance schedules
  createMaintenanceSchedule(schedule: InsertMaintenanceSchedule & { userId: number }): Promise<MaintenanceSchedule>;
  getUserMaintenanceSchedules(userId: number): Promise<MaintenanceSchedule[]>;
  updateMaintenanceSchedule(id: number, updates: Partial<InsertMaintenanceSchedule>): Promise<MaintenanceSchedule>;
  getUpcomingMaintenance(userId: number): Promise<MaintenanceSchedule[]>;
  
  // Booking management
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(date?: Date): Promise<Booking[]>;
  updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking>;
  
  // Chat messages
  saveChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: string, limit?: number): Promise<ChatMessage[]>;
  
  // Sustainability assessments
  createSustainabilityAssessment(assessment: InsertSustainabilityAssessment): Promise<SustainabilityAssessment>;
  getSustainabilityAssessment(projectId: number): Promise<SustainabilityAssessment | undefined>;
  updateSustainabilityAssessment(projectId: number, updates: Partial<InsertSustainabilityAssessment>): Promise<SustainabilityAssessment>;
  calculateSustainabilityScore(features: Partial<InsertSustainabilityAssessment>): Promise<number>;
}

// Database implementation of storage interface
export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!pool) return undefined;
    
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!pool) return undefined;
    
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [insertUser.username, insertUser.password]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO contact_requests (name, email, phone, service, message, created_at, is_resolved) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [
          request.name,
          request.email,
          request.phone,
          request.service,
          request.message,
          new Date(),
          false
        ]
      );
      
      console.log('Contact request saved to database:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact request:', error);
      throw error;
    }
  }

  // Project management methods
  async createProject(project: InsertProject & { userId: number }): Promise<Project> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO projects (user_id, title, description, service_type, status, start_date, end_date, estimated_cost, notes, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [
          project.userId,
          project.title,
          project.description,
          project.serviceType,
          project.status || 'quote_requested',
          project.startDate,
          project.endDate,
          project.estimatedCost,
          project.notes,
          new Date(),
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    if (!pool) return [];
    
    try {
      const result = await pool.query(
        'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting user projects:', error);
      return [];
    }
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!pool) return undefined;
    
    try {
      const result = await pool.query(
        'SELECT * FROM projects WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting project:', error);
      return undefined;
    }
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');
      
      const result = await pool.query(
        `UPDATE projects SET ${setClause}, updated_at = $1 WHERE id = $${Object.keys(updates).length + 2} RETURNING *`,
        [new Date(), ...Object.values(updates), id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Project updates methods
  async createProjectUpdate(update: InsertProjectUpdate & { projectId: number }): Promise<ProjectUpdate> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO project_updates (project_id, title, description, status, photos, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          update.projectId,
          update.title,
          update.description,
          update.status,
          update.photos,
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating project update:', error);
      throw error;
    }
  }

  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    if (!pool) return [];
    
    try {
      const result = await pool.query(
        'SELECT * FROM project_updates WHERE project_id = $1 ORDER BY created_at DESC',
        [projectId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting project updates:', error);
      return [];
    }
  }

  // Maintenance schedules methods
  async createMaintenanceSchedule(schedule: InsertMaintenanceSchedule & { userId: number }): Promise<MaintenanceSchedule> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO maintenance_schedules (user_id, service_type, frequency, next_date, description, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          schedule.userId,
          schedule.serviceType,
          schedule.frequency,
          schedule.nextDate,
          schedule.description,
          true,
          new Date(),
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating maintenance schedule:', error);
      throw error;
    }
  }

  async getUserMaintenanceSchedules(userId: number): Promise<MaintenanceSchedule[]> {
    if (!pool) return [];
    
    try {
      const result = await pool.query(
        'SELECT * FROM maintenance_schedules WHERE user_id = $1 ORDER BY next_date ASC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting user maintenance schedules:', error);
      return [];
    }
  }

  async updateMaintenanceSchedule(id: number, updates: Partial<InsertMaintenanceSchedule>): Promise<MaintenanceSchedule> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');
      
      const result = await pool.query(
        `UPDATE maintenance_schedules SET ${setClause}, updated_at = $1 WHERE id = $${Object.keys(updates).length + 2} RETURNING *`,
        [new Date(), ...Object.values(updates), id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating maintenance schedule:', error);
      throw error;
    }
  }

  async getUpcomingMaintenance(userId: number): Promise<MaintenanceSchedule[]> {
    if (!pool) return [];
    
    try {
      const result = await pool.query(
        'SELECT * FROM maintenance_schedules WHERE user_id = $1 AND is_active = true AND next_date >= CURRENT_DATE ORDER BY next_date ASC LIMIT 10',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting upcoming maintenance:', error);
      return [];
    }
  }

  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO bookings (customer_name, customer_email, customer_phone, service_type, appointment_date, duration, notes, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [
          booking.customerName,
          booking.customerEmail,
          booking.customerPhone,
          booking.serviceType,
          booking.appointmentDate,
          booking.duration,
          booking.notes,
          'pending',
          new Date(),
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async getBookings(date?: Date): Promise<Booking[]> {
    if (!pool) return [];
    
    try {
      let query = 'SELECT * FROM bookings';
      let params: any[] = [];
      
      if (date) {
        query += ' WHERE DATE(appointment_date) = DATE($1)';
        params.push(date);
      }
      
      query += ' ORDER BY appointment_date ASC, time_slot ASC';
      
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  }

  async updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');
      
      const result = await pool.query(
        `UPDATE bookings SET ${setClause}, updated_at = $1 WHERE id = $${Object.keys(updates).length + 2} RETURNING *`,
        [new Date(), ...Object.values(updates), id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  // Chat methods
  async saveChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        'INSERT INTO chat_messages (session_id, message, sender, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
        [message.sessionId, message.message, message.sender, new Date()]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  }

  async getChatHistory(sessionId: string, limit: number = 10): Promise<ChatMessage[]> {
    if (!pool) return [];
    
    try {
      const result = await pool.query(
        'SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY timestamp ASC LIMIT $2',
        [sessionId, limit]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }

  // Sustainability assessment methods
  async createSustainabilityAssessment(assessment: InsertSustainabilityAssessment): Promise<SustainabilityAssessment> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const result = await pool.query(
        `INSERT INTO sustainability_assessments (
          project_id, overall_score, water_efficiency_score, biodiversity_score, 
          carbon_footprint_score, soil_health_score, waste_reduction_score,
          native_plants, drought_resistant_plants, rainwater_harvesting, solar_lighting,
          compost_system, permaculture, organic_materials, wildlife_habitat,
          recommendations, improvement_suggestions, certification_level, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
        RETURNING *`,
        [
          assessment.projectId,
          assessment.overallScore,
          assessment.waterEfficiencyScore,
          assessment.biodiversityScore,
          assessment.carbonFootprintScore,
          assessment.soilHealthScore,
          assessment.wasteReductionScore,
          assessment.nativePlants || false,
          assessment.droughtResistantPlants || false,
          assessment.rainwaterHarvesting || false,
          assessment.solarLighting || false,
          assessment.compostSystem || false,
          assessment.permaculture || false,
          assessment.organicMaterials || false,
          assessment.wildlifeHabitat || false,
          assessment.recommendations,
          assessment.improvementSuggestions,
          assessment.certificationLevel,
          new Date(),
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating sustainability assessment:', error);
      throw error;
    }
  }

  async getSustainabilityAssessment(projectId: number): Promise<SustainabilityAssessment | undefined> {
    if (!pool) return undefined;
    
    try {
      const result = await pool.query(
        'SELECT * FROM sustainability_assessments WHERE project_id = $1',
        [projectId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting sustainability assessment:', error);
      return undefined;
    }
  }

  async updateSustainabilityAssessment(projectId: number, updates: Partial<InsertSustainabilityAssessment>): Promise<SustainabilityAssessment> {
    if (!pool) throw new Error("Database connection not available");
    
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');
      
      const result = await pool.query(
        `UPDATE sustainability_assessments SET ${setClause}, updated_at = $1 WHERE project_id = $${Object.keys(updates).length + 2} RETURNING *`,
        [new Date(), ...Object.values(updates), projectId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating sustainability assessment:', error);
      throw error;
    }
  }

  async calculateSustainabilityScore(features: Partial<InsertSustainabilityAssessment>): Promise<number> {
    // Calculate overall sustainability score based on various factors
    let score = 0;
    
    // Base scores for different categories (out of 100)
    const waterScore = features.waterEfficiencyScore || 0;
    const biodiversityScore = features.biodiversityScore || 0;
    const carbonScore = features.carbonFootprintScore || 0;
    const soilScore = features.soilHealthScore || 0;
    const wasteScore = features.wasteReductionScore || 0;
    
    // Average of category scores
    score = (waterScore + biodiversityScore + carbonScore + soilScore + wasteScore) / 5;
    
    // Bonus points for eco-friendly features (up to 20 points)
    let bonusPoints = 0;
    if (features.nativePlants) bonusPoints += 3;
    if (features.droughtResistantPlants) bonusPoints += 3;
    if (features.rainwaterHarvesting) bonusPoints += 4;
    if (features.solarLighting) bonusPoints += 2;
    if (features.compostSystem) bonusPoints += 3;
    if (features.permaculture) bonusPoints += 2;
    if (features.organicMaterials) bonusPoints += 2;
    if (features.wildlifeHabitat) bonusPoints += 1;
    
    score = Math.min(100, score + bonusPoints);
    
    return Math.round(score);
  }
}

// In-memory fallback implementation for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private projects: Map<number, Project>;
  private projectUpdates: Map<number, ProjectUpdate>;
  private maintenanceSchedules: Map<number, MaintenanceSchedule>;
  private bookings: Map<number, Booking>;
  private chatMessages: Map<number, ChatMessage>;
  private sustainabilityAssessments: Map<number, SustainabilityAssessment>;
  currentId: number;
  contactRequestId: number;
  projectId: number;
  updateId: number;
  scheduleId: number;
  bookingId: number;
  chatMessageId: number;
  sustainabilityId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.projects = new Map();
    this.projectUpdates = new Map();
    this.maintenanceSchedules = new Map();
    this.bookings = new Map();
    this.chatMessages = new Map();
    this.sustainabilityAssessments = new Map();
    this.currentId = 1;
    this.contactRequestId = 1;
    this.projectId = 1;
    this.updateId = 1;
    this.scheduleId = 1;
    this.bookingId = 1;
    this.chatMessageId = 1;
    this.sustainabilityId = 1;
    
    // Add sample data for testing
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Create a test user
    const testUser: User = {
      id: 1,
      username: 'demo',
      password: 'demo',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(1, testUser);
    this.currentId = 2;
    
    // Add sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        userId: 1,
        title: 'Front Garden Landscaping',
        serviceType: 'Full Landscape Design',
        description: 'Complete redesign of front garden including new lawn, flower beds, and pathway',
        status: 'in_progress',
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-02-15'),
        estimatedCost: 2500,
        notes: 'Client wants low-maintenance plants',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        title: 'Back Garden Fence Installation',
        serviceType: 'Fencing, Sleepers & Decking',
        description: 'Install new wooden fence panels around back garden perimeter',
        status: 'completed',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-10'),
        estimatedCost: 800,
        notes: 'Completed ahead of schedule',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
    this.projectId = 3;
    
    // Add sample maintenance schedules
    const sampleSchedules: MaintenanceSchedule[] = [
      {
        id: 1,
        userId: 1,
        serviceType: 'Garden Maintenance',
        frequency: 'monthly',
        nextDate: new Date('2025-02-01'),
        description: 'Regular lawn mowing and hedge trimming',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        serviceType: 'Gutter Cleaning',
        frequency: 'quarterly',
        nextDate: new Date('2025-03-15'),
        description: 'Clean and inspect gutters',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleSchedules.forEach(schedule => {
      this.maintenanceSchedules.set(schedule.id, schedule);
    });
    this.scheduleId = 3;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const id = this.contactRequestId++;
    const contactRequest: ContactRequest = { 
      ...request, 
      id,
      createdAt: new Date(),
      isResolved: false
    };
    this.contactRequests.set(id, contactRequest);
    console.log('Contact request received (in-memory storage):', contactRequest);
    return contactRequest;
  }

  // Project management methods
  async createProject(project: InsertProject & { userId: number }): Promise<Project> {
    const id = this.projectId++;
    const newProject: Project = {
      ...project,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing) throw new Error('Project not found');
    
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  // Project updates methods
  async createProjectUpdate(update: InsertProjectUpdate & { projectId: number }): Promise<ProjectUpdate> {
    const id = this.updateId++;
    const newUpdate: ProjectUpdate = {
      ...update,
      id,
      createdAt: new Date()
    };
    this.projectUpdates.set(id, newUpdate);
    return newUpdate;
  }

  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    return Array.from(this.projectUpdates.values())
      .filter(update => update.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Maintenance schedules methods
  async createMaintenanceSchedule(schedule: InsertMaintenanceSchedule & { userId: number }): Promise<MaintenanceSchedule> {
    const id = this.scheduleId++;
    const newSchedule: MaintenanceSchedule = {
      ...schedule,
      id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.maintenanceSchedules.set(id, newSchedule);
    return newSchedule;
  }

  async getUserMaintenanceSchedules(userId: number): Promise<MaintenanceSchedule[]> {
    return Array.from(this.maintenanceSchedules.values())
      .filter(schedule => schedule.userId === userId)
      .sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime());
  }

  async updateMaintenanceSchedule(id: number, updates: Partial<InsertMaintenanceSchedule>): Promise<MaintenanceSchedule> {
    const existing = this.maintenanceSchedules.get(id);
    if (!existing) throw new Error('Maintenance schedule not found');
    
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.maintenanceSchedules.set(id, updated);
    return updated;
  }

  async getUpcomingMaintenance(userId: number): Promise<MaintenanceSchedule[]> {
    const today = new Date();
    return Array.from(this.maintenanceSchedules.values())
      .filter(schedule => 
        schedule.userId === userId && 
        schedule.isActive && 
        new Date(schedule.nextDate) >= today
      )
      .sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())
      .slice(0, 10);
  }

  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const newBooking: Booking = {
      ...booking,
      id,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.bookings.set(id, newBooking);
    console.log('Booking created (in-memory storage):', newBooking);
    return newBooking;
  }

  async getBookings(date?: Date): Promise<Booking[]> {
    let bookings = Array.from(this.bookings.values());
    
    if (date) {
      const targetDate = new Date(date).toDateString();
      bookings = bookings.filter(booking => 
        new Date(booking.appointmentDate).toDateString() === targetDate
      );
    }
    
    return bookings.sort((a, b) => 
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    );
  }

  async updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking> {
    const existing = this.bookings.get(id);
    if (!existing) throw new Error('Booking not found');
    
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.bookings.set(id, updated);
    return updated;
  }

  // Chat methods
  async saveChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageId++;
    const newMessage: ChatMessage = {
      ...message,
      id,
      timestamp: new Date()
    };
    this.chatMessages.set(id, newMessage);
    return newMessage;
  }

  async getChatHistory(sessionId: string, limit: number = 10): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .slice(-limit);
  }

  // Sustainability assessment methods
  async createSustainabilityAssessment(assessment: InsertSustainabilityAssessment): Promise<SustainabilityAssessment> {
    const id = this.sustainabilityId++;
    const newAssessment: SustainabilityAssessment = {
      ...assessment,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.sustainabilityAssessments.set(id, newAssessment);
    return newAssessment;
  }

  async getSustainabilityAssessment(projectId: number): Promise<SustainabilityAssessment | undefined> {
    return Array.from(this.sustainabilityAssessments.values())
      .find(assessment => assessment.projectId === projectId);
  }

  async updateSustainabilityAssessment(projectId: number, updates: Partial<InsertSustainabilityAssessment>): Promise<SustainabilityAssessment> {
    const existing = Array.from(this.sustainabilityAssessments.values())
      .find(assessment => assessment.projectId === projectId);
    
    if (!existing) throw new Error('Sustainability assessment not found');
    
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.sustainabilityAssessments.set(existing.id, updated);
    return updated;
  }

  async calculateSustainabilityScore(features: Partial<InsertSustainabilityAssessment>): Promise<number> {
    // Calculate overall sustainability score based on various factors
    let score = 0;
    
    // Base scores for different categories (out of 100)
    const waterScore = features.waterEfficiencyScore || 0;
    const biodiversityScore = features.biodiversityScore || 0;
    const carbonScore = features.carbonFootprintScore || 0;
    const soilScore = features.soilHealthScore || 0;
    const wasteScore = features.wasteReductionScore || 0;
    
    // Average of category scores
    score = (waterScore + biodiversityScore + carbonScore + soilScore + wasteScore) / 5;
    
    // Bonus points for eco-friendly features (up to 20 points)
    let bonusPoints = 0;
    if (features.nativePlants) bonusPoints += 3;
    if (features.droughtResistantPlants) bonusPoints += 3;
    if (features.rainwaterHarvesting) bonusPoints += 4;
    if (features.solarLighting) bonusPoints += 2;
    if (features.compostSystem) bonusPoints += 3;
    if (features.permaculture) bonusPoints += 2;
    if (features.organicMaterials) bonusPoints += 2;
    if (features.wildlifeHabitat) bonusPoints += 1;
    
    score = Math.min(100, score + bonusPoints);
    
    return Math.round(score);
  }
}

// Use database storage when pool is available, otherwise fall back to in-memory
export const storage = pool ? new DbStorage() : new MemStorage();
