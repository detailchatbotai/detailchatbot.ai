# 🚀 Deployment Guide

This guide covers deploying your Chatbot.ai SaaS application to production using Railway (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub repository with your forked code
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- Supabase project (https://supabase.com)

## 🔧 Backend Deployment (Railway)

### 1. Create Railway Project

1. Go to [Railway](https://railway.app) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your forked repository
5. Railway will auto-detect the backend and create a service

### 2. Add Database

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will create a managed Postgres database
4. The `DATABASE_URL` environment variable is auto-created

### 3. Configure Environment Variables

In Railway dashboard → Your Backend Service → Variables, add:

```env
# Database (auto-created by Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI API (for chatbot functionality)
OPENAI_API_KEY=your_openai_api_key

# Environment
ENVIRONMENT=production

# CORS Origins (update with your domain)
CORS_ORIGINS=https://your-frontend-domain.vercel.app,https://your-custom-domain.com
```

### 4. Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain (e.g., `api.your-domain.com`)
3. Configure DNS as instructed by Railway

## 🌐 Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Set Root Directory to `frontend`
5. Vercel auto-detects Next.js configuration

### 2. Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
# Backend API URL (use your Railway domain)
NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app

# Supabase Configuration (frontend needs anon key only)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain (e.g., `app.your-domain.com`)
3. Configure DNS as instructed by Vercel

## 🗃️ Database Setup

### 1. Run Migrations

After Railway deployment, run database migrations:

```bash
# Connect to your Railway project
railway login
railway link [project-id]

# Run migrations
railway run alembic upgrade head
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Go to Authentication → Settings
3. Configure redirect URLs:
   - `https://your-domain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

## 🔒 Environment Variables Template

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Environment
ENVIRONMENT=production

# CORS
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

### Frontend (.env.local)
```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app

# Supabase (public keys only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🚀 Deployment Steps Summary

1. **Fork this repository** to your GitHub account
2. **Deploy backend** to Railway:
   - Connect GitHub repo
   - Add PostgreSQL database
   - Configure environment variables
3. **Deploy frontend** to Vercel:
   - Connect GitHub repo
   - Set root directory to `frontend`
   - Configure environment variables
4. **Setup Supabase** authentication
5. **Run database migrations** via Railway CLI
6. **Test your deployment**

## 📊 Monitoring & Logs

### Railway (Backend)
- View logs: Railway Dashboard → Service → Logs
- Monitor metrics: Railway Dashboard → Service → Metrics
- Database access: Railway Dashboard → Postgres → Connect

### Vercel (Frontend)
- View logs: Vercel Dashboard → Project → Functions
- Monitor performance: Vercel Dashboard → Project → Analytics
- Edge functions: Vercel Dashboard → Project → Edge Functions

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Update `CORS_ORIGINS` in backend environment variables
2. **Database Connection**: Ensure `DATABASE_URL` is properly set
3. **Supabase Auth**: Check redirect URLs in Supabase dashboard
4. **API Connection**: Verify `NEXT_PUBLIC_API_BASE_URL` matches your Railway domain

### Health Checks

- Backend health: `https://your-backend.railway.app/health`
- Frontend: Should load at your Vercel domain
- Database: Check Railway Postgres metrics

## 💰 Estimated Costs

- **Railway**: $5/month (Hobby plan - always-on backend)
- **Vercel**: Free (for most use cases)
- **Supabase**: Free tier (up to 50,000 monthly active users)
- **Total**: ~$5/month

## 🔄 Continuous Deployment

Both Railway and Vercel automatically deploy when you push to your main branch:

1. Push code to GitHub
2. Railway/Vercel automatically build and deploy
3. Zero-downtime deployment
4. Automatic rollback on failure

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)