# TerritoryTrackApp 🗺️

A professional territory management system designed for congregations, built with a modern tech stack to streamline field service organization.

## 🚀 Overview

**TerritoryTrackApp** (WebCongre) is a full-stack solution that allows administrators to manage, assign, and track the progress of preaching territories. It features a dynamic dashboard with real-time filters (14, 30, and 60 days) to identify overdue or incomplete territories at a glance.

## 🛠️ Tech Stack

- **Frontend**: [Angular 19](https://angular.io/) (Latest signals, standalone components, modern red-themed UI).
- **Backend**: [NestJS](https://nestjs.com/) (Modular architecture, JWT authentication, robust API).
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/).
- **Styling**: Vanilla CSS & modern UI patterns.

## ✨ Key Features

- **Interactive Dashboard**: Track territory status (Complete, Overdue, Incomplete) with visual indicators.
- **Dynamic Filters**: History-based filtering to manage territory rotation efficiently.
- **Territory Management**: Detailed records including maps, block data, and assignment history.
- **Secure Authentication**: Role-based access control for Service Overseers and Assistants.
- **Automated Seeding**: Local environment setup in seconds for easy testing and demonstration.

## 📦 Project Structure

```bash
├── frontend/     # Angular 19 Client
├── backend/      # NestJS Server & Prisma Schema
└── README.md     # Main Documentation
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### 1. Backend Setup

1. Navigate to `backend/`:
   ```bash
   npm install
   ```
2. Configure `.env` (use `.env.example` as a template).
3. Run migrations and seed the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
4. Start the server:
   ```bash
   npm run start:dev
   ```

### 2. Frontend Setup

1. Navigate to `frontend/`:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open `http://localhost:4200`.

## 👤 Author

**Lucas Ibarra**  
*Passionate Full Stack Developer specialized in Angular & NestJS.*

---
*Note: This project is part of my professional portfolio. Feel free to explore the code!*
