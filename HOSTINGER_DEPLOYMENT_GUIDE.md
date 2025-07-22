# Hostinger Deployment Guide

## Prerequisites
- Hostinger hosting account with Node.js support
- Domain name configured
- FTP/SFTP access to your hosting account

## Deployment Steps

### 1. Frontend Deployment (Static Files)
1. **Upload frontend files to your domain's public_html folder:**
   - Upload all files from the `dist/` folder to your domain's public_html directory
   - Make sure `.htaccess` file is included for React Router support

### 2. Backend Deployment (API Subdomain)
1. **Create a subdomain for your API (e.g., api.yourdomain.com):**
   - Log into your Hostinger control panel
   - Go to "Subdomains" and create `api.yourdomain.com`
   - Point it to a new folder like `public_html/api`

2. **Upload backend files:**
   - Upload all files from the `backend/` folder to your api subdomain folder
   - Make sure to include `.htaccess` file for proper routing

3. **Install dependencies:**
   - SSH into your server (if supported) or use Hostinger's file manager
   - Navigate to your api folder
   - Run: `npm install --production`

### 3. Environment Configuration

#### Frontend Environment Variables:
Update `.env.production` with your actual domain:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RkUIVJTe3hljh4L4g1Sf75bZbpTM5GHE93Gn2TwLfSg4b6d7BXUFtIRKsPzxGeBAozQ6EzwL4RNnO7ClWLpp8zB00JjoZe2IM
```

#### Backend Environment Variables:
Update `backend/.env` with your actual domain:
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
STRIPE_SECRET_KEY=your_stripe_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
ADMIN_EMAIL=your_admin_email@gmail.com
```

### 4. File Structure After Deployment

```
yourdomain.com (public_html/)
├── index.html
├── assets/
├── .htaccess
└── [other dist files]

api.yourdomain.com (public_html/api/)
├── server.js
├── package.json
├── .env
├── .htaccess
├── emailService.js
└── node_modules/
```

### 5. Important Notes

1. **SSL Certificate:** Make sure SSL is enabled for both your main domain and API subdomain
2. **Node.js Version:** Ensure your Hostinger plan supports Node.js (usually Business plans and above)
3. **CORS:** The backend is configured to accept requests from your frontend domain
4. **Stripe Webhooks:** If you're using Stripe webhooks, update the webhook URL in your Stripe dashboard

### 6. Testing Your Deployment

1. Visit your main domain to test the frontend
2. Test the API by visiting `https://api.yourdomain.com/api/health`
3. Test the booking flow end-to-end

### 7. Troubleshooting

- **404 Errors:** Make sure `.htaccess` files are properly uploaded
- **CORS Errors:** Check that FRONTEND_URL matches your actual domain
- **API Not Working:** Verify Node.js is running and environment variables are set
- **Email Not Sending:** Check email credentials and ensure less secure apps are enabled for Gmail

### 8. Alternative Deployment Method

If you prefer to use a single domain instead of a subdomain:

1. Upload frontend files to `public_html/`
2. Upload backend files to `public_html/api/`
3. Update VITE_API_BASE_URL to `https://yourdomain.com/api`

## Security Reminders

- Never commit .env files to version control
- Use environment variables for all sensitive data
- Enable HTTPS for both frontend and backend
- Regularly update dependencies
- Monitor your Stripe dashboard for any suspicious activity

## Support

If you encounter issues:
1. Check Hostinger's error logs
2. Verify all environment variables are correctly set
3. Test API endpoints individually
4. Check browser console for frontend errors
