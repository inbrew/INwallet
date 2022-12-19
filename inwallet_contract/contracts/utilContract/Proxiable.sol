// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./Address.sol";
import "./StorageSlot.sol";

contract Proxiable {
    modifier isContract(address _implementation) {
        require(
            Address.isContract(_implementation),
            "_newImplementation is Not ContractAddress!"
        );
        require(
            _implementation != address(0x0),
            "_newImplementation can't Be a Zero Address"
        );
        _;
    }

    function _upgradeContractAddress(address newAddress) internal isContract(newAddress) {
        // 여기에 무엇인가 넣어야 함.
        require(bytes32(
            "업그레이드할 컨트랙트의 무엇인가") == inUUID(),
            "Not compatible"
        )

        StorageSlot.setAddressAt(
            "업그레이드할 컨트랙트의 무엇인가",
            newAddress
        )
    }

    function inUUID() public pure returns (bytes32) {
        return "업그레이드할 컨트랙트의 무엇인가";
    }
}
