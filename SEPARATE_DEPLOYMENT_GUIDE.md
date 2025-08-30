# 🚀 Separate Backend & Frontend Deployment Guide

## **Overview**
This guide will help you deploy your backend and frontend separately on Render.com for better scalability and maintenance.

---

## **Part 1: Backend Deployment**

### **Step 1: Prepare Backend Repository**
1. **Create a new GitHub repository** for your backend (e.g., `job-portal-backend`)
2. **Copy backend files** to the new repository:
   ```bash
   # Create new directory
   mkdir job-portal-backend
   cd job-portal-backend
   
   # Copy backend files
   cp -r ../job\ portal/backend/* .
   cp ../job\ portal/backend/package.json .
   ```

### **Step 2: Deploy Backend on Render**

#### **2.1 Create New Web Service**
1. Go to [Render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your **backend GitHub repository**

#### **2.2 Configure Backend Service**
- **Name**: `job-portal-backend` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Choose your preferred plan

#### **2.3 Set Environment Variables**
Add these environment variables in Render dashboard:

| Key | Value | Description |
|-----|--------|-------------|
| `MONGODB_URI` | `your_mongodb_connection_string` | Your MongoDB connection string |
| `JWT_SECRET` | `your_secure_jwt_secret` | A secure random string for JWT |
| `JWT_EXPIRE` | `7d` | JWT token expiration |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `your_api_key` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `your_api_secret` | Your Cloudinary API secret |
| `FRONTEND_URL` | `https://your-frontend-app.onrender.com` | Your frontend URL (set after frontend deployment) |

#### **2.4 Deploy Backend**
1. Click **"Create Web Service"**
2. Wait for deployment to complete
3. **Copy the backend URL** (e.g., `https://job-portal-backend.onrender.com`)

---

## **Part 2: Frontend Deployment**

### **Step 3: Deploy Frontend on Render**

#### **3.1 Create New Static Site**
1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your **main GitHub repository** (the one with frontend)

#### **3.2 Configure Frontend Service**
- **Name**: `job-portal-frontend` (or your preferred name)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Plan**: Choose your preferred plan

#### **3.3 Set Environment Variables**
Add this environment variable:

| Key | Value | Description |
|-----|--------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend-app.onrender.com` | Your backend URL from Step 2.4 |

#### **3.4 Deploy Frontend**
1. Click **"Create Static Site"**
2. Wait for deployment to complete
3. **Copy the frontend URL** (e.g., `https://job-portal-frontend.onrender.com`)

---

## **Part 3: Final Configuration**

### **Step 4: Update Backend CORS**
1. Go back to your **backend service** in Render
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL
3. **Redeploy** the backend service

### **Step 5: Test Your Application**
1. **Frontend**: Visit your frontend URL
2. **Backend**: Test API endpoints at `your-backend-url/api/v1/user`
3. **Integration**: Test login/signup functionality

---

## **Environment Variables Summary**

### **Backend (.env)**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### **Frontend (.env)**
```bash
VITE_API_BASE_URL=https://your-backend-app.onrender.com
```

---

## **Troubleshooting**

### **Common Issues:**
1. **CORS Error**: Ensure `FRONTEND_URL` is set correctly in backend
2. **Build Failures**: Check Node.js version compatibility
3. **Database Connection**: Verify MongoDB URI format
4. **Environment Variables**: Ensure all variables are set in Render dashboard

### **Useful Commands:**
```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
cd frontend
npm install
npm run build
npm run preview
```

---

## **Benefits of Separate Deployment**
✅ **Independent Scaling**: Scale backend and frontend separately  
✅ **Better Performance**: Static frontend served from CDN  
✅ **Easier Maintenance**: Update one without affecting the other  
✅ **Cost Optimization**: Choose appropriate plans for each service  
✅ **Better Security**: Isolate backend from public frontend  

---

## **Next Steps After Deployment**
1. **Set up custom domains** (optional)
2. **Configure monitoring** and alerts
3. **Set up CI/CD** for automatic deployments
4. **Monitor performance** and optimize as needed

🎉 **Your job portal will now be fully deployed and accessible online!**
