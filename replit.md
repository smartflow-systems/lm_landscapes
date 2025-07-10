# L&M Landscape Maintenance Website

## Overview

This is a modern landscaping business website built with React and TypeScript. The application showcases L&M Landscape Maintenance's services including digger hire, fencing, garden maintenance, and landscape design. It features a contact form for quote requests, client testimonials, and a comprehensive client portal for project tracking and maintenance schedules.

## Recent Changes

**January 2025** - Implemented complete client portal system and booking features:
- Added user authentication with login page
- Created client portal dashboard with project and maintenance overview  
- Built projects list page with search and filtering capabilities
- Created maintenance schedules page with status tracking
- Added client portal navigation button to main website
- Integrated user-provided logo throughout portal interface
- All portal pages use bubble-based design consistent with main website
- **NEW: Google Calendar booking system with on-page calendar interface**
- **NEW: AI-powered chatbot with intelligent customer service capabilities**
- **NEW: Book Now button in main navigation for easy appointment scheduling**
- **LATEST: Enhanced deployment fixes for production stability (January 2025)**
  - Made OpenAI API key optional with graceful fallback messaging  
  - Added comprehensive error handling to prevent server crashes
  - Implemented database connection resilience with automatic fallback to in-memory storage
  - Enhanced server startup error handling with graceful recovery mechanisms
  - Added enhanced error handling for chat endpoint with individual operation isolation
  - Improved database connection with timeout settings and connection testing
  - Added fallback server mode for critical deployment scenarios
  - Enhanced storage initialization with error recovery

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with single contact endpoint
- **Middleware**: Express built-in JSON parsing and custom logging
- **Error Handling**: Centralized error middleware with Zod validation

### Database & Schema
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Tables**: Users table (basic auth scaffold) and contact_requests table

## Key Components

### Frontend Components
- **Layout Components**: Navbar with scroll effects, Footer with social links
- **Section Components**: Hero, Services, About, Gallery, Testimonials, Contact
- **Interactive Features**: Before/after image sliders, mobile testimonial carousel
- **Form Handling**: Contact form with validation and toast notifications
- **Client Portal**: Login page, dashboard, projects list, maintenance schedules
- **Portal Navigation**: Client portal button in main navbar, seamless routing
- **Booking System**: Full-page booking interface with calendar picker and time slots
- **AI Chatbot**: Floating chat widget with intelligent customer service powered by OpenAI
- **Enhanced Navigation**: Book Now button prominently displayed in navbar

### Backend Endpoints
- `POST /api/contact` - Handles contact form submissions with validation
- `POST /api/auth/login` - Handles user authentication for client portal
- `GET /api/projects/:userId` - Retrieves user's projects
- `GET /api/maintenance/:userId` - Retrieves user's maintenance schedules
- `POST /api/bookings` - Creates new appointment bookings with calendar integration
- `GET /api/bookings` - Retrieves bookings (optionally filtered by date)
- `POST /api/chat` - AI chatbot endpoint powered by OpenAI GPT-4o

### Database Schema
- `users` table - Client authentication and profile information
- `contact_requests` table - Stores client inquiries with contact details and service requests
- `projects` table - Tracks client projects with status, dates, and details
- `maintenance_schedules` table - Manages recurring maintenance appointments
- `project_updates` table - Stores project progress updates and photos
- `bookings` table - Stores appointment bookings with calendar integration
- `chat_messages` table - Stores AI chatbot conversation history

## Data Flow

1. **Contact Form Submission**:
   - Client fills contact form with name, email, phone, service type, and message
   - Frontend validates input using Zod schemas
   - Form data sent to `/api/contact` endpoint
   - Backend validates with shared schema and stores in PostgreSQL
   - Success/error response displayed via toast notifications

2. **Static Content**:
   - Service information, testimonials, and gallery items served from TypeScript data files
   - Images loaded from `/assets` directory with Vite asset handling

3. **Client Portal Authentication**:
   - User enters credentials on login page
   - Authentication checked against user database
   - User data stored in localStorage for session management
   - Portal routes protected with authentication checks

4. **Project & Maintenance Tracking**:
   - Projects displayed with status, dates, and progress information
   - Maintenance schedules show recurring service appointments
   - Real-time status updates and overdue notifications
   - Search and filter functionality for easy project management

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Hook Form
- **Database**: Drizzle ORM, @neondatabase/serverless, pg
- **UI Framework**: Radix UI components, Tailwind CSS, class-variance-authority
- **Validation**: Zod for schema validation
- **HTTP Client**: Native fetch API with custom wrapper

### Development Tools
- **Build**: Vite with React plugin, esbuild for server bundling
- **TypeScript**: Full type safety across frontend and backend
- **Development**: tsx for running TypeScript directly

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Shared schemas and types available to both frontend and backend

### Environment Setup
- `DATABASE_URL` required for PostgreSQL connection
- Development mode includes Replit-specific plugins and error overlay
- Production build optimizes for performance and removes development tools

### File Structure
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Common schemas and types
- `migrations/` - Database migration files
- Root configuration files for tools (Vite, Tailwind, TypeScript, Drizzle)

The application follows a monorepo structure with clear separation between client and server code while sharing type definitions and validation schemas.