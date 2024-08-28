FROM node:20

# ENV BACKEND_URL=http://backend:3000

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]