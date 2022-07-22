// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract MSCV2 is ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable {
    address private _signer;
    mapping(bytes32 => bool) public claimed;

    constructor() {}

    function initialize() public initializer {
        __ERC1155_init(
            "https://k51qzi5uqu5dhrzcxk68q1k8ba9rwu3lsw34qvph2hl36hax0fyem7mu5miafc.ipns.dweb.link/{id}.json"
        );
        __Ownable_init();
        __Pausable_init();
        _signer = 0x0F34EC76daCa79425Feec7106BADe663DEfC00fa;
    }

    function claim(
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes32 ticket,
        uint256 timestamp,
        bytes memory signature
    ) public whenNotPaused {
        require(
            block.timestamp + 1 days >= timestamp &&
                block.timestamp - 1 days <= timestamp,
            "MSC: Bad timestamp"
        );
        require(
            verify(msg.sender, ids, amounts, ticket, timestamp, signature),
            "MSC: Illegal signature"
        );
        require(!claimed[ticket], "Claimed");
        claimed[ticket] = true;
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function safeTransferFrom(
        address, /* from */
        address, /* to */
        uint256, /* id */
        uint256, /* amount */
        bytes memory /* data */
    ) public virtual override {
        require(false, "MSC: can't transfer");
    }

    function safeBatchTransferFrom(
        address, /* from */
        address, /* to */
        uint256[] memory, /* ids */
        uint256[] memory, /* amounts */
        bytes memory /* data */
    ) public virtual override {
        require(false, "MSC: can't transfer");
    }

    function verify(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes32 ticket,
        uint256 timestamp,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(to, ids, amounts, ticket, timestamp))
        );
        return recoverSigner(message, signature) == _signer;
    }

    function mintTo(
        address[] memory owners,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        require(
            owners.length == ids.length && ids.length == amounts.length,
            "MSC: Parameters must have the same length"
        );
        for (uint256 i = 0; i < ids.length; i++) {
            _mint(owners[i], ids[i], amounts[i], "");
        }
    }

    function setSigner(address newSigner) public onlyOwner {
        _signer = newSigner;
    }

    function setUri(string memory newUri) public onlyOwner {
        _setURI(newUri);
    }

    /// signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            uint8 v,
            bytes32 r,
            bytes32 s
        )
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }
}
