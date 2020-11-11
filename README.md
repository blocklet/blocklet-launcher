# Install On ABT Node

[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A simple blocklet that helps you to install blocket on ABT Node

[![docs](https://img.shields.io/badge/-run%20online-blue.svg)](https://install.arcblock.io/)

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Visuals](#Visuals)
- [Installation](#Introduction)
- [Usage](#Usage)
- [License](#License)

## Visuals

![empty page](/screenshots/empty.jpg)
![index page](/screenshots/index.jpg)

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
