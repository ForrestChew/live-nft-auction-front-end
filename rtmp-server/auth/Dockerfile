FROM node:14.17.1
COPY package*.json ./
RUN npm install
COPY server.js ./
CMD ["npm", "start"]