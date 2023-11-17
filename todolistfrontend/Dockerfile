FROM node:16.19.1-alpine AS build
WORKDIR /FrontEnd
ENV PATH /FrontEnd/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts -g --silent
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /FrontEnd/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]