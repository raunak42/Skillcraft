#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

sudo git pull origin main
yarn install
yarn build
pm2 kill
pm2 start yarn --name skillcraft -- start
