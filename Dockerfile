# Mantainer: Amik (amik.kandel@digiconnect.com.np)
# Copyright @ DigiConnect Nepal

FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "-p", "3000" , "build"]

#CMD ["npm", "start"]
