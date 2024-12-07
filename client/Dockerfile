# Use an official Node runtime as a parent image
FROM node:23.0.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the client's application
COPY . .

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Define environment variable
ENV PORT 80

# Inform Docker that the container listens on port 80
EXPOSE 80

# Run serve when the container launches
CMD ["serve", "-s", "build", "-l", "80"]
