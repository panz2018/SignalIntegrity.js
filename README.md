# SignalIntegrity.js

## Node.js version manager for Windows
The ability to switch between different versions of Node.js can be very useful in certain situations. For example, if you want to test a module you're developing with the latest bleeding-edge version without uninstalling the stable version of Node, this utility can help.

### Installation

#### Download
Download and install [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)

#### Display the currently running version of NVM for Windows
```sh
nvm version
```

#### Install the latest version of Node.js
```sh
nvm install latest
```

#### Install the latest stable version
```sh
nvm install lts
```

#### Enable node.js version management
```sh
nvm on
```

#### Disable node.js version management
This does not uninstall anything
```sh
nvm off
```

### Switch Node.js version

#### List the installed Node.js versions
```sh
nvm list
```

#### Use the newest version of Node.js
```sh
nvm use newest
```

#### Use the latest stable version of Node.js
```sh
nvm use lts
```

#### Check the current version of Node.js
```sh
node -v
```

## Project setup

### Install yarn

```sh
npm install --global yarn
```

### Install packages

```sh
yarn install
```

### Check for outdated packages

```sh
yarn outdated
```

### Upgrades packages

```
yarn upgrade --latest
```

## Development

### Compile and hot-reload for Development

```sh
yarn run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
yarn run format
```

### Unit test with [Vitest](https://vitest.dev/)

#### Interactive development

```sh
yarn vitest
```

#### Command line

```sh
yarn run test:unit
```

### Component test with [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

#### Interactive development

```sh
npx cypress open
```

#### Command line

```sh
yarn run test:component
```

### Lint, format, type-check, unit-test, and component test

```sh
yarn run test
```

## Compile, build and minify for production

```sh
yarn run build
```

## Preview the built static website for production

```sh
yarn run preview
```
