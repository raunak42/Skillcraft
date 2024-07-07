#!/bin/bash

source .env
DEVICE_NAME="raunak42-server"

# Use the `expect` command to automate the interactive process
expect <<EOF
spawn stripe login --interactive
expect "Enter your API key: "
send "${STRIPE_SECRET_KEY}\r"
expect "How would you like to identify this device in the Stripe Dashboard?"
send "${DEVICE_NAME}\r"
expect eof
EOF
