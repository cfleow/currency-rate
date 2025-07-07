FROM node:20-alpine

# Install OpenSSL to fix Prisma issues
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma/ ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate
RUN npx prisma db push --accept-data-loss
RUN npx prisma db seed

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]