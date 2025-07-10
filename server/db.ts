import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check for database URL and create connection with better error handling
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

try {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not found - database functionality will be limited");
  } else {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log("Database connection established successfully");
  }
} catch (error) {
  console.error("Failed to establish database connection:", error);
  console.warn("Application will continue with limited functionality");
}

export { pool, db };
