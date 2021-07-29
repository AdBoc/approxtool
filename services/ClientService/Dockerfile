FROM node:16.3.0-alpine3.11 as builder

WORKDIR /build

COPY . .
RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "serve"]