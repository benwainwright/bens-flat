#!/usr/bin/with-contenv bashio

if [ "${NODE_ENV:-development}" = "production" ]; then
    yarn start
else
    yarn dev
fi

