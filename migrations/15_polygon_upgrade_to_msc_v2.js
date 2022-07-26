const SeeDaoPoap = artifacts.require("SeeDaoPoap");
const MSCV2 = artifacts.require("MSCV2");
const { forceImport, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
    const upgraded = await upgradeProxy('0x2C436d61C5Af62bcbfeE40B1f0BE5B483DfA0E11', MSCV2, { deployer });
};
