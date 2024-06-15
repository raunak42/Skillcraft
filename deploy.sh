#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

#Keep the user homogeneous, if one command is prefixed with sudo, prefix every other command including how you handle the start of this script in the yml file. Else just do not user sudo anywhere.

cd ~/Skillcraft #The script runs at root of ec2 instance, hence cd into repo first. Yml file says "sudo bash ~/Skillcraft/deploy.sh" but still it says it at the root of the ec2. #Writing cd /home/ubuntu/Skillcraft instead of cd ~/Skillcraft because the root dirs of sudo user and normal users are different respectively.
# git pull origin main
yarn install
yarn cache clean #every time "yarn install" runs, it builds up cache.
sudo yarn build
sudo pm2 kill
bash ~/Skillcraft/stripe_login.sh #This one does not work with sudo.
sudo pm2 start yarn --name skillcraft -- start
cd ~/Skillcraft/apps/skillcraft-user
sudo pm2 start yarn --name stripe-listener -- start-stripe-listener
sudo pm2 startup | sudo bash #This command generates a startup script and runs it.
sudo pm2 save                # Save the current PM2 process list for automatic respawn

#"yarn start" needs sudo so instead just give sudo permission to all pm2 processes.