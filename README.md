# FitForm Fitness App

A React Native/Expo fitness application with a Hono backend.

## Development

### Prerequisites
- Node.js 18+
- Bun (for package management)
- Expo CLI

### Setup
1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run start
   ```

3. Start the backend in development mode:
   ```bash
   bun run dev:backend
   ```

## Deployment on Railway

This app is configured for deployment on Railway. The deployment process:

1. **Build Phase**: Compiles the TypeScript backend and exports the Expo web app
2. **Deploy Phase**: Starts the backend server with health checks

### Railway Configuration
- **Builder**: Nixpacks (automatically detects Node.js)
- **Build Command**: `npm run build:backend && npm run build`
- **Start Command**: `npm run start:backend`
- **Health Check**: `/` endpoint returns status

### Environment Variables
Set these in your Railway project:
- `PORT`: Server port (auto-set by Railway)
- `NODE_ENV`: Set to `production` for production deployment

### Manual Deployment
1. Connect your GitHub repository to Railway
2. Railway will automatically detect the configuration
3. Deployments happen automatically on git push

## Project Structure
- `app/` - Expo Router app screens
- `backend/` - Hono API server with tRPC
- `providers/` - React context providers
- `lib/` - Utility functions and configurations
