#!/usr/bin/with-contenv bashio

mongod --bind_ip 0.0.0.0 --fork --logpath /var/log/mongodb/mongod.log

if [ "${NODE_ENV:-development}" = "production" ]; then
    yarn get-ingress
    yarn build
fi

yarn start

