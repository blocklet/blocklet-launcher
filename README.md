# Blocklet Launcher

[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A simple blocklet that helps you to install blocklet on Blocklet Server.

[![docs](https://img.shields.io/badge/-run%20online-blue.svg)](https://install.arcblock.io/)

## Install on my Blocklet Server

[![Install on my Blocklet Server](https://raw.githubusercontent.com/blocklet/development-guide/main/assets/install_on_abtnode.svg)](https://install.arcblock.io/?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fblocklet%2Fblocklet-launcher%2Freleases%2Fdownload%2Fv1.2.0%2Fblocklet.json)

## Table of Contents

- [Install On ABT Node](#install-on-abt-node)
  - [Install on my ABT Node](#install-on-my-abt-node)
  - [Table of Contents](#table-of-contents)
  - [Visuals](#visuals)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development to local ABT Node](#development-to-local-abt-node)
    - [Deploy to local ABT Node](#deploy-to-local-abt-node)
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
