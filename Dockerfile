FROM node

WORKDIR /app

COPY package.json .

RUN npm install -g server

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["serve", "-s", "build"]

#CMD ["npm", "start"]