// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./IERC721Metadata.sol";

interface IERC721Full is IERC721Metadata {
    function totalSupply() external view returns (uint256);
    function burn(address user, uint256 _tokenId) external;
    function mint(address _to) external returns (bool);

}