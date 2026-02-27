# MathBro

MathBro is a full-stack AI-powered math learning assistant focused on clarity, confidence, and repetition for students.

## Tech Stack
- **Frontend**: Next.js App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcryptjs
- **AI**: OpenAI Chat Completions API

## Product Capabilities
- Dashboard with recent saves, weak topics, formula-of-the-day, progress stats, streak, and pomodoro timer
- Ask AI page with step-by-step explanations, final answer, summary, and save/mark confusing actions
- Topics page + topic detail with formulas, examples, and quiz section
- Formula Vault with search and flashcard mode
- Practice mode with 5-question flow and weak area score updates
- Weak area tracker with chart and revision suggestions

## Security + Production Notes
- Passwords hashed using bcrypt (`cost=12`)
- JWT-based authorization with support for `Authorization` header and secure `httpOnly` cookie
- Input validation using Zod schemas
- Protected APIs use a shared `requireAuth` guard
- AI endpoint has a fallback mode when `OPENAI_API_KEY` is missing

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and fill values.
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migrations and seed:
   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```
5. Run the app:
   ```bash
   npm run dev
   ```

## Environment Variables
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mathbro"
JWT_SECRET="replace-with-strong-secret"
OPENAI_API_KEY=""
```
