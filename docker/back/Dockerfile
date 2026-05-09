FROM node:24-alpine

WORKDIR /app

COPY back/package*.json ./

RUN npm install

COPY back/ .

EXPOSE 3333

CMD ["sh", "-c", "npm install && node ace.js serve --hmr"]
