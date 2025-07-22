@echo off
echo 🚁 Starting Helicopter Rental App Deployment...

REM Step 1: Build frontend
echo 📦 Building frontend...
call npm run build

REM Step 2: Create deployment package
echo 📁 Creating deployment package...
if not exist deployment mkdir deployment
if not exist deployment\frontend mkdir deployment\frontend
if not exist deployment\backend mkdir deployment\backend

REM Copy frontend files
xcopy /E /I /Y dist\* deployment\frontend\
copy /Y dist\.htaccess deployment\frontend\

REM Copy backend files
xcopy /E /I /Y backend\* deployment\backend\
copy /Y backend\.htaccess deployment\backend\

echo ✅ Deployment package created in 'deployment' folder
echo.
echo 📋 Next steps:
echo 1. Upload deployment/frontend/* to your domain's public_html folder
echo 2. Upload deployment/backend/* to your API subdomain folder (e.g., api.yourdomain.com)
echo 3. Update environment variables in both .env files with your actual domain
echo 4. Run 'npm install --production' in your API folder on the server
echo 5. Test your deployment!
echo.
echo 🔗 Don't forget to update:
echo    - VITE_API_BASE_URL in .env.production
echo    - FRONTEND_URL in backend/.env
echo    - Your actual domain names
echo.
echo 🚁 Deployment package ready for upload!
pause
