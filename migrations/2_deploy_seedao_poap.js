const SeeDaoPoap = artifacts.require("SeeDaoPoap");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
  await deployProxy(SeeDaoPoap, [], { deployer });
};