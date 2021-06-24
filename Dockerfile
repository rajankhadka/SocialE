FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g server

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]

#CMD ["npm", "start"]