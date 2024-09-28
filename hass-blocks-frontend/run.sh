#!/usr/bin/with-contenv bashio

if [ "${NODE_ENV:-development}" = "production" ]; then
    yarn get-ingress
    yarn build
    yarn start
else
    yarn dev
fi

