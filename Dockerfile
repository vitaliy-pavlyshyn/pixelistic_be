FROM node:15.4-alpine as build_image
RUN apk update && apk add bash && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


FROM node:15.4-alpine
WORKDIR /app
COPY --from=build_image /app .
EXPOSE 3000
CMD ["sh", "startup.sh"]
# CMD tail -f /dev/null