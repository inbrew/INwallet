// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./ERC721/ERC721URIStorage.sol";

import "./utilContract/Ownable.sol";
import "./utilContract/ToString.sol";
import "./utilContract/Counters.sol";

contract InNFT is ERC721URIStorage, Ownable, ToString {
    address private proxyContract;

    Counters.Counter private tokenIds;

    string private prefixURI = "https://inwallet.ml/nft/metadata/";
    string private constant SUFIXURI = ".json";

    constructor() ERC721("INNFT", "INN") {}

    function mint(address _to) external returns (bool) {
        require(proxyContract != address(0), "proxyContract == address(0)");
        require(
            msg.sender == proxyContract,
            "msg.sender Error : Not HouseCore Address"
        );

        Counters.increment(tokenIds);

        uint256 currentTokenId = Counters.current(tokenIds);

        string memory uri = append(
            prefixURI,
            toString(currentTokenId),
            SUFIXURI
        );

        _mint(_to, currentTokenId);
        _setTokenURI(currentTokenId, uri);

        return true;
    }

    function burn(address _user, uint256 _tokenId) external {
        require(proxyContract != address(0), "proxyContract == address(0)");
        require(
            msg.sender == proxyContract,
            "msg.sender Error : Not MthzCore Address"
        );
        require(ownerOf(_tokenId) == _user, "ownerOf Error : Not Token Owner");

        _burn(_tokenId);
    }

    function totalSupply() external view returns (uint256) {
        return Counters.current(tokenIds);
    }

    function getProxyContract() external view returns (address) {
        return proxyContract;
    }

    // ***** onlyOwner *****

    function reSetPrefixURI(string calldata _prefixURI) external onlyOwner {
        prefixURI = _prefixURI;
    }

    function setAllTokenURI(string calldata _prefixURI) external onlyOwner {
        uint256 totalCount = Counters.current(tokenIds);

        for (uint256 i = 1; i <= totalCount; i++) {
            string memory uri = append(_prefixURI, toString(i), SUFIXURI);

            _setTokenURI(i, uri);
        }
    }

    function setContractAddress(address _proxyContract) external onlyOwner {
        require(_proxyContract != address(0), "proxyContract == address(0)");

        proxyContract = _proxyContract;
    }
}
