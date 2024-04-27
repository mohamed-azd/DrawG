FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i --save-dev nodemon

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["npx", "nodemon", "--legacy-watch", "dist/app.js"]

