# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier is sufficient)
- GitHub/GitLab/Bitbucket repository
- Environment variables configured

## 🎯 Quick Deployment Steps

### 1. Frontend Deployment

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Select the root directory (not backend folder)

3. **Configure Environment Variables**:
   Add these in Vercel dashboard under "Environment Variables":
   ```
   VITE_API_BASE_URL=https://your-backend-domain.vercel.app
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RkUIVJTe3hljh4L4g1Sf75bZbpTM5GHE93Gn2TwLfSg4b6d7BXUFtIRKsPzxGeBAozQ6EzwL4RNnO7ClWLpp8zB00JjoZe2IM
   ```

4. **Deploy**:
   - Click "Deploy"
   - Your frontend will be available at `https://your-project-name.vercel.app`

### 2. Backend Deployment

1. **Create separate Vercel project for backend**:
   - Go to Vercel dashboard
   - Click "New Project"
   - Import the same GitHub repository
   - Set **Root Directory** to `backend`

2. **Configure Environment Variables**:
   Add these in Vercel dashboard:
   ```
   NODE_ENV=production
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   VITE_DEV_SERVER_URL=http://localhost:5174
   REACT_DEV_SERVER_URL=http://localhost:3000
   BACKEND_URL=https://your-backend-domain.vercel.app
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   ADMIN_EMAIL=vanguardhelicopter@gmail.com
   ```

3. **Deploy**:
   - Click "Deploy"
   - Your backend API will be available at `https://your-backend-name.vercel.app`

## 🔧 Configuration Files Explained

### Frontend vercel.json
- **Static Build**: Uses Vite build output
- **SPA Routing**: All routes redirect to index.html
- **Asset Caching**: Optimizes static assets
- **Environment Variables**: References Vercel environment variables

### Backend vercel.json
- **Node.js Runtime**: Uses Node.js 18.x
- **API Routes**: All requests routed to server.js
- **CORS Headers**: Configured for API access
- **Environment Variables**: Secure environment variable references

## 🌍 Environment Variables Setup

### Using Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy frontend
cd /path/to/your/project
vercel --prod

# Deploy backend
cd backend
vercel --prod
```

### Environment Variables via CLI
```bash
# Add environment variables
vercel env add VITE_API_BASE_URL
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
# ... add all other variables
```

## 📱 Post-Deployment Steps

### 1. Update Frontend Environment
After backend deployment, update frontend environment:
```
VITE_API_BASE_URL=https://your-backend-domain.vercel.app
```

### 2. Update Backend CORS
Ensure backend CORS includes your frontend domain:
```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 3. Test Your Deployment
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Payment processing works
- [ ] Email notifications work
- [ ] CORS is properly configured

## 🔒 Security Considerations

### Environment Variables
- Use Vercel's environment variable system
- Never commit sensitive keys to git
- Use different keys for development/production

### CORS Configuration
- Restrict CORS to your actual domains
- Don't use wildcard (*) in production
- Test cross-origin requests

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check FRONTEND_URL matches your actual domain
   - Verify CORS headers in backend

2. **Environment Variables Not Working**:
   - Ensure variables are set in Vercel dashboard
   - Redeploy after adding variables

3. **API Routes Not Found**:
   - Check vercel.json routing configuration
   - Verify server.js is in correct location

4. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in package.json

### Debug Steps:
1. Check Vercel function logs
2. Test API endpoints directly
3. Verify environment variables are loaded
4. Check CORS headers in browser dev tools

## 📊 Monitoring

### Vercel Dashboard Features:
- Real-time function logs
- Performance analytics
- Error tracking
- Deployment history

### Custom Monitoring:
- Add logging to your API endpoints
- Monitor Stripe webhook events
- Track email delivery status

## 🔄 Continuous Deployment

### Auto-Deploy from Git:
- Push to main branch → automatic deployment
- Preview deployments for pull requests
- Rollback capability

### Branch-based Deployments:
- `main` → production deployment
- `develop` → staging deployment
- Feature branches → preview deployments

## 🎉 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend API responding
- [ ] Environment variables configured
- [ ] CORS working correctly
- [ ] Payment processing functional
- [ ] Email notifications working
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Node.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions)

---

**🚁 Your helicopter booking app is now ready for Vercel deployment!**

Follow this guide step by step, and you'll have a production-ready application with automatic deployments, global CDN, and serverless functions.
