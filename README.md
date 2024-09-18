# SignalIntegrity.js

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
