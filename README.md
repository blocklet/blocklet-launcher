# Blocklet Launcher

[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A simple blocklet that helps you to install blocklet on Blocklet Server.

[![docs](https://img.shields.io/badge/-run%20online-blue.svg)](https://install.arcblock.io/)

## Table of Contents

- [Launch on Blocklet Server](#launch-on-blocklet-server)
- [Visuals](#visuals)
- [Development](#development)
- [Requirement](#requirement)
  - [Clone and install dependencies](#clone-and-install-dependencies)
  - [Configuration](#configuration)
  - [Start debug](#start-debug)
  - [Deploy to local Blocklet Server](#deploy-to-local-blocklet-server)
- [License](#license)

## Visuals

![select page](/screenshots/select.png)
![purchase page](/screenshots/purchase.png)

## Development

## Requirement

- A locally running Blocklet Server

### Clone and install dependencies

```shell
git clone git@github.com:blocklet/blocklet-launcher.git
cd blocklet-launcher && yarn install
```

### Configuration

Put following contents in `.env.development.local`:

```bash
SKIP_PREFLIGHT_CHECK=true
LAUNCHER_URL={Blocklet Server Launcher Address}
LAUNCHER_INSTANCE_API={API to fetch user's Blocklet Server instances}
```

### Start debug

```shell
blocklet dev
```

### Deploy to local Blocklet Server

```shell
npm run bundle
blocklet deploy .blocklet/bundle
```

## License

[MIT](LICENSE)
