#!/bin/bash

# Check if expect is installed
if ! command -v expect &> /dev/null; then
    # Install expect if not found
    if command -v apt-get &> /dev/null; then
        # Ubuntu/Debian
        sudo apt-get update
        sudo apt-get install -y expect
    elif command -v yum &> /dev/null; then
        # CentOS/RHEL
        sudo yum install -y expect
    elif command -v dnf &> /dev/null; then
        # Fedora
        sudo dnf install -y expect
    elif command -v brew &> /dev/null; then
        # macOS (Homebrew)
        brew install expect
    else
        echo "Unable to install expect. Please install it manually."
        exit 1
    fi
fi

sudo apt install gnome-keyring

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
