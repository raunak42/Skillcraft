#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

cd ~/Skillcraft #The script runs at root of ec2 instance, hence cd into repo first. Yml file says "sudo bash ~/Skillcraft/deploy.sh" but still it says it at the root of the ec2.
sudo git pull origin main
yarn install
yarn build
pm2 kill
pm2 start yarn --name skillcraft -- start
