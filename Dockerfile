FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code and public assets
COPY . .

# Ensure public directory permissions
RUN chmod -R 755 public/

# Expose port 6464
EXPOSE 6464

# Set environment variables
ENV NODE_ENV=development
ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=6464

# Health check (simplified for alpine)

# Start the development server
CMD ["npm", "run", "dev"]
