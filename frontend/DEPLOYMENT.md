# Deployment Guide

## Environment Variables

For successful deployment, you need to set the following environment variable:

### `VITE_API_BASE_URL`
- **Development**: `http://localhost:3000` (default)
- **Production**: Your backend API URL (e.g., `https://your-backend-api.onrender.com`)

## Render.com Deployment

1. **Set Environment Variable**: In your Render dashboard, add the environment variable:
   - Key: `VITE_API_BASE_URL`
   - Value: Your backend API URL

2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`

## Common Issues Fixed

- ✅ Import case sensitivity issues resolved
- ✅ Component import paths corrected
- ✅ API endpoints configured for environment variables
- ✅ Build process verified working

## Testing Locally

```bash
npm run build
```

This should complete successfully without errors.
