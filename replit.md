# L&M Landscape Maintenance Website

## Overview

This is a modern landscaping business website built with React and TypeScript. The application showcases L&M Landscape Maintenance's services including digger hire, fencing, garden maintenance, and landscape design. It features a contact form for quote requests and client testimonials.

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

### Backend Endpoints
- `POST /api/contact` - Handles contact form submissions with validation

### Database Schema
- `users` table - Basic user authentication structure
- `contact_requests` table - Stores client inquiries with contact details and service requests

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