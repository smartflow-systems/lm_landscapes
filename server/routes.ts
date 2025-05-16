import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the attached_assets directory
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
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

  const httpServer = createServer(app);
  return httpServer;
}
