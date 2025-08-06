# Chatbot.ai

A monorepo SaaS platform for building AI chatbots for service businesses.

## Tech Stack

- **Backend**: FastAPI + PostgreSQL (via Supabase)
- **Frontend**: Next.js 14 + Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (Supabase)

## Quick Start

1. Clone the repository
2. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. Start with Docker:
   ```bash
   docker-compose up
   ```

## Development

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

## Project Structure

```
chatbot.ai/
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
└── docker-compose.yml
```