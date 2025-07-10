import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Environment variable checks and warnings
  console.log("🔍 Environment Check:");
  console.log(`  - NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`  - DATABASE_URL: ${process.env.DATABASE_URL ? '✅ configured' : '⚠️  not configured (will use in-memory storage)'}`);
  console.log(`  - OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ configured' : '⚠️  not configured (chat service will be limited)'}`);
  
  try {
    const server = await registerRoutes(app);

    // Enhanced error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error: ${message}`, "error");
      
      // Ensure response is sent and don't crash the server
      if (!res.headersSent) {
        res.status(status).json({ 
          success: false, 
          message: status === 500 ? "Something went wrong. Please try again." : message 
        });
      }
    });

    // Setup Vite or static serving with error handling
    try {
      if (app.get("env") === "development") {
        await setupVite(app, server);
      } else {
        serveStatic(app);
      }
    } catch (viteError) {
      console.warn("Vite setup failed, continuing with basic routing:", viteError);
      // Continue without Vite if it fails
    }

    // ALWAYS serve the app on port 5000 with enhanced configuration
    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    const host = process.env.HOST || "0.0.0.0";
    
    server.listen({
      port,
      host,
      reusePort: true,
    }, () => {
      log(`serving on ${host}:${port}`);
      console.log(`✅ Application successfully started on ${host}:${port}`);
    });

    // Handle server errors gracefully
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use`);
        log(`Port ${port} is already in use, trying to continue...`, "error");
      } else if (error.code === 'EACCES') {
        console.error(`❌ Permission denied for port ${port}`);
        log(`Permission denied for port ${port}`, "error");
      } else {
        console.error(`❌ Server error: ${error.message}`);
        log(`Server error: ${error.message}`, "error");
      }
    });
    
    // Handle process termination gracefully
    process.on('SIGTERM', () => {
      console.log('🔄 SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('🔄 SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    log("Server startup failed - attempting graceful fallback", "error");
    
    // Create a minimal fallback server
    try {
      const port = 5000;
      const host = "0.0.0.0";
      
      // Add basic health check route
      app.get('/health', (_req, res) => {
        res.json({ status: 'ok', message: 'Server is running in fallback mode' });
      });
      
      // Add basic error page for all routes
      app.get('*', (_req, res) => {
        res.status(503).json({ 
          success: false, 
          message: 'Service temporarily unavailable. Please try again later.' 
        });
      });
      
      app.listen(port, host, () => {
        console.log(`🚨 Fallback server running on ${host}:${port}`);
        log(`Fallback server running on port ${port} at ${host}`, "error");
      });
    } catch (fallbackError) {
      console.error("Even fallback server failed:", fallbackError);
      process.exit(1);
    }
  }
})();
