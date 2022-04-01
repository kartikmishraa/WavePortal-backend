// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    
    uint256 totalWaves; // state variable to store no. of waves
    uint256 private seed; // seed to generate randomm number
    uint256 prizeAmount = 0.0001 ether; // reward amount

    constructor() payable {
        console.log("New Smart Contract created...");

        seed = (block.timestamp + block.difficulty) % 100;  // Seed initialized @ contract deployment 
    }


    // Event to flag wave creation
    event NewWave(address indexed from, uint256 timestamp, string message);

    // Wave struct to store wave details
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;   // array of wave structs

    /*
    * Function to wave. Stores the waver, the message and the timestamp
    */
    function wave(string memory _message) public {
        /*
            Adding the wave details on the chain
        */
        totalWaves += 1;
        console.log("%s has waved w/ message: %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);


        // Generating random seed
        seed = (seed + block.timestamp + block.difficulty) % 100;
        console.log("Random no: ", seed);

        if (seed < 25) {    
            // Should create an event here later
            console.log("%s WILL BE rewarded", msg.sender);
            
            /*
                Sending the reward money to wavers
            */
            require(
                prizeAmount <= address(this).balance,
                "Funds insufficient to carry out the transaction."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from the contract.");

        } else {
            // Should create an event here later
            console.log("%s WILL NOT be rewarded", msg.sender);
        }
    }

    /*
    * Function to retrieve all waves (along with their details)
    */
    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    /*
    * Function to retrieve number of total waves
    */
    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}