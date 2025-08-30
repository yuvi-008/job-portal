# 🚀 Vercel Environment Variables Setup

## **Required Environment Variable:**

### **VITE_API_BASE_URL**
- **Value**: Your Render backend URL
- **Example**: `https://job-portal-backend.onrender.com`
- **Purpose**: Tells frontend where to find your backend API

## **How to Set in Vercel:**

1. Go to your Vercel project dashboard
2. Click on **"Settings"** tab
3. Go to **"Environment Variables"** section
4. Add new variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend-app.onrender.com`
   - **Environment**: Production, Preview, Development
5. Click **"Save"**
6. Redeploy your project

## **Current Status:**
✅ Frontend builds successfully  
✅ Vercel configuration set to `frontend` root directory  
⚠️ Need to set `VITE_API_BASE_URL` environment variable  

## **Next Steps:**
1. Deploy your backend on Render first
2. Get the backend URL
3. Set `VITE_API_BASE_URL` in Vercel
4. Redeploy frontend
