FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]

##FROM node:alpine
  #WORKDIR /usr/src/app
  #COPY build ./
  #CMD ["serve", "-s","build"]


##FROM node:18-alpine AS builder
  #ENV NODE_ENV production
  ## Add a work directory
  #WORKDIR /app
  ## Cache and Install dependencies
  #COPY package.json .
  #COPY package.lock .
  #RUN npm install --production
  ## Copy app files
  #COPY . .
  ## Build the app
  #RUN npm run build
  #
  ## Bundle static assets with nginx
  #FROM nginx:1.21.0-alpine as production
  #ENV NODE_ENV production
  ## Copy built assets from builder
  #COPY --from=builder /app/build /usr/share/nginx/html
  ## Add your nginx.conf
  #COPY nginx.conf /etc/nginx/conf.d/default.conf
  ## Expose port
  #EXPOSE 80
  ## Start nginx
  #CMD ["nginx", "-g", "daemon off;"]
