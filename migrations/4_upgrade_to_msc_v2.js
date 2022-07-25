const SeeDaoPoap = artifacts.require("SeeDaoPoap");
const MSCV2 = artifacts.require("MSCV2");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
    // Mumbai 
    // const upgraded = await upgradeProxy(instance.address, BoxV2, { deployer });
};