FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm", "start"]