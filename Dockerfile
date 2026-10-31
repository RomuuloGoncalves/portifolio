# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built assets to Nginx (nested under /portfolio/ to match vite base config)
COPY --from=build /app/dist /usr/share/nginx/html/portfolio

# Add a simple index.html at root to redirect to /portfolio/
RUN echo '<meta http-equiv="refresh" content="0; url=/portfolio/" />' > /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
