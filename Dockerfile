FROM node:21.4.0
LABEL authors="arch"


WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
COPY build /app

RUN npm ci --omit dev

EXPOSE 3000

CMD ["node", "index.js"]

#write a  while true loop in bash with the current time as output
