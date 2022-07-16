require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  networks: {
    mumbai: {
      url: process.env.WEB3_PROJECT_ID,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
