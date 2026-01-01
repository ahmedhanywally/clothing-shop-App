FROM node:22-alpine

# Optional: install bash and curl for debugging
RUN apk add --no-cache bash curl

WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Copy rest of the app
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]