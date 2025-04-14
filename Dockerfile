# Job 1: Build
FROM node:22.14.0-alpine AS build
# Set working directory inside the container
WORKDIR /app
# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
# Install dependencies (including dev dependencies)
RUN npm install
# Copy the application code after installing dependencies
COPY . .
# Build the application
RUN npm run build
# Job 2: Production
FROM node:22.14.0-alpine AS production
# Set working directory inside the container
WORKDIR /app
# Copy the built application and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
# Copy only production dependencies (no dev dependencies)
COPY package*.json ./
RUN npm install --only=production
# Expose the application port
EXPOSE 3000
# Start the application
CMD ["npm", "run", "start:prod"]