# build stage
FROM node:lts-alpine as builde-stage
WORKDIR /app
RUN npm install -g yarn
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]