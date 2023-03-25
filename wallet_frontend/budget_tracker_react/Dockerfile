# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Build the app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose port 80
# EXPOSE 80

# Start the app
CMD ["npm", "start"]