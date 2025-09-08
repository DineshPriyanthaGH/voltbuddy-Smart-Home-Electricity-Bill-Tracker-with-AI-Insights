# VoltBuddy Deployment Guide

## Quick Deployment Steps

### 1. Environment Variables Setup
**Backend (.env):**
```
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 2. Frontend Deployment (Vercel)
```bash
cd voltbuddy-frontend
npm install -g vercel
vercel --prod
```

### 3. Backend Deployment (Railway)
```bash
cd voltbuddy-backend
npm install -g @railway/cli
railway login
railway init
railway up
```

### 4. Database Setup (MongoDB Atlas)
1. Create account at https://cloud.mongodb.com
2. Create free cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Update backend environment variables

### 5. Update API URLs
After backend deployment, update frontend API calls to use production URL.

### 6. Test Deployment
- Check frontend loads correctly
- Test user registration/login
- Verify bill calculation works
- Test AI features
- Check email notifications

## Hosting Platforms Comparison

| Platform | Cost | Ease | Best For |
|----------|------|------|----------|
| Vercel + Railway | Free | Easy | Students/Demo |
| Netlify + Heroku | Free tier | Medium | Small projects |
| Render | Free tier | Easy | All-in-one solution |
| AWS/Azure | Pay-as-use | Complex | Production apps |

## Common Issues & Solutions

**CORS Errors:** Update backend CORS settings for production URLs
**API URLs:** Update all localhost:5001 to production backend URL
**Environment Variables:** Ensure all secrets are properly set
**Database Connection:** Check MongoDB Atlas IP whitelist

## Production Checklist
- [ ] Environment variables configured
- [ ] Database connected
- [ ] API URLs updated
- [ ] CORS settings correct
- [ ] Email service working
- [ ] AI features functional
- [ ] Mobile responsive tested
- [ ] Security headers added
