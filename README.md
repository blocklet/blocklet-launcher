# Install On ABT Node

[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A simple blocklet that helps you to install blocket on ABT Node

[![docs](https://img.shields.io/badge/-run%20online-blue.svg)](https://install.arcblock.io/)

## Install on my ABT Node

[![Install on my ABT Node](https://raw.githubusercontent.com/blocklet/development-guide/main/assets/install_on_abtnode.svg)](https://install.arcblock.io/?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fblocklet%2Finstall-on-abtnode%2Freleases%2Fdownload%2F1.1.5%2Fblocklet.json)

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Visuals](#Visuals)
- [Installation](#Introduction)
- [Usage](#Usage)
- [License](#License)

## Visuals

![empty page](/screenshots/empty.png)
![index page](/screenshots/index.png)

## Installation

- Download the repo

```
git clone git@github.com:blocklet/install-on-abtnode.git
yarn install
```

## Usage

### Development to local ABT Node

```
yarn start:client

or

abtnode init
abtnode start
abtnode dev .
```

### Deploy to local ABT Node

```
abtnode init
abtnode start
abtnode deploy .
```

## License

[MIT](LICENSE)
