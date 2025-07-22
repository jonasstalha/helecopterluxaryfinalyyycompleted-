#!/bin/bash

# Helicopter Rental App Deployment Script for Hostinger

echo "🚁 Starting Helicopter Rental App Deployment..."

# Step 1: Build frontend
echo "📦 Building frontend..."
npm run build

# Step 2: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment/frontend
mkdir -p deployment/backend

# Copy frontend files
cp -r dist/* deployment/frontend/
cp dist/.htaccess deployment/frontend/

# Copy backend files
cp -r backend/* deployment/backend/
cp backend/.htaccess deployment/backend/

echo "✅ Deployment package created in 'deployment' folder"
echo ""
echo "📋 Next steps:"
echo "1. Upload deployment/frontend/* to your domain's public_html folder"
echo "2. Upload deployment/backend/* to your API subdomain folder (e.g., api.yourdomain.com)"
echo "3. Update environment variables in both .env files with your actual domain"
echo "4. Run 'npm install --production' in your API folder on the server"
echo "5. Test your deployment!"
echo ""
echo "🔗 Don't forget to update:"
echo "   - VITE_API_BASE_URL in .env.production"
echo "   - FRONTEND_URL in backend/.env"
echo "   - Your actual domain names"

echo "🚁 Deployment package ready for upload!"
