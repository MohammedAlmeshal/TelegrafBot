FROM node:14 

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

ENV NODE_PATH=./build

EXPOSE 3000

RUN npm run build

CMD ["node","build","/index.js"]