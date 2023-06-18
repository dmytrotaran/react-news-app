FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
# COPY package*.json ./

RUN npm install --production
RUN npm run build


# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]

