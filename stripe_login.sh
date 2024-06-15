#!/bin/bash

# Set your Stripe API key
API_KEY="sk_test_51PEbJDSFIpXPowBcSg7nFlPBMfRlmcaESDocAp2VEPdQpc6oZotFW0GHfIViyTTyTX8bsQtceUDz20HkO7tHSmvq008ABlr4nH"

# Set the desired device name
DEVICE_NAME="raunak42-server"

# Use the `expect` command to automate the interactive process
expect <<EOF
spawn stripe login --interactive
expect "Enter your API key: "
send "${API_KEY}\r"
expect "How would you like to identify this device in the Stripe Dashboard?"
send "${DEVICE_NAME}\r"
expect eof
EOF
