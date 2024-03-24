# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop (for Mac or Windows) or Docker Engine (for Linux).

## Downloading

```
git clone {repository URL}
```

Go to nodejs2024Q1-service folder

## Installing NPM modules

```
git checkout containers-orm
```
```
npm install
```

## Running application
1. Based on `.env.examle`, create `.env`. Change settings if desired

**Important!** When you restart the application with new settings, you must first delete containers and volumes.

2. Run command `docker compose up`.
You can use the key `-d`, but it will be difficult to understand when the application has fully loaded.

**Important!** When you first launch an application, the application image is downloaded from Docker Hub. It can take some time.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
To run a vulnerability test
```
npm run test:vul
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
