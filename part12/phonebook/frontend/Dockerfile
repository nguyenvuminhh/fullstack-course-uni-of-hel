FROM node:20 AS buildstage

ENV VITE_BACKEND_URL=http://localhost:8080

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=buildstage /usr/src/app/dist /usr/share/nginx/html