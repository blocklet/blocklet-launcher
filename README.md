# Install On ABT Node

[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A simple blocklet that helps you to install blocket on ABT Node

## Visuals

![index page](/screenshots/index.png)

## Installation

- Download the repo

```
git clone git@github.com:blocklet/install-on-abtnode.git
yarn install
```

- Setting environment variables to `.env`

```ini
SKIP_PREFLIGHT_CHECK=true

# server side
BLOCKLET_PORT="3030"
BLOCKLET_APP_ID="z8iZmTHdfidsHjmzCLeSUbdj4yrABe1CewFvF"
BLOCKLET_DATA_DIR="/tmp/abtnode/install-on-abtnode"

REACT_APP_BASE_URL="http://127.0.0.1:3030"
REACT_APP_APP_NAME="Install on ABT Node"
```

- Start the service

```
yarn start
```

## Usage

### Deploy to local ABT Node

```
abtnode init
abtnode start
abtnode deploy .
```

## License

[MIT](LICENSE)
