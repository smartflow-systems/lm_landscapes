import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, projectSchema, projectUpdateSchema, maintenanceScheduleSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact request
      const contactRequest = await storage.createContactRequest(validatedData);
      
      // Send back a success response
      res.status(200).json({
        success: true,
        message: 'Contact request received successfully',
        requestId: contactRequest.id
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: validationError.message
        });
        return;
      }
      
      // Handle other errors
      console.error('Error processing contact request:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process contact request'
      });
    }
  });

  // User authentication endpoint (simple mock for now)
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // For demo purposes, create a test user if none exists
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser({ username, password });
      }
      
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  // Projects endpoints
  app.get('/api/projects', async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required' });
      }
      
      const projects = await storage.getUserProjects(userId);
      res.json({ success: true, projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
  });

  app.post('/api/projects', async (req, res) => {
    try {
      const validatedData = projectSchema.parse(req.body);
      const userId = parseInt(req.body.userId);
      
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required' });
      }
      
      const project = await storage.createProject({ ...validatedData, userId });
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      console.error('Error creating project:', error);
      res.status(500).json({ success: false, message: 'Failed to create project' });
    }
  });

  app.get('/api/projects/:id/updates', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const updates = await storage.getProjectUpdates(projectId);
      res.json({ success: true, updates });
    } catch (error) {
      console.error('Error fetching project updates:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch project updates' });
    }
  });

  app.post('/api/projects/:id/updates', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const validatedData = projectUpdateSchema.parse(req.body);
      
      const update = await storage.createProjectUpdate({ ...validatedData, projectId });
      res.json({ success: true, update });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      console.error('Error creating project update:', error);
      res.status(500).json({ success: false, message: 'Failed to create project update' });
    }
  });

  // Maintenance schedules endpoints
  app.get('/api/maintenance', async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required' });
      }
      
      const schedules = await storage.getUserMaintenanceSchedules(userId);
      res.json({ success: true, schedules });
    } catch (error) {
      console.error('Error fetching maintenance schedules:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch maintenance schedules' });
    }
  });

  app.post('/api/maintenance', async (req, res) => {
    try {
      const validatedData = maintenanceScheduleSchema.parse(req.body);
      const userId = parseInt(req.body.userId);
      
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required' });
      }
      
      const schedule = await storage.createMaintenanceSchedule({ ...validatedData, userId });
      res.json({ success: true, schedule });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      console.error('Error creating maintenance schedule:', error);
      res.status(500).json({ success: false, message: 'Failed to create maintenance schedule' });
    }
  });

  app.get('/api/maintenance/upcoming', async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required' });
      }
      
      const upcoming = await storage.getUpcomingMaintenance(userId);
      res.json({ success: true, upcoming });
    } catch (error) {
      console.error('Error fetching upcoming maintenance:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch upcoming maintenance' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
