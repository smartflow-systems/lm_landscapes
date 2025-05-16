import { type User, type InsertUser, type ContactRequest, type InsertContactRequest } from "@shared/schema";
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
}

// In-memory fallback implementation for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  currentId: number;
  contactRequestId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.currentId = 1;
    this.contactRequestId = 1;
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
}

// Use database storage when pool is available, otherwise fall back to in-memory
export const storage = pool ? new DbStorage() : new MemStorage();
