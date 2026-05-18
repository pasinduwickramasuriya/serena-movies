# 1. Use a lightweight Node.js image (Version 20)
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the package.json and package-lock.json first
# (This helps Docker cache dependencies if they haven't changed)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your app's source code
COPY . .

# 6. Build the Next.js application for production
RUN npm run build

# 7. Expose port 3000 where Next.js runs by default
EXPOSE 3000

# 8. Define the command to start your application (binding to 0.0.0.0 is required for Docker)
CMD ["npm", "start", "--", "-H", "0.0.0.0"]
