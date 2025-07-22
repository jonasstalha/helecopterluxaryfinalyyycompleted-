# 🚁 Hostinger Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Domain Setup
- [ ] Main domain configured (e.g., `yourdomain.com`)
- [ ] API subdomain created (e.g., `api.yourdomain.com`)
- [ ] SSL certificates enabled for both domains
- [ ] DNS records properly configured

### 2. Hostinger Account Requirements
- [ ] Business plan or higher (required for Node.js support)
- [ ] Node.js enabled in hosting control panel
- [ ] FTP/SFTP access configured
- [ ] File Manager access available

## 🚀 Deployment Steps

### Step 1: Upload Frontend Files
1. **Navigate to your main domain's folder** (usually `public_html/`)
2. **Upload all files from `deployment/frontend/`**:
   - `index.html`
   - `assets/` folder (with all images and CSS/JS files)
   - `.htaccess` file (for React Router support)
3. **Verify upload** by visiting your domain

### Step 2: Upload Backend Files
1. **Navigate to your API subdomain folder** (e.g., `public_html/api/`)
2. **Upload all files from `deployment/backend/`**:
   - `server.js`
   - `package.json`
   - `emailService.js`
   - `.env` file
   - `.htaccess` file
   - All other backend files
3. **Do NOT upload `node_modules/` folder** - install dependencies on server

### Step 3: Configure Environment Variables

#### Frontend Environment (`.env.production`)
Update these values in your frontend build:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

#### Backend Environment (`.env`)
Update these values in your backend `.env` file:
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
STRIPE_SECRET_KEY=your_stripe_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
ADMIN_EMAIL=your_admin_email@gmail.com
```

### Step 4: Install Backend Dependencies
1. **SSH into your server** or use Hostinger's terminal
2. **Navigate to your API folder**:
   ```bash
   cd public_html/api/
   ```
3. **Install dependencies**:
   ```bash
   npm install --production
   ```
4. **Start the application**:
   ```bash
   npm start
   ```

### Step 5: Configure Node.js App
1. **In Hostinger control panel**, go to "Node.js"
2. **Create new Node.js app**:
   - Application root: `/api/`
   - Application URL: `api.yourdomain.com`
   - Node.js version: Latest stable (18.x or 20.x)
   - Application startup file: `server.js`
3. **Install dependencies** through the control panel
4. **Start the application**

## 🔧 Important Configuration Notes

### 1. .htaccess Files
- **Frontend `.htaccess`**: Handles React Router routing
- **Backend `.htaccess`**: Handles API routing (if needed)

### 2. CORS Configuration
- Backend is configured to accept requests from your frontend domain
- Make sure `FRONTEND_URL` in backend `.env` matches your actual domain

### 3. Stripe Configuration
- Update webhook URL in Stripe dashboard to point to your API
- Test payments in Stripe test mode first
- Switch to live keys when ready for production

### 4. Email Configuration
- Gmail account configured for sending emails
- App-specific password may be required
- Test email functionality after deployment

## 🧪 Testing Your Deployment

### 1. Frontend Tests
- [ ] Website loads at `https://yourdomain.com`
- [ ] All pages navigate correctly
- [ ] Images and assets load properly
- [ ] Responsive design works on mobile

### 2. Backend Tests
- [ ] API health check: `https://api.yourdomain.com/api/health`
- [ ] CORS working (no console errors)
- [ ] Payment processing works
- [ ] Email sending works
- [ ] Error handling works

### 3. Integration Tests
- [ ] Complete booking flow works
- [ ] Payment processing end-to-end
- [ ] Email notifications sent
- [ ] Data persistence works

## 🚨 Troubleshooting

### Common Issues:
1. **404 Errors**: Check `.htaccess` files are uploaded
2. **CORS Errors**: Verify `FRONTEND_URL` in backend `.env`
3. **API Not Working**: Check Node.js app is running
4. **Payment Issues**: Verify Stripe keys are correct
5. **Email Issues**: Check Gmail app password

### Debug Steps:
1. Check Hostinger error logs
2. Use browser dev tools console
3. Test API endpoints individually
4. Verify environment variables

## 📱 Post-Deployment

### 1. Security
- [ ] Update all passwords
- [ ] Enable SSL for both domains
- [ ] Set up regular backups
- [ ] Monitor for unusual activity

### 2. Performance
- [ ] Test website speed
- [ ] Optimize images if needed
- [ ] Enable caching if available
- [ ] Monitor server resources

### 3. SEO & Analytics
- [ ] Update meta tags
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics
- [ ] Test all pages for SEO

## 🎉 Success!

Once everything is working:
1. **Test the complete booking flow**
2. **Verify all emails are sent**
3. **Check payment processing**
4. **Test on different devices**
5. **Share your live helicopter booking app!**

---

## 📞 Support

If you encounter issues:
1. Check the `HOSTINGER_DEPLOYMENT_GUIDE.md` file
2. Review Hostinger's Node.js documentation
3. Check your domain's error logs
4. Test API endpoints individually

## 🔄 Updates

To update your app:
1. Make changes locally
2. Run `npm run build` for frontend
3. Upload new files to replace old ones
4. Restart Node.js app if backend changed

---

**Ready to deploy? Follow this checklist step by step and you'll have your helicopter booking app live on Hostinger! 🚁✈️**
