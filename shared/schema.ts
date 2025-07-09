import { pgTable, text, serial, integer, boolean, timestamp, varchar, date, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (from existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact requests table
export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isResolved: boolean("is_resolved").default(false).notNull()
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof contactSchema>;

// Projects table for tracking client projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("quote_requested"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  actualCost: decimal("actual_cost", { precision: 10, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Project updates for tracking progress
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  photos: text("photos").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Maintenance schedules for recurring services
export const maintenanceSchedules = pgTable("maintenance_schedules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  frequency: varchar("frequency", { length: 50 }).notNull(), // weekly, monthly, quarterly, annually
  nextDate: date("next_date").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schema validations for new tables
export const projectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  serviceType: true,
  status: true,
  startDate: true,
  endDate: true,
  estimatedCost: true,
  notes: true,
});

export const projectUpdateSchema = createInsertSchema(projectUpdates).pick({
  title: true,
  description: true,
  status: true,
  photos: true,
});

export const maintenanceScheduleSchema = createInsertSchema(maintenanceSchedules).pick({
  serviceType: true,
  frequency: true,
  nextDate: true,
  description: true,
});

// Types for new tables
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof projectSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type InsertProjectUpdate = z.infer<typeof projectUpdateSchema>;
export type MaintenanceSchedule = typeof maintenanceSchedules.$inferSelect;
export type InsertMaintenanceSchedule = z.infer<typeof maintenanceScheduleSchema>;

// Sustainability assessments table
export const sustainabilityAssessments = pgTable("sustainability_assessments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  overallScore: integer("overall_score").notNull(), // 1-100 sustainability score
  waterEfficiencyScore: integer("water_efficiency_score").notNull(),
  biodiversityScore: integer("biodiversity_score").notNull(),
  carbonFootprintScore: integer("carbon_footprint_score").notNull(),
  soilHealthScore: integer("soil_health_score").notNull(),
  wasteReductionScore: integer("waste_reduction_score").notNull(),
  
  // Specific eco-friendly features
  nativePlants: boolean("native_plants").default(false),
  droughtResistantPlants: boolean("drought_resistant_plants").default(false),
  rainwaterHarvesting: boolean("rainwater_harvesting").default(false),
  solarLighting: boolean("solar_lighting").default(false),
  compostSystem: boolean("compost_system").default(false),
  permaculture: boolean("permaculture").default(false),
  organicMaterials: boolean("organic_materials").default(false),
  wildlifeHabitat: boolean("wildlife_habitat").default(false),
  
  // Additional details
  recommendations: text("recommendations"),
  improvementSuggestions: text("improvement_suggestions"),
  certificationLevel: varchar("certification_level", { length: 50 }), // Bronze, Silver, Gold, Platinum
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sustainabilityAssessmentSchema = createInsertSchema(sustainabilityAssessments).pick({
  projectId: true,
  overallScore: true,
  waterEfficiencyScore: true,
  biodiversityScore: true,
  carbonFootprintScore: true,
  soilHealthScore: true,
  wasteReductionScore: true,
  nativePlants: true,
  droughtResistantPlants: true,
  rainwaterHarvesting: true,
  solarLighting: true,
  compostSystem: true,
  permaculture: true,
  organicMaterials: true,
  wildlifeHabitat: true,
  recommendations: true,
  improvementSuggestions: true,
  certificationLevel: true,
});

export type SustainabilityAssessment = typeof sustainabilityAssessments.$inferSelect;
export type InsertSustainabilityAssessment = z.infer<typeof sustainabilityAssessmentSchema>;

// Import booking-related schemas
export * from './booking-schema';
