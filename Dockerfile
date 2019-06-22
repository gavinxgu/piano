# build stage
FROM node as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN npm run build

# production stage
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g" ,"daemon off;"]
