FROM node:20-alpine

WORKDIR /app

COPY front/package*.json ./

RUN npm install

COPY front/ .

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
