// test/Box.proxy.test.js
// Load dependencies
const { expect } = require('chai');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const truffleAssert = require('truffle-assertions');

// Load compiled artifacts
const MSCV2 = artifacts.require('MSCV2');

// Start test block
contract('POAP v1 (proxy)', function (accounts) {
    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.poap = await deployProxy(MSCV2);
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

    it('transfer should fail', async function () {
        await this.poap.mintTo([accounts[0]], [0], [1], { from: accounts[0] });
        let balance0 = await this.poap.balanceOf(accounts[0], 0);
        expect(balance0.toString()).to.equal('1');
        let balance1 = await this.poap.balanceOf(accounts[1], 0);
        expect(balance1.toString()).to.equal('0');

        await truffleAssert.reverts(
            this.poap.safeTransferFrom(accounts[0], accounts[1], 0, 1, '0x', { from: accounts[0] }),
            "MSC: can't transfer"
        );

        await truffleAssert.reverts(
            this.poap.safeBatchTransferFrom(accounts[0], accounts[1], [0], [1], '0x', { from: accounts[0] }),
            "MSC: can't transfer"
        );
    });
    // it('claim by users', async function () {
    //     await this.poap.mintTo([accounts[0]], [0], [1], { from: accounts[0] });

    //     let balance = await this.poap.balanceOf(accounts[0], 0);
    //     expect(balance.toString()).to.equal('1');
    // });
});