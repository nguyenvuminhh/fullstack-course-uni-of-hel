FROM node:20 AS buildingstage

ENV VITE_BACKEND_URL=http://localhost:8080

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test && npm run build

FROM nginx:1.25-alpine

COPY --from=buildingstage /usr/src/app/dist /usr/share/nginx/html