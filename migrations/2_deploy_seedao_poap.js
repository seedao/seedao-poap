const SeeDaoPoap = artifacts.require("SeeDaoPoap");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SeeDaoPoap, accounts[0], "https://seedao.github.io/seedao-poap-meta/meta/{id}.json");
};