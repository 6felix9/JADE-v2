# JADE v2 Implementation Plan

## Overview
Transitioning JADE from a high-volume batch CSV processor to a high-fidelity vertical SaaS platform focused on deep job analysis, organization modeling, and customizable methodologies.

---

## Project Structure
/jade-v2
├── frontend/                  # Next.js App (The Product UI)
│   ├── app/                   # App Router
│   │   ├── org/
│   │   │   └── [orgId]/
│   │   │       ├── page.tsx              # Org Dashboard
│   │   │       ├── settings/             # Methodology Editor
│   │   │       ├── chart/                # Org Chart
│   │   │       └── jobs/
│   │   │           └── [jobId]/           # Job Grading UI
│   │   └── auth/
│   ├── components/
│   │   ├── grading/           # Explainability, factor scoring
│   │   ├── org-chart/         # React Flow components
│   │   └── ui/                # Buttons, modals, tables
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── api.ts             # FastAPI client
│   │   └── types.ts           # Shared DTO mirrors
│   └── styles/
│
├── backend/                   # FastAPI (The Brain)
│   ├── app/
│   │   ├── main.py
│   │   ├── api/               # Route definitions
│   │   │   ├── jobs.py
│   │   │   ├── methodologies.py
│   │   │   └── orgs.py
│   │   ├── agents/            # LLM logic
│   │   │   ├── scoring.py
│   │   │   └── extraction.py
│   │   ├── services/          # Pure business logic
│   │   │   ├── ingestion.py
│   │   │   ├── vector_store.py
│   │   │   └── scoring_engine.py
│   │   ├── models/            # Pydantic models
│   │   │   ├── job.py
│   │   │   ├── methodology.py
│   │   │   └── agent_output.py
│   │   └── db/
│   │       ├── session.py
│   │       └── queries.py
│   ├── alembic/               # Migrations (optional if Supabase-only)
│   └── tests/
│
├── shared/                    # Contract Layer (Critical)
│   ├── types/                 # JSON schemas / OpenAPI DTOs
│   │   ├── job.json
│   │   ├── methodology.json
│   │   └── agent_output.json
│   └── constants/
│       └── factor_keys.ts
│
├── infra/
│   ├── docker-compose.yml
│   ├── supabase/
│   │   └── schema.sql
│   └── env.example
│
├── plan.md
├── README.md
└── package.json               # Optional (pnpm / turborepo later)


## Phase 1: Foundation & Architecture Setup

### 1.1 Project Structure & Tooling
- [x] Initialize monorepo structure with `/frontend`, `/backend`, `/shared`, `/infra` directories
- [x] Set up Next.js 14+ with App Router in `/frontend`
- [x] Initialize FastAPI project in `/backend`
- [x] Configure Supabase connection and environment variables
- [x] Create `/shared` directory for contract types and constants
- [x] Set up Docker Compose for local development
- [x] Configure TypeScript and Python linting/formatting tools
- [x] Create `.env.example` files for both frontend and backend

### 1.2 Database Schema Design
- [ ] Design core tables: `organizations`, `users`, `methodologies`, `jobs`, `job_profiles`
- [ ] Implement user-organization relationships with proper foreign keys
- [ ] Create `methodologies` table with JSONB column for flexible factor definitions
- [ ] Set up `jobs` table with vector column for embeddings (`pgvector`)
- [ ] Design `factor_scores` table for granular scoring data
- [ ] Write Supabase migration file (`schema.sql`)
- [ ] Implement Row Level Security (RLS) policies for multi-tenancy
- [ ] Set up database indexes for performance optimization
- [ ] Test migrations locally

---

## Phase 2: Backend Development (FastAPI)

### 2.1 Core API Infrastructure
- [ ] Set up FastAPI app structure with `main.py`
- [ ] Configure CORS for Next.js frontend
- [ ] Implement database session management (`db/session.py`)
- [ ] Create base Pydantic models for validation
- [ ] Set up error handling and logging middleware
- [ ] Configure environment variable management
- [ ] Create health check endpoint

### 2.2 Data Models (Pydantic)
- [ ] Create `Job` model with validation rules
- [ ] Create `Methodology` model with JSONB schema validation
- [ ] Create `AgentOutput` model with structured response format:
  - [ ] `factor` field
  - [ ] `score` field
  - [ ] `confidence` field (0-1)
  - [ ] `reasoning` text field
  - [ ] `citations` array field
- [ ] Create `Organization` and `User` models
- [ ] Create request/response DTOs for all endpoints

### 2.3 API Routes
- [ ] **Jobs API** (`api/jobs.py`):
  - [ ] POST `/jobs` - Upload new job description
  - [ ] GET `/jobs/{id}` - Retrieve job details
  - [ ] POST `/jobs/{id}/analyze` - Trigger AI analysis
  - [ ] GET `/jobs/{id}/scores` - Get factor scores
  - [ ] POST `/jobs/compare` - Compare multiple jobs
- [ ] **Methodologies API** (`api/methodologies.py`):
  - [ ] POST `/methodologies` - Create custom methodology
  - [ ] GET `/methodologies/{id}` - Retrieve methodology
  - [ ] PUT `/methodologies/{id}` - Update methodology
  - [ ] DELETE `/methodologies/{id}` - Delete methodology
- [ ] **Organizations API** (`api/orgs.py`):
  - [ ] GET `/orgs/{id}` - Get organization details
  - [ ] PUT `/orgs/{id}` - Update organization settings
  - [ ] GET `/orgs/{id}/chart` - Get org chart data

### 2.4 AI Agent Implementation
- [ ] Set up LangChain integration (`agents/scoring.py`)
- [ ] Implement structured output parsing with Pydantic
- [ ] Create prompt templates for factor scoring
- [ ] Implement confidence scoring logic
- [ ] Add citation extraction from source documents
- [ ] Create explainability text generation
- [ ] Add error handling for LLM failures
- [ ] Implement rate limiting and retries

### 2.5 Document Processing
- [ ] Implement PDF text extraction (`agents/extraction.py`)
- [ ] Add support for DOCX files
- [ ] Implement TXT file handling
- [ ] Create document preprocessing pipeline
- [ ] Add text chunking for long documents

### 2.6 Vector Store & Embeddings
- [ ] Implement embedding generation service (`services/vector_store.py`)
- [ ] Create job embedding calculation on upload
- [ ] Implement similarity search queries using `pgvector`
- [ ] Add batch embedding updates
- [ ] Create job comparison logic using vector distances

### 2.7 Business Logic Services
- [ ] **Ingestion Service** (`services/ingestion.py`):
  - [ ] File upload handling
  - [ ] Metadata extraction
  - [ ] Document validation
- [ ] **Scoring Engine** (`services/scoring_engine.py`):
  - [ ] Factor calculation orchestration
  - [ ] Methodology application logic
  - [ ] Score aggregation and weighting
- [ ] Create database query helpers (`db/queries.py`)

---

## Phase 3: Frontend Development (Next.js)

### 3.1 Core App Structure
- [ ] Set up App Router file structure
- [ ] Configure Supabase client (`lib/supabase.ts`)
- [ ] Create FastAPI client wrapper (`lib/api.ts`)
- [ ] Define TypeScript types (`lib/types.ts`) mirroring backend DTOs
- [ ] Set up authentication flow with Supabase Auth
- [ ] Create protected route middleware
- [ ] Implement error boundary components

### 3.2 Shared UI Components
- [ ] Create base UI component library (`components/ui/`):
  - [ ] Button variants
  - [ ] Modal/Dialog
  - [ ] Input fields
  - [ ] Tables
  - [ ] Loading indicators
  - [ ] Toast notifications
- [ ] Set up Tailwind CSS or preferred styling solution
- [ ] Create layout components (header, sidebar, footer)

### 3.3 Authentication Pages
- [ ] Login page (`app/auth/login/page.tsx`)
- [ ] Sign up page (`app/auth/signup/page.tsx`)
- [ ] Password reset flow
- [ ] Email verification handling

### 3.4 Organization Management
- [ ] **Org Dashboard** (`app/org/[orgId]/page.tsx`):
  - [ ] Display organization overview
  - [ ] Show recent jobs
  - [ ] Display team statistics
- [ ] **Org Settings** (`app/org/[orgId]/settings/page.tsx`):
  - [ ] Organization profile editor
  - [ ] User management interface
  - [ ] Permissions configuration
- [ ] **Methodology Editor** (`app/org/[orgId]/settings/methodology/page.tsx`):
  - [ ] Dynamic form generator based on JSONB schema
  - [ ] Factor addition/removal UI
  - [ ] Weight adjustment controls
  - [ ] Methodology preview
  - [ ] Save/publish workflow

### 3.5 Organization Chart Visualization
- [ ] Install and configure React Flow
- [ ] Create org chart component (`components/org-chart/`):
  - [ ] Node rendering for positions
  - [ ] Edge rendering for reporting lines
  - [ ] Interactive zoom/pan controls
  - [ ] Node editing capabilities
- [ ] **Org Chart Page** (`app/org/[orgId]/chart/page.tsx`):
  - [ ] Fetch and display org structure
  - [ ] Add position creation flow
  - [ ] Implement drag-and-drop repositioning
  - [ ] Export org chart functionality

### 3.6 Job Analysis Interface
- [ ] **Job Upload** (`app/org/[orgId]/jobs/new/page.tsx`):
  - [ ] File upload component
  - [ ] Drag-and-drop support
  - [ ] Job metadata form
  - [ ] Upload progress indicator
- [ ] **Job Detail View** (`app/org/[orgId]/jobs/[jobId]/page.tsx`):
  - [ ] Display job information
  - [ ] Show original document
  - [ ] Trigger analysis button
  - [ ] Display analysis status
- [ ] **Grading UI** (`components/grading/`):
  - [ ] Factor score display cards
  - [ ] Confidence indicators (visual: progress bars, color coding)
  - [ ] Reasoning/explanation text boxes
  - [ ] Citations with source linking
  - [ ] Overall grade calculation display
  - [ ] Manual score override controls
- [ ] **Explainability Dashboard**:
  - [ ] Breakdown by factor
  - [ ] Confidence score visualization
  - [ ] AI reasoning text display
  - [ ] Source citation references
  - [ ] Comparison with similar jobs

### 3.7 Job Comparison Tools
- [ ] **Job Comparison Page** (`app/org/[orgId]/jobs/compare/page.tsx`):
  - [ ] Multi-select job picker
  - [ ] Side-by-side comparison table
  - [ ] Factor score comparison charts
  - [ ] Similarity score display
  - [ ] Export comparison report
- [ ] Create comparison visualization components
- [ ] Implement similar jobs finder widget

### 3.8 Analytics & Reporting
- [ ] Install TanStack Table for data grids
- [ ] Create job analytics dashboard
- [ ] Implement filtering and sorting
- [ ] Add data export functionality (CSV, PDF)
- [ ] Create visualization components for aggregate data

---

## Phase 4: Integration & Contract Layer

### 4.1 Shared Type Definitions
- [ ] Create JSON schemas for core entities (`shared/types/`):
  - [ ] `job.json`
  - [ ] `methodology.json`
  - [ ] `agent_output.json`
  - [ ] `organization.json`
- [ ] Generate TypeScript types from schemas
- [ ] Generate Python Pydantic models from schemas (or ensure sync)
- [ ] Create constants file (`shared/constants/factor_keys.ts`)
- [ ] Set up type validation in CI/CD

### 4.2 API Integration
- [ ] Implement all FastAPI endpoints in frontend client
- [ ] Add request/response type safety
- [ ] Implement error handling and retry logic
- [ ] Add loading states for all API calls
- [ ] Create API response caching strategy

---

## Phase 5: Testing & Quality Assurance

### 5.1 Backend Tests
- [ ] Set up pytest configuration
- [ ] Write unit tests for Pydantic models
- [ ] Write unit tests for business logic services
- [ ] Write integration tests for API endpoints
- [ ] Write tests for AI agent outputs (structured format validation)
- [ ] Write tests for vector store operations
- [ ] Set up test database fixtures
- [ ] Achieve >80% code coverage

### 5.2 Frontend Tests
- [ ] Set up Jest and React Testing Library
- [ ] Write unit tests for utility functions
- [ ] Write component tests for UI components
- [ ] Write integration tests for key user flows
- [ ] Set up E2E testing with Playwright or Cypress
- [ ] Test responsive design across devices

### 5.3 Contract Testing
- [ ] Validate frontend types match backend DTOs
- [ ] Test API request/response formats
- [ ] Validate JSONB schema handling

---

## Phase 6: Deployment & DevOps

### 6.1 Infrastructure Setup
- [ ] Set up Supabase project (production)
- [ ] Configure production database
- [ ] Set up pgvector extension in production
- [ ] Deploy FastAPI to chosen platform (Railway, Render, AWS, etc.)
- [ ] Deploy Next.js frontend (Vercel, Netlify, etc.)
- [ ] Configure environment variables in production
- [ ] Set up SSL certificates

### 6.2 CI/CD Pipeline
- [ ] Create GitHub Actions workflows (or similar):
  - [ ] Lint and format check
  - [ ] Run backend tests
  - [ ] Run frontend tests
  - [ ] Type checking
  - [ ] Build validation
- [ ] Set up automatic deployment on merge to main
- [ ] Create staging environment
- [ ] Implement database migration automation

### 6.3 Monitoring & Logging
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure application logging
- [ ] Set up performance monitoring
- [ ] Create health check dashboards
- [ ] Set up alerts for critical failures

---

## Phase 7: Feature Completion & Polish

### 7.1 Core Features Validation
- [ ] Verify Issue #23: Multi-org setup working
- [ ] Verify Issue #24: Methodology upload and editing functional
- [ ] Verify Issue #25: AI agent with explainability
- [ ] Verify Issue #26: Job upload and ingestion
- [ ] Verify Issue #27: Job analytics displaying correctly
- [ ] Verify Issue #28: Job comparison tools working
- [ ] Verify Issue #13: Explainability UI complete
- [ ] Verify Issue #14: Confidence scoring implemented
- [ ] Verify Issue #15: Org chart visualization functional

### 7.2 User Experience Polish
- [ ] Implement loading skeletons for all async operations
- [ ] Add empty states for all lists/tables
- [ ] Improve error messages (user-friendly)
- [ ] Add onboarding flow for new organizations
- [ ] Create user documentation/help system
- [ ] Implement keyboard shortcuts for power users
- [ ] Add dark mode support
- [ ] Optimize mobile responsiveness

### 7.3 Performance Optimization
- [ ] Optimize database queries (add indexes where needed)
- [ ] Implement frontend code splitting
- [ ] Add image optimization
- [ ] Set up CDN for static assets
- [ ] Optimize API response times
- [ ] Implement caching strategies (Redis if needed)
- [ ] Reduce LLM API calls with smart caching

---

## Phase 8: Documentation & Handoff

### 8.1 Technical Documentation
- [ ] Write API documentation (OpenAPI/Swagger)
- [ ] Document database schema with ERD
- [ ] Create architecture diagrams
- [ ] Document deployment process
- [ ] Write developer setup guide
- [ ] Document environment variables and configuration

### 8.2 User Documentation
- [ ] Create user guide for organization setup
- [ ] Write methodology creation tutorial
- [ ] Document job upload and analysis workflow
- [ ] Create FAQ section
- [ ] Record video tutorials for key features

### 8.3 Maintenance Plan
- [ ] Create runbook for common issues
- [ ] Document backup and recovery procedures
- [ ] Create security update process
- [ ] Plan for database migration strategy
- [ ] Define versioning strategy

---

## Success Criteria

- [ ] Users can create and manage multiple organizations
- [ ] Users can upload and edit custom methodologies with dynamic factors
- [ ] AI agent successfully scores jobs with structured, explainable output
- [ ] Confidence scores and reasoning are clearly displayed in UI
- [ ] Job comparison tools return accurate similarity rankings
- [ ] Organization chart visualizes reporting structures
- [ ] All core features (#13, #14, #15, #23-28) are functional
- [ ] System handles concurrent users without performance degradation
- [ ] Test coverage >80% for critical paths
- [ ] Documentation is complete and accessible

---

## Notes & Considerations

- **Scalability**: Design with future collaborative features in mind
- **Security**: Implement RLS properly to prevent cross-org data leakage
- **LLM Costs**: Monitor API usage and implement rate limiting
- **Data Privacy**: Ensure job descriptions are handled securely
- **Future Phases**: Plan for real-time collaboration, audit logging, and advanced analytics