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
  type InsertMaintenanceSchedule
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
}

// In-memory fallback implementation for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private projects: Map<number, Project>;
  private projectUpdates: Map<number, ProjectUpdate>;
  private maintenanceSchedules: Map<number, MaintenanceSchedule>;
  currentId: number;
  contactRequestId: number;
  projectId: number;
  updateId: number;
  scheduleId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.projects = new Map();
    this.projectUpdates = new Map();
    this.maintenanceSchedules = new Map();
    this.currentId = 1;
    this.contactRequestId = 1;
    this.projectId = 1;
    this.updateId = 1;
    this.scheduleId = 1;
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
}

// Use database storage when pool is available, otherwise fall back to in-memory
export const storage = pool ? new DbStorage() : new MemStorage();
