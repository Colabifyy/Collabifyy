# Collabifyy - AI-Powered Creator & Brand Platform

## Overview

Collabifyy is an AI-powered platform that connects brands with content creators through intelligent matchmaking, campaign management, and automated payment processing. The application serves two distinct user types (creators and brands) and provides a waitlist system for early access signups.

The platform is built as a full-stack web application with a React frontend and Express backend, using PostgreSQL for data persistence and Replit's OpenID Connect for authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System:**
- shadcn/ui component library with Radix UI primitives for accessible, headless components
- Tailwind CSS for styling with custom design tokens
- Design system inspired by modern SaaS platforms (Linear, Stripe, Vercel)
- Custom theme system supporting light/dark modes via CSS variables
- Typography: Inter for UI/body text, Space Grotesk for display headlines

**State Management:**
- React Query for server state (user data, waitlist entries)
- Local React state for UI interactions
- No global state management library (Redux/Zustand) - relies on React Query cache

**Key Design Patterns:**
- Component composition with shadcn/ui's slot-based architecture
- Custom hooks for reusable logic (useAuth, useToast, useIsMobile)
- Test-friendly components with data-testid attributes

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server
- Two entry points: development (index-dev.ts with HMR) and production (index-prod.ts with static serving)
- Session-based authentication with PostgreSQL session store

**API Design:**
- RESTful endpoints organized in routes.ts
- Authentication middleware protecting routes
- JSON request/response format
- Error handling with appropriate HTTP status codes

**Development vs Production:**
- Development: Vite middleware for HMR, live template reloading
- Production: Pre-built static assets served from dist/public
- Environment-specific server setup abstracted through runApp function

### Authentication & Authorization

**Authentication Provider:**
- Replit Auth via OpenID Connect (OIDC)
- OAuth2 flow with Passport.js strategy
- Session management using express-session with PostgreSQL backing

**Session Storage:**
- PostgreSQL sessions table via connect-pg-simple
- 7-day session TTL
- HTTP-only, secure cookies in production

**User Flow:**
- OAuth login redirects to /api/login
- User data synced to local users table via upsert pattern
- Session persists user claims and tokens
- Middleware (isAuthenticated) protects authenticated routes

**Authorization Pattern:**
- Route-level protection with isAuthenticated middleware
- User ID extracted from session claims (req.user.claims.sub)
- User-specific data queries filtered by authenticated user ID

### Data Storage

**Database:**
- PostgreSQL (via Neon serverless driver)
- Drizzle ORM for type-safe schema definitions and queries
- WebSocket connections in development (neonConfig.webSocketConstructor)

**Schema Design:**
- **sessions table:** Express session storage (sid, sess, expire)
- **users table:** User profiles synced from Replit Auth (id, email, firstName, lastName, profileImageUrl, timestamps)
- **waitlist table:** Early access signups (id, userId, userType, companyName, socialHandle, message, timestamps)

**Data Access Pattern:**
- Storage interface (IStorage) abstracts database operations
- DatabaseStorage class implements CRUD operations
- Drizzle queries with type safety and auto-completion

**Schema Validation:**
- Zod schemas generated from Drizzle tables (drizzle-zod)
- Runtime validation on API endpoints
- Type inference for TypeScript from Zod schemas

### External Dependencies

**Core Infrastructure:**
- **Neon Database:** Serverless PostgreSQL hosting with WebSocket support
- **Replit Auth:** OAuth2/OIDC authentication provider

**Frontend Libraries:**
- **Radix UI:** Accessible component primitives (@radix-ui/react-*)
- **TanStack Query:** Server state management
- **Wouter:** Lightweight routing
- **React Hook Form:** Form state management
- **date-fns:** Date manipulation

**Backend Libraries:**
- **Drizzle ORM:** Type-safe database queries
- **Passport.js:** Authentication middleware
- **express-session:** Session management
- **connect-pg-simple:** PostgreSQL session store

**Development Tools:**
- **Vite:** Build tool with HMR
- **TypeScript:** Type safety across stack
- **Tailwind CSS:** Utility-first styling
- **PostCSS & Autoprefixer:** CSS processing

**Design Assets:**
- Google Fonts: Inter (UI), Space Grotesk (display).
- Custom generated images stored in attached_assets/generated_images/