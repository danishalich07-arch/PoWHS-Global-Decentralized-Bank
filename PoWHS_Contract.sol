// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PoWHSProtocol {
    string public name = "PoWHS$ Global Token";
    string public symbol = "PoWHS$";
    uint8 public decimals = 18;
    uint256 public totalSupply = 42000000 * 10**18;
    
    address public founder;
    address public protectionVault;
    uint256 public rewardAmount = 10 * 10**18;
    uint256 public rewardCount = 0;

    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public hasClaimed;

    constructor(address _protectionVault) {
        founder = msg.sender; // Aapka wallet address
        protectionVault = _protectionVault;
        
        // Genesis: 3M tokens to Founder
        balanceOf[founder] = 3000000 * 10**18;
    }

    // I2I Verified Reward Transfer
    function claimSignupReward(address _user) public {
        require(!hasClaimed[_user], "Already Claimed");
        require(rewardCount < 3900000, "Reward Pool Empty");

        balanceOf[_user] += rewardAmount;
        rewardCount++;
        hasClaimed[_user] = true;
    }

    // 0.1% Fee Split Logic (70/20/10)
    function transferWithFee(address _to, uint256 _amount) public {
        uint256 fee = (_amount * 1) / 1000; // 0.1%
        uint256 netAmount = _amount - fee;

        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += netAmount;

        // Split Fee
        balanceOf[founder] += (fee * 20) / 100;      // 20% Founder
        balanceOf[protectionVault] += (fee * 10) / 100; // 10% System
        // 70% Community (Logic for staking/rewards)
    }
}
