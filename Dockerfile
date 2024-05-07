FROM node:18.17.1 AS frontend-builder
WORKDIR /app/frontend

COPY ./package.json ./package-lock.json ./
RUN npm install

FROM node:18.17.1 AS main-app
WORKDIR /home/app
COPY --from=frontend-builder /app/frontend/node_modules ./
COPY . ./

RUN npm cache clean -f
RUN npm install -g npm@10.1.0
RUN npm install craco --force
ENV NODE_OPTIONS=--max_old_space_size=8192
RUN npm run build

FROM nginx
COPY --from=main-app /home/app/build/ /var/www/dist/    
COPY --from=main-app /home/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=main-app /home/app/ssl/ /home/ssl/
RUN apt-get update && apt-get install -y curl

# Kiểm tra trạng thái của container sau khi chạy
HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost || exit 1    
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]