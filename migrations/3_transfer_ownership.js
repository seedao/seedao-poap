const SeeDaoPoap = artifacts.require("SeeDaoPoap");
const MSCV2 = artifacts.require("MSCV2");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer, network, accounts) {
    const msc = await SeeDaoPoap.deployed();
    console.log("msc v1 address: %s", msc.address);
    // transfer to new owner
    // seedao 2
    await msc.transferOwnership('0xFfBca7D45a99070b4E676839794035AB989CE3D0');
    // seedao 3
    // await msc.transferOwnership('0x095E8a343ec8Cb2f8b3568aeAF7b31342550Ad20');
};