# TerraBT SAP BTP Consulting Platform

## Overview

TerraBT is a specialized SAP Business Technology Platform (BTP) consulting website showcasing enterprise consulting services. The platform is built as a modern, mobile-first marketing website with a focus on conversion optimization and professional credibility. It features detailed service pages for various SAP BTP offerings including Fiori development, BTP architecture, AI-powered invoice processing, PWA applications, and integration solutions.

The application serves as a static website with future extensibility for backend integration, currently featuring in-memory storage capabilities ready for database migration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, optimized for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (replacing heavier alternatives like React Router)
- Single Page Application (SPA) architecture with route-based code splitting potential

**UI Component System**
- Radix UI primitives for accessible, unstyled component foundations
- shadcn/ui design system with "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design 3 principles adapted for B2B enterprise aesthetics
- Custom CSS variables for theme consistency across light/dark modes

**State Management**
- TanStack Query (React Query) v5 for server state management and caching
- Local component state using React hooks
- Query client configured with infinite stale time and disabled automatic refetching (optimized for static content)

**Design System Principles**
- Mobile-first responsive design
- Scandinavian minimalism with technical precision
- Inter font family for all typography
- Custom spacing system based on 8px grid (Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24)
- Container max-widths: 7xl for main content, 4xl for text-heavy sections
- Custom border radius values (lg: 9px, md: 6px, sm: 3px)

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- ESM (ECMAScript Modules) throughout the application
- Custom Vite integration for development with HMR support
- Middleware for request logging, JSON body parsing, and raw body capture

**Data Layer Design**
- Drizzle ORM configured for PostgreSQL dialect
- Schema-first approach with Zod validation via drizzle-zod
- Current implementation: In-memory storage (MemStorage class) for development
- Production-ready interface (IStorage) designed for easy migration to database persistence
- Database credentials managed through environment variables

**API Structure**
- RESTful API prefix: `/api/*`
- Centralized route registration in `server/routes.ts`
- Storage abstraction layer allowing seamless transition from in-memory to database storage
- Request/response logging with JSON response capture (truncated at 80 characters)

**Session Management**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- Express session middleware ready for authentication flows

### Database Schema

**Current Schema (Extensible)**
- Users table with UUID primary keys (auto-generated via PostgreSQL)
- Username/password authentication fields
- Drizzle migrations configured in `./migrations` directory
- Schema located at `./shared/schema.ts` for sharing between client and server

**Design Rationale**
The minimal user schema provides a foundation for future admin authentication or content management features while keeping the current static website lightweight.

### Development & Build Process

**Development Mode**
- Vite dev server with middleware mode integration into Express
- Custom logging with timestamp formatting
- Replit-specific plugins: runtime error overlay, cartographer, dev banner
- File system restrictions for security (strict mode, deny dotfiles)

**Production Build**
- Client: Vite builds to `dist/public` with proper tree-shaking
- Server: esbuild bundles server code to `dist/index.js` as ESM with external packages
- Separate TypeScript compilation check via `npm run check`
- Database schema push via `npm run db:push` using drizzle-kit

**Path Aliases**
- `@/*` → Client source files
- `@shared/*` → Shared code between client/server
- `@assets/*` → Static attached assets (images, generated content)

### Routing & Navigation

**Client-Side Routes**
- Home: `/` - Main landing page with hero, services overview, value propositions
- Service Pages: `/services/*` - Detailed pages for each consulting offering
  - `/services/btp-architecture`
  - `/services/fiori-development`
  - `/services/design-thinking`
  - `/services/offline-pwa`
  - `/services/database-management`
  - `/services/claude-ai`
  - `/services/integration-suite`
  - `/services/event-mesh`
- 404 handling via NotFound component

**Navigation Pattern**
Smooth scroll navigation for anchor links on homepage (e.g., #contact, #services, #knowledge) combined with SPA routing for service detail pages.

### Component Architecture

**Reusable Components**
- `ExpertiseCard`: Service overview cards with icons and hover effects
- `ValueProposition`: Feature sections with images and bullet points
- `BlogCard`: Content preview cards with category badges
- `ContactSection`: Lead capture form with toast notifications
- `Navigation`: Sticky header with responsive mobile menu
- `Footer`: Multi-column footer with social links

**UI Component Library**
Comprehensive shadcn/ui component set including: Accordion, Alert Dialog, Avatar, Badge, Button, Card, Carousel, Chart, Checkbox, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip.

All components follow the class-variance-authority pattern for variant management and support custom styling via className prop merging.

### Performance Optimizations

- Lazy loading for Replit-specific development plugins (conditional imports)
- Asset path resolution via Vite aliases
- CSS variables for runtime theme switching without JavaScript
- Tailwind CSS purging for minimal bundle size
- Image assets pre-optimized and stored in attached_assets directory

## External Dependencies

### Core Technologies
- **React 18+**: UI library
- **TypeScript**: Type safety across full stack
- **Vite**: Build tool and dev server
- **Express.js**: Backend server framework
- **Node.js**: Runtime environment (ESM mode)

### Database & ORM
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver
- **Drizzle ORM**: Type-safe SQL query builder and migrations
- **drizzle-kit**: Migration management CLI
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **connect-pg-simple**: PostgreSQL session store for Express

### UI Component Libraries
- **Radix UI**: 20+ accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Design system built on Radix UI
- **Lucide React**: Icon library
- **class-variance-authority**: Type-safe variant APIs for components
- **tailwind-merge + clsx**: Utility for merging Tailwind classes

### Form Management
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Validation resolver integration
- **Zod**: Schema validation

### State & Data Fetching
- **TanStack Query v5**: Server state management, caching, and synchronization

### Routing
- **Wouter**: Lightweight React router (2KB alternative to React Router)

### UI Enhancement
- **embla-carousel-react**: Touch-friendly carousel component
- **cmdk**: Command palette/search component
- **date-fns**: Date manipulation library
- **react-day-picker**: Calendar/date picker component
- **vaul**: Drawer/bottom sheet component

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution for development server
- **PostCSS + Autoprefixer**: CSS processing

### Build Configuration
- **Tailwind CSS v3**: Utility-first CSS framework
- **TypeScript 5+**: Static type checking
- **ESLint ready**: Code quality tooling (configured via tsconfig.json)

### Design Assets
Generated images stored in `attached_assets/generated_images/` for hero backgrounds, team photos, technology visuals, and blog illustrations. Logo assets in `attached_assets/` root.

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required for production database operations)
- `NODE_ENV`: Environment mode (development/production)
- `REPL_ID`: Replit-specific identifier (optional, for dev plugins)