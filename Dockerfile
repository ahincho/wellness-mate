# Stage 1: Build
FROM node:22.14.0-alpine AS build
# Set working directory
WORKDIR /app
# Copy package files and install dependencies (including devDependencies)
COPY package*.json ./
RUN npm install
# Copy source code
COPY . .
# Build the application (requires NestJS CLI and TypeScript from devDependencies)
RUN npm run build
# Remove devDependencies to reduce size of node_modules
RUN npm prune --omit=dev
# Stage 2: Production
FROM node:22.14.0-alpine AS production
# Set working directory
WORKDIR /app
# Copy only required production files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Expose the application port
EXPOSE 3000
# Run the application
CMD ["node", "dist/main"]