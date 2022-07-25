const SeeDaoPoap = artifacts.require("SeeDaoPoap");
// const MSCV2 = artifacts.require("MSCV2");
const { forceImport, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
    const instance = await forceImport('0x14b0e20296BDDC9C0b3493302EBc45d8139a6c58', SeeDaoPoap, { deployer });
    // const upgraded = await upgradeProxy(instance.address, MSCV2, { deployer });
};