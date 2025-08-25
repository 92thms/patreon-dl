# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:20-slim
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8800
ENV PORT=8800
CMD ["node", "dist/webui/server.js"]
