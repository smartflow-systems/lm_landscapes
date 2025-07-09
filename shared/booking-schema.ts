import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Booking table for storing appointments
export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
  serviceType: varchar("service_type", { length: 255 }).notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(60), // minutes
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  notes: text("notes"),
  googleEventId: varchar("google_event_id", { length: 255}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Available time slots table
export const availableSlots = pgTable("available_slots", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  date: timestamp("date").notNull(),
  startTime: varchar("start_time", { length: 10 }).notNull(), // HH:MM format
  endTime: varchar("end_time", { length: 10 }).notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat messages for the AI chatbot
export const chatMessages = pgTable("chat_messages", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  message: text("message").notNull(),
  sender: varchar("sender", { length: 50 }).notNull(), // 'user' or 'assistant'
  timestamp: timestamp("timestamp").defaultNow(),
});

// Booking schema validation
export const bookingSchema = createInsertSchema(bookings).pick({
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  serviceType: true,
  appointmentDate: true,
  duration: true,
  notes: true,
}).extend({
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  appointmentDate: z.string().transform((str) => new Date(str)),
});

// Chat message schema
export const chatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  message: true,
  sender: true,
});

// Types
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof bookingSchema>;
export type AvailableSlot = typeof availableSlots.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof chatMessageSchema>;