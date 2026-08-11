# Task Management System

A full-stack task management application built as a professional technical assessment.
Inspired by the productivity-first design language of Linear and Asana.

> **Status:** 🚧 Under active development

---

## Overview

Task Management System is a workspace-oriented productivity tool that enables teams to
create, organize, and track tasks across projects. It features a Kanban board view,
a grouped list view, rich task details, project management, and a fully responsive
design with light/dark themes and configurable accent colors.

---

## Live Demo

> _Links will be added after deployment_

- **Frontend:** `https://task-management-system.vercel.app`
- **Backend API:** `https://task-management-system-api.railway.app`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, App Router, TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT, HttpOnly Cookies |
| State | TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Testing | Jest, React Testing Library |
| Deployment | Vercel (FE), Railway (BE), Neon (DB) |

---

## Project Structure

```
task-management-system/
├── client/          # Next.js frontend application
├── server/          # NestJS backend API
├── docs/            # Architecture diagrams and documentation
├── .env.example     # Environment variable template
└── README.md        # This file
```

---

## Quick Start

> Full installation instructions will be added after the core implementation is complete.

```bash
# Clone the repository
git clone <repo-url>
cd task-management-system

# Set up environment variables
cp .env.example server/.env
cp .env.example client/.env.local
# Fill in your values

# Install and start backend
cd server && npm install && npm run start:dev

# Install and start frontend
cd client && npm install && npm run dev
```

---

## Features

- ✅ Guest authentication (isolated per visitor session)
- ✅ Google OAuth login
- ✅ Kanban board view (To Do / Doing / Completed / On Hold)
- ✅ Grouped list view
- ✅ Task detail page with full property editing
- ✅ Subtasks (self-referencing task model)
- ✅ Comments and activity history
- ✅ Task labels (many-to-many)
- ✅ Task search and multi-field filtering
- ✅ Configurable visible fields
- ✅ Projects with task grouping
- ✅ Profile settings
- ✅ Light / Dark theme (persisted)
- ✅ Accent color system (6 colors, persisted)
- ✅ Fully responsive (desktop / tablet / mobile)

---

## Documentation

- [Architecture Overview](./docs/architecture.md) _(coming soon)_
- [API Endpoints](./docs/api.md) _(coming soon)_
- [Database Schema](./docs/schema.md) _(coming soon)_
- [AbleSpace Product Analysis](./docs/ablespace-product-understanding.md) _(coming soon)_

---

## Engineering Decisions

_Detailed engineering decisions and tradeoff explanations will be documented here after implementation._

---

## License

This project is submitted as a technical assessment and is not licensed for production use.
