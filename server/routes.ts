import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, projectSchema, projectUpdateSchema, maintenanceScheduleSchema, bookingSchema, chatMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { generateChatResponse } from "./openai";
import { sendBookingConfirmation } from "./email";

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

  // User authentication endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
      }
      
      // Check if user exists
      let user = await storage.getUserByUsername(username);
      
      // If user doesn't exist, create a demo user for testing
      if (!user) {
        console.log('Creating new user for login:', username);
        user = await storage.createUser({ username, password });
      }
      
      // In a real app, you'd verify the password here
      // For demo purposes, we'll accept any password
      
      console.log('Login successful for user:', username);
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
    }
  });

  // Projects endpoints
  app.get('/api/projects/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid User ID required' });
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
  app.get('/api/maintenance/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid User ID required' });
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

  app.get('/api/maintenance/upcoming/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Valid User ID required' });
      }
      
      const upcoming = await storage.getUpcomingMaintenance(userId);
      res.json({ success: true, upcoming });
    } catch (error) {
      console.error('Error fetching upcoming maintenance:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch upcoming maintenance' });
    }
  });

  // Booking endpoints
  app.post('/api/bookings', async (req, res) => {
    try {
      const validatedData = bookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      
      // Send confirmation email
      try {
        await sendBookingConfirmation({
          customerName: validatedData.customerName,
          customerEmail: validatedData.customerEmail,
          serviceType: validatedData.serviceType,
          appointmentDate: validatedData.appointmentDate.toISOString(),
          duration: validatedData.duration,
          notes: validatedData.notes,
        });
      } catch (emailError) {
        console.error('Email sending failed, but booking was created:', emailError);
      }
      
      res.json({ success: true, booking });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      console.error('Error creating booking:', error);
      res.status(500).json({ success: false, message: 'Failed to create booking' });
    }
  });

  app.get('/api/bookings', async (req, res) => {
    try {
      const date = req.query.date ? new Date(req.query.date as string) : undefined;
      const bookings = await storage.getBookings(date);
      res.json({ success: true, bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
    }
  });

  // Chat endpoints
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ success: false, message: 'Message and session ID are required' });
      }

      // Get conversation history with error handling
      let conversationHistory = [];
      try {
        const history = await storage.getChatHistory(sessionId, 8);
        conversationHistory = history.map(msg => ({
          role: msg.sender as 'user' | 'assistant',
          content: msg.message
        }));
      } catch (historyError) {
        console.warn('Could not retrieve chat history:', historyError);
        // Continue without history if storage fails
      }

      // Save user message with error handling
      try {
        await storage.saveChatMessage({
          sessionId,
          message,
          sender: 'user'
        });
      } catch (saveError) {
        console.warn('Could not save user message:', saveError);
        // Continue even if saving fails
      }

      // Generate AI response with enhanced error handling
      const aiResponse = await generateChatResponse(message, conversationHistory);

      // Save AI response with error handling
      try {
        await storage.saveChatMessage({
          sessionId,
          message: aiResponse,
          sender: 'assistant'
        });
      } catch (saveError) {
        console.warn('Could not save AI response:', saveError);
        // Continue even if saving fails
      }

      res.json({ success: true, message: aiResponse });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      // Provide a helpful fallback response even if everything fails
      res.json({ 
        success: true, 
        message: 'I\'m sorry, our chat service is temporarily unavailable. Please call us at 07542 331 653 or use our contact form for assistance.' 
      });
    }
  });

  // Sustainability assessment endpoints
  app.post('/api/projects/:id/sustainability', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const assessmentData = req.body;

      // Calculate the overall score
      const overallScore = await storage.calculateSustainabilityScore(assessmentData);
      
      // Determine certification level based on score
      let certificationLevel = 'Bronze';
      if (overallScore >= 90) certificationLevel = 'Platinum';
      else if (overallScore >= 80) certificationLevel = 'Gold';
      else if (overallScore >= 70) certificationLevel = 'Silver';

      const assessment = await storage.createSustainabilityAssessment({
        ...assessmentData,
        projectId,
        overallScore,
        certificationLevel
      });

      res.json(assessment);
    } catch (error) {
      console.error('Error creating sustainability assessment:', error);
      res.status(500).json({ error: 'Failed to create sustainability assessment' });
    }
  });

  app.get('/api/projects/:id/sustainability', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const assessment = await storage.getSustainabilityAssessment(projectId);
      
      if (!assessment) {
        return res.status(404).json({ error: 'Sustainability assessment not found' });
      }
      
      res.json(assessment);
    } catch (error) {
      console.error('Error getting sustainability assessment:', error);
      res.status(500).json({ error: 'Failed to get sustainability assessment' });
    }
  });

  app.put('/api/projects/:id/sustainability', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const updates = req.body;

      // Recalculate overall score if relevant fields changed
      if (updates.waterEfficiencyScore || updates.biodiversityScore || 
          updates.carbonFootprintScore || updates.soilHealthScore || 
          updates.wasteReductionScore || updates.nativePlants !== undefined) {
        updates.overallScore = await storage.calculateSustainabilityScore(updates);
        
        // Update certification level
        if (updates.overallScore >= 90) updates.certificationLevel = 'Platinum';
        else if (updates.overallScore >= 80) updates.certificationLevel = 'Gold';
        else if (updates.overallScore >= 70) updates.certificationLevel = 'Silver';
        else updates.certificationLevel = 'Bronze';
      }

      const assessment = await storage.updateSustainabilityAssessment(projectId, updates);
      res.json(assessment);
    } catch (error) {
      console.error('Error updating sustainability assessment:', error);
      res.status(500).json({ error: 'Failed to update sustainability assessment' });
    }
  });

  app.post('/api/sustainability/calculate', async (req, res) => {
    try {
      const features = req.body;
      const score = await storage.calculateSustainabilityScore(features);
      
      let certificationLevel = 'Bronze';
      if (score >= 90) certificationLevel = 'Platinum';
      else if (score >= 80) certificationLevel = 'Gold';
      else if (score >= 70) certificationLevel = 'Silver';

      res.json({ 
        overallScore: score, 
        certificationLevel,
        breakdown: {
          waterEfficiency: features.waterEfficiencyScore || 0,
          biodiversity: features.biodiversityScore || 0,
          carbonFootprint: features.carbonFootprintScore || 0,
          soilHealth: features.soilHealthScore || 0,
          wasteReduction: features.wasteReductionScore || 0
        }
      });
    } catch (error) {
      console.error('Error calculating sustainability score:', error);
      res.status(500).json({ error: 'Failed to calculate sustainability score' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
