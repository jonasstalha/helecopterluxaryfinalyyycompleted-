@echo off
echo 🚀 Vercel Deployment Script for Helicopter Rental App

echo.
echo 📦 Step 1: Building frontend...
call npm run build

echo.
echo 📁 Step 2: Copying Vercel configuration files...
copy vercel.json deployment\frontend\
copy backend\vercel.json deployment\backend\

echo.
echo ✅ Deployment package ready for Vercel!
echo.
echo 📋 Next steps:
echo 1. Push your code to GitHub
echo 2. Import your repository to Vercel (2 separate projects)
echo 3. Frontend: Set root directory to '/' 
echo 4. Backend: Set root directory to 'backend'
echo 5. Configure environment variables in Vercel dashboard
echo 6. Deploy both projects
echo.
echo 🔗 Helpful links:
echo - Vercel Dashboard: https://vercel.com/dashboard
echo - Deployment Guide: VERCEL_DEPLOYMENT_GUIDE.md
echo.
echo 🚁 Happy deploying!
pause
