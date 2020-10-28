# Install On ABTNODE

> A simple blocklet that helps you to onboarding users to your forge-powered blockchain.

## Getting started

### Configuration

Put following contents in `.env`:

```ini
SKIP_PREFLIGHT_CHECK=true

# server side
BLOCKLET_PORT="3030"
BLOCKLET_APP_SK="0x7ebe8ba807cb217c57563aeb96b5c4c755af29a4bb935d77b1af549edaddf3a09bff6e162bd8a2fbfb6284921ecc243c209339f2e14f5eb64c5f7e5dccdc6700"
BLOCKLET_APP_ID="zNKn6o1t7CPMWU4wrbNnLuzKvoPWMVyhVgaf"
BLOCKLET_DATA_DIR="/tmp/abtnode/install-on-abtnode"

REACT_APP_BASE_URL="http://192.168.1.2:3030"
REACT_APP_APP_NAME="Blockchain Boarding Gate"
REACT_APP_API_PREFIX=""
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
