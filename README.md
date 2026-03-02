# MathBro

MathBro is an AI-powered math learning assistant built with Next.js, Prisma, and PostgreSQL.
It helps students solve problems step-by-step, track weak areas, save important solutions, and revise formulas in one focused workspace.

🌐 **Live website:** https://mathbro.doniyorlab.uz/

---

## ✨ What MathBro does

- **Ask AI for step-by-step solutions** with final answers and short summaries.
- **Save solved problems** for revision later.
- **Mark confusing problems** so you can revisit what felt hard.
- **Track weak areas** by topic and score.
- **Practice and auto-update progress** based on your submissions.
- **Browse formulas and topics** with examples and quiz-style checks.
- **See a dashboard overview** (saved work, weak topics, formula of the day, progress stats).

---

## 🧱 Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **UI:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT + HTTP-only cookie sessions
- **Validation:** Zod
- **AI:** OpenAI API (with local fallback logic in code)

---

## 📁 Project structure

```txt
app/
  api/
    ai/solve/           # AI solving endpoint
    auth/               # Register, login, logout
    dashboard/          # Personalized dashboard data
    formulas/           # Formula vault API
    practice/submit/    # Practice submission + weak-area scoring
    saved-problems/     # Save/list solved questions
    topics/             # Topic listing/details
    weak-areas/         # Weak area tracking
  ask-ai/               # Ask AI page
  formulas/             # Formula vault page
  practice/             # Practice mode page
  topics/               # Topics pages
  weak-areas/           # Weak-area insights page
prisma/
  schema.prisma         # DB models
  seed.ts               # Initial topic/formula seed
lib/                    # Auth, API helpers, validation, AI utils
components/             # Shared UI and app shell
```

---

## 🗃️ Database models

Core entities:

- `User`
- `Topic`
- `Formula`
- `SavedProblem`
- `WeakArea`

Relations are set so each user can have many saved problems + weak areas, and each topic can map to formulas/problems/weak-area records.

---

## 🔐 Authentication flow

- Register/login via API routes.
- Passwords are hashed with `bcryptjs`.
- JWT token is issued and stored in a cookie.
- Protected routes require a valid token.

---

## 🚀 Run locally

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env` from `.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mathbro"
JWT_SECRET="replace-with-strong-secret"
OPENAI_API_KEY=""
```

### 3) Generate Prisma client

```bash
npm run prisma:generate
```

### 4) Run migrations

```bash
npm run prisma:migrate
```

### 5) Seed initial data

```bash
npm run db:seed
```

### 6) Start dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## 🧪 Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:migrate` — run Prisma dev migrations
- `npm run db:seed` — seed starter topics/formulas

---

## 🔌 Main API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/ai/solve`
- `GET /api/dashboard`
- `GET,POST /api/saved-problems`
- `GET /api/weak-areas`
- `GET /api/formulas`
- `GET /api/topics`
- `GET /api/topics/[id]`
- `POST /api/practice/submit`

> Some endpoints require authentication.

---

## 📌 Notes

- The app is structured to be easy to extend with more topics, formulas, and adaptive learning logic.
- `OPENAI_API_KEY` can be left empty during early local development if you rely on fallback response behavior.

---

## 👨‍💻 Author

Built by the MathBro team.
If you ship improvements, feel free to open a PR and keep helping students learn math with confidence.
