// test/Box.test.js
// Load dependencies
const { expect } = require('chai');

// Load compiled artifacts
const POAPV1 = artifacts.require('SeeDaoPoap');

// Start test block
contract('POAP v1', function (accounts) {
    before(async function () {
        // Deploy a new Box contract for each test
        this.poap = await POAPV1.new();
        await this.poap.initialize();
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