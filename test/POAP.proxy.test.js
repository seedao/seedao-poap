// test/Box.proxy.test.js
// Load dependencies
const { expect } = require('chai');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

// Load compiled artifacts
const POAPV1 = artifacts.require('SeeDaoPoap');

// Start test block
contract('POAP v1 (proxy)', function (accounts) {
    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.poap = await deployProxy(POAPV1);
    });

    it('initialize correctly', async function () {
        let balance = await this.poap.balanceOf(accounts[0], 0);

        expect(balance.toString()).to.equal('0');
    });

    it('mint by admin', async function () {
        await this.poap.mintTo([accounts[0]], [0], [1], { from: accounts[0] });

        let balance = await this.poap.balanceOf(accounts[0], 0);
        expect(balance.toString()).to.equal('1');
    });
});