# Politeia-API

From Ancient Greek πολιτεία (politeía, “city, state, system of government”).

Administrative tools for [Polis](https://compdemocracy.org/Polis/).

This is a node server API written with TypeScript, TypeORM, and Fastify.

The web client can be found in the **politeia-client** repository.

## Pre-Requisites

1. recent version of node and npm
2. access to a running instance of polis
3. polis database credentials
4. Google OAuth 2.0 Client ID

## Installation and set up

1. [Run Polis](https://github.com/compdemocracy/polis?tab=readme-ov-file#-running-polis), or be prepared to connect to a hosted instance of polis
2. clone this repository
3. run `npm install`

## Environment Values

Available variables are listed in `.env.schema`.

Default values are set in `.env.defaults`.

Add any custom values you need to `.env`.

_See <https://github.com/keithmorris/node-dotenv-extended> for more information_

## Up and Running

Some of the availabe npm scripts:

```sh
npm run build
```

> _compiles typescript to javascript, into the build/ folder`_

```sh
npm run dev
```

> _runs the application in development mode with automatic restarts_

```sh
npm run lint
```

> _runs eslint (with prettier) on .ts files_

```sh
npm run lint:fix
```

> _attempt to fix eslint issues where possible_

```sh
npm start
```

> _runs compiled javascript with node, mainly for production_
