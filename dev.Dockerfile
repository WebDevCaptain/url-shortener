FROM node:16-alpine
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
CMD ["npm", "run", "dev"]