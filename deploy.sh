#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

cd /home/ubuntu/Skillcraft #The script runs at root of ec2 instance, hence cd into repo first. Yml file says "sudo bash ~/Skillcraft/deploy.sh" but still it says it at the root of the ec2. #Writing cd /home/ubuntu/Skillcraft instead of cd ~/Skillcraft because the root dirs of sudo user and normal users are different respectively.
# git pull origin main
yarn install
yarn build
pm2 kill
bash /home/ubuntu/Skillcraft/stripe_login.sh
pm2 start yarn --name skillcraft -- start
pm2 startup | bash #This command generates a startup script and runs it.
pm2 save                # Save the current PM2 process list for automatic respawn
