# 📋 Vercel Deployment Checklist

## ✅ Pre-Deployment

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `vercel.json` files created for both frontend and backend
- [ ] Environment variables ready
- [ ] Stripe keys obtained
- [ ] Email configuration ready

## 🚀 Frontend Deployment

- [ ] Import repository to Vercel
- [ ] Set root directory to `/` (default)
- [ ] Configure environment variables:
  - [ ] `VITE_API_BASE_URL`
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY`
- [ ] Deploy frontend
- [ ] Test frontend URL: `https://your-project.vercel.app`

## 🔧 Backend Deployment  

- [ ] Create new Vercel project for backend
- [ ] Import same repository
- [ ] Set root directory to `backend`
- [ ] Configure environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `FRONTEND_URL` (use frontend URL from above)
  - [ ] `EMAIL_USER`
  - [ ] `EMAIL_PASS`
  - [ ] `ADMIN_EMAIL`
- [ ] Deploy backend
- [ ] Test API health: `https://your-backend.vercel.app/api/health`

## 🔄 Final Configuration

- [ ] Update frontend `VITE_API_BASE_URL` with backend URL
- [ ] Redeploy frontend with updated API URL
- [ ] Test complete booking flow
- [ ] Verify CORS is working
- [ ] Test payment processing
- [ ] Test email notifications

## 🧪 Testing

- [ ] Frontend loads correctly
- [ ] All pages navigate properly
- [ ] API endpoints respond
- [ ] Payment flow works end-to-end
- [ ] Email notifications sent
- [ ] Mobile responsive design
- [ ] Error handling works

## 🎉 Go Live!

- [ ] Custom domain configured (optional)
- [ ] SSL certificates active
- [ ] Analytics set up (optional)
- [ ] Monitoring in place
- [ ] Backup strategy implemented

---

**🚁 Your helicopter booking app is ready for Vercel!**
