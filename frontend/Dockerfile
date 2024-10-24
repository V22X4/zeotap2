# Use an appropriate base image for your frontend (e.g., Node.js for React)
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
