# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# # Build the Next.js app
# RUN yarn build

# Expose the desired port (replace <PORT_NUMBER> with the appropriate port)
EXPOSE 3000

# Start the app
CMD ["yarn", "dev"]