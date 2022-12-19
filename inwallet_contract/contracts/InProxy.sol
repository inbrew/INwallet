//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./utilContract/StorageSlot.sol";
import "./utilContract/Address.sol";

contract InProxy {
    bytes32 private constant slot = bytes32(uint256(keccak256("InWallet NFT")) -1);

    modifier isContract(address _implementation) {
        require(Address.isContract(_implementation), "_newImplementation is Not ContractAddress!");
        require(_implementation != address(0x0), "_newImplewmentation can't Be a Zero Address");
        _;
    }

    constructor(address _implementation, bytes memory _data) isContract(_implementation) {
        StorageSlot.setAddressAt(slot, _implementation);
        (bool success, ) = _implementation.delegatecall(_data);

        require(success, "deploy DelegateCall Fail.. check again");
    }

    function _delegate(address impl) internal {
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())

            let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)

            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }

    receive() external payable{}

    fallback() external payable {
        _delegate(StorageSlot.getAddressAt(slot));
    }
}