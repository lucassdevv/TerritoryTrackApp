# TerritoryTrack Backend - NestJS API 🚀

Robust server-side application for managing congregation territories, built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

## 🔑 Key Features

- **Auth System**: Secure login with JWT and Bcrypt for password hashing.
- **Prisma ORM**: Type-safe database queries with interactive schema modeling.
- **Seeding logic**: Ready-to-use dummy data for testing the dashboard's filtering logic.
- **RESTful API**: Clean, modular controllers and services for territory records, blocks, and publishers.

## 📦 Project Setup

1. Copy `.env.example` to `.env` and configure your database URL.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Sync the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Populate the database (required for testing dashboard filters):
   ```bash
   npx prisma db seed
   ```

## 🛠️ Scripts

- `npm run start:dev`: Start development server.
- `npm run start:prod`: Start production server.
- `npm run test`: Run unit tests.
- `npm run lint`: Check code quality with ESLint/Prettier.

## 🌱 Seeding Data

The project includes a `prisma/seeder.ts` file that populates the database with:
- **Roles**: Admin and assistant roles.
- **Publishers**: Dedicated users assigned to territories.
- **Territories**: Various territory types (Normal and Blocks).
- **Mock Records**: Assignments with specific dates to test 14, 30, and 60-day filters.

---
*Built with NestJS and Prisma.*
