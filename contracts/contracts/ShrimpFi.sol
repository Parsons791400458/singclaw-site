// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ShrimpFi - 养虾养成游戏 NFT 合约
 * @dev 每只虾是一个 ERC721 NFT，包含等级、经验、策略掌握度等属性
 * @notice Base Sepolia 测试网部署版本 v0.1.0
 */
contract ShrimpFi is ERC721Enumerable, Ownable {
    
    uint256 private _nextTokenId;

    struct Shrimp {
        string name;        // 虾的名字
        uint8 level;        // 等级 1-36（对应36计）
        uint256 exp;        // 经验值
        uint256 bornAt;     // 孵化时间戳
        uint8 strategies;   // 已掌握策略数（0-36）
    }

    mapping(uint256 => Shrimp) public shrimps;

    // 每个地址最多持有的虾数量
    uint256 public constant MAX_SHRIMPS_PER_WALLET = 5;
    // 免费孵化
    uint256 public constant HATCH_PRICE = 0;

    event ShrimpHatched(address indexed owner, uint256 indexed tokenId, string name);
    event ShrimpLevelUp(uint256 indexed tokenId, uint8 newLevel);
    event StrategyLearned(uint256 indexed tokenId, uint8 totalStrategies);

    constructor() ERC721("ShrimpFi", "SHRIMP") Ownable(msg.sender) {}

    /**
     * @dev 孵化一只新虾苗（免费）
     * @param _name 虾的名字
     */
    function hatch(string calldata _name) external {
        require(balanceOf(msg.sender) < MAX_SHRIMPS_PER_WALLET, "Max shrimps reached");
        require(bytes(_name).length > 0 && bytes(_name).length <= 32, "Invalid name length");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        shrimps[tokenId] = Shrimp({
            name: _name,
            level: 1,
            exp: 0,
            bornAt: block.timestamp,
            strategies: 0
        });

        emit ShrimpHatched(msg.sender, tokenId, _name);
    }

    /**
     * @dev 学习一个策略（由合约 owner 调用，模拟链下游戏验证）
     * @param tokenId 虾的 token ID
     */
    function learnStrategy(uint256 tokenId) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Shrimp does not exist");
        Shrimp storage s = shrimps[tokenId];
        require(s.strategies < 36, "All strategies learned");

        s.strategies++;
        s.exp += 100;

        // 每学 6 个策略升一级
        uint8 newLevel = uint8(s.strategies / 6) + 1;
        if (newLevel > s.level) {
            s.level = newLevel;
            emit ShrimpLevelUp(tokenId, newLevel);
        }

        emit StrategyLearned(tokenId, s.strategies);
    }

    /**
     * @dev 查询虾的完整信息
     */
    function getShrimpInfo(uint256 tokenId) external view returns (
        string memory name,
        uint8 level,
        uint256 exp,
        uint256 bornAt,
        uint8 strategies,
        address owner
    ) {
        require(ownerOf(tokenId) != address(0), "Shrimp does not exist");
        Shrimp memory s = shrimps[tokenId];
        return (s.name, s.level, s.exp, s.bornAt, s.strategies, ownerOf(tokenId));
    }
}
