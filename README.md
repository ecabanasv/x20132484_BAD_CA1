# Ganache Diary (x20132484)

## Project dependencies

### Dependencies

```json
    "@truffle/contract": "^4.3.26",
    "bcrypt": "^5.0.1",
    "bootstrap": "^5.0.2",
    "dotenv": "^10.0.0",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.1",
    "mongoose": "^5.13.3",
    "serve-favicon": "^2.5.0",
    "web3": "^1.4.0"
```

### Development / Testing

```json
    "chai": "^4.3.4",
    "eth-gas-reporter": "^0.2.22",
    "ganache-cli": "^6.12.2",
    "mocha": "^8.1.2",
    "prettier-plugin-solidity": "^1.0.0-beta.17",
    "solidity-coverage": "^0.7.16",
    "truffle": "^5.4.0",
    "truffle-assertions": "^0.9.2"
```

## Installation

Install [Ganache](https://www.trufflesuite.com/ganache) and [Metamask](https://metamask.io/). Follow the [instructions](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask) (section "Setting up MetaMask") for link Ganache accounts to Metamask (port 7545). 

### Install dependencies
```bash
npm install
```

### Truffle commands: compile & migrate to dev network
```bash
npx truffle compile
npx truffle migrate --network development
```

### Test data commands

```bash
see testdata.txt (root)
```

### Testing commands

```bash
npm run slint
npm run test
npm run coverage
```

## How to run the project


### nodemon
```bash
npm run dev
```

### demon
```bash
npm start
```