FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port 6464
EXPOSE 6464

# Set environment variable to ensure Vite binds to all interfaces
ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=6464

# Start the development server
CMD ["npm", "run", "dev"]
