# Alternative Dockerfile if nixpacks fails
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 4321

# Start the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]