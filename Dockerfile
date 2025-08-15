# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lock ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the backend
RUN npm run build:backend

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:backend"]
