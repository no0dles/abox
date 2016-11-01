# FROM mhart/alpine-node:base-6
FROM mhart/alpine-node:6

WORKDIR /app

ADD package.json .

RUN npm install

ADD dist/ .

EXPOSE 3000
CMD ["node", "src/http/cli.js", "src/http/demo.js"]
