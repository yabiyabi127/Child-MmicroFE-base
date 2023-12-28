# Extending image
FROM node:erbium-alpine

RUN set -xe \
    && apk add --no-cache bash git openssh \
    && npm install -g npm \
    && git --version && bash --version && ssh -V && npm -v && node -v && yarn -v

ARG home_dir=/home/node/app
ARG exposed_port=4000

# Create app directory
RUN mkdir -p ${home_dir}
WORKDIR ${home_dir}
# Install app dependencies
COPY --chown=node:node package.json ${home_dir}

#RUN npm install
RUN yarn install

# Bundle app source
COPY --chown=node:node . ${home_dir}

# Port to listener
EXPOSE ${exposed_port}

# Environment variables
ENV NODE_ENV production
ENV PORT ${exposed_port}
ENV PUBLIC_PATH "/"
ENV NODE_OPTIONS --max_old_space_size=8192
ENV NODE_MAX_MEM 8192

#RUN chmod +x node_modules/.bin/react-scripts
RUN chmod +x ${home_dir}/node_modules/.bin/react-scripts

#RUN npm run build
RUN npm run build --nomaps
#RUN npm run-script build
#RUN yarn build

# Main command
CMD [ "node", "server/index.js"]
