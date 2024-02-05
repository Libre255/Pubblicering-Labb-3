FROM node:16.19.1-alpine AS build
WORKDIR /FrontEnd
ENV PATH /FrontEnd/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts -g --silent
COPY . ./
ENV REACT_APP_ENDPOINT https://todo-backend-bv.azurewebsites.net/todoapi
ENV REACT_APP_LOGIC_APP_END_POINT https://prod-130.westeurope.logic.azure.com:443/workflows/7f2b6be0c237403aad58c6de3b4f6444/triggers/logic-app-request-endpoint-bv/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Flogic-app-request-endpoint-bv%2Frun&sv=1.0&sig=m0nzyzWFL0v_Oj8yAQpGtVyc3al7jwC0tot5MwGuZfs
RUN npm run build

FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /FrontEnd/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]