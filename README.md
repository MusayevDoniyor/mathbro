# MathBro

MathBro is a production-ready full-stack AI-powered math learning assistant for students.

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Prisma ORM + PostgreSQL
- JWT authentication
- OpenAI API integration

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`.
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migrations and seed:
   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```
5. Start development:
   ```bash
   npm run dev
   ```

## Features
- Dashboard with saved problems, weak topics, formula of the day, progress stats
- Ask AI with step-by-step math explanations and save/mark confusing workflows
- Topics explorer with formulas, examples, quiz block
- Formula Vault with search and flashcard mode
- Practice mode with weak-topic detection and auto score tracking
- Weak Area Tracker with charts and revision suggestions
- Extras: streak, bookmarks, pomodoro-ready architecture, motivational prompts

## Security
- Password hashing via bcryptjs
- JWT-protected API routes
- Zod input validation

