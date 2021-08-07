# Ganache Diary (x20132484)
Web application that allow user to record and retrieve from local Ethereum blockchain (Ganache). The user needs to register in order to access the main app functions (add new entry & diary list).

### Restrictions: 
User cannot register same username & Metamask account.

If user change Metamask account or network during use it will be disconnected and redirected to homepage.

Entries: Title (10-20 char), Content (30-140 char) & Rate (1-5).

All form fields are validated through browser and they cannot be empty.


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
Install & run [Ganache](https://www.trufflesuite.com/ganache) and [Metamask](https://metamask.io/). Follow the [instructions](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask) (section "Setting up MetaMask") for link Ganache accounts to Metamask (port 7545)

Unzip file x20132484-BAD-CA. Go into the folder unzipped and open a new terminal. Then, run commands below:

### 1) Install dependencies
```bash
npm install
```

### 2) Truffle commands: compile & migrate to dev network
```bash
npx truffle compile
npx truffle migrate --network development
```

### 3) Test data commands (optional)
```bash
see testdata.txt (root)
```

### 4) Testing commands (optional)
```bash
npm run slint
npm run test
npm run coverage
```

## How to run the project
Follow steps 1 & 2 before run through one of the two commands below. Make sure you're running the Ganache client & you linked the account(s) to Metamask (see installation notes).

### nodemon
```bash
npm run dev
```

### node
```bash
npm start
```