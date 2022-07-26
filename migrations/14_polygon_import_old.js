const SeeDaoPoap = artifacts.require("SeeDaoPoap");
// const MSCV2 = artifacts.require("MSCV2");
const { forceImport, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
    const instance = await forceImport('0x2C436d61C5Af62bcbfeE40B1f0BE5B483DfA0E11', SeeDaoPoap, { deployer });
};
