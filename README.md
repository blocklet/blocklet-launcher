# Install On ABT Node

> A simple blocklet that helps you to install blocket on ABT Node

## Getting started

### Configuration

Put following contents in `.env`:

```ini
SKIP_PREFLIGHT_CHECK=true

# server side
BLOCKLET_PORT="3030"
BLOCKLET_APP_ID="zNKn6o1t7CPMWU4wrbNnLuzKvoPWMVyhVgaf"
BLOCKLET_DATA_DIR="/tmp/abtnode/install-on-abtnode"

REACT_APP_BASE_URL="http://192.168.1.2:3030"
REACT_APP_APP_NAME="Install on ABT Node"
```

### Start hacking

```shell
mkdir -p /tmp/abtnode/install-on-abtnode
npm run start:server
npm run start:client
```

### Deploy to local ABT Node

```shell
abtnode deploy .
```
