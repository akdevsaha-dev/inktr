## Architecture
- Frontend: Next.js (App Router)
- State: Zustand
- Auth: HttpOnly cookies + JWT
- Backend: Go + Fiber
- DB: PostgreSQL + GORM
- Deployment: Vercel + Render

## Why this architecture?
- Stateless auth for scalability
- Server-side validation
- DB relations modeled explicitly