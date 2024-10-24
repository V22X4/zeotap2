# Use an appropriate base image for your backend (e.g., Node.js)
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
