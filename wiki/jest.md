# Jest

## Install
```
npm install --save-dev jest ts-jest @types/jest
```

## Config
Put a `jest.config.js` file in the project root.
```
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```
Put a base `tsconfig.json` in the project root.
```
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "esModuleInterop": true,
    "lib": ["es2021"],
    "module": "es6",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "target": "es6"
  }
}
```
Put a build specific `tsconfig.json` in the `src` subfolder.
```
{
  "extends": "../tsconfig",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "../build"
  }
}
```
The test run will use the base tsconfig, the build run will use the build specific tsconfig.

## Run tests
Put a `test` script in `package.json`
```
  "scripts": {
    ...
    "test": "jest"
  },
```
Run tests on the command line
```
npm test
```
