// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {NFTVote} from "../src/NFTVote.sol"; // Import your contract

contract DeployNFTVote is Script {

    function run() external returns (NFTVote) {
        // Start broadcasting transactions using the deployer's key
        vm.startBroadcast();

        // Deploy the NFTVote contract (no constructor args)
        NFTVote nftVote = new NFTVote();

        // Stop broadcasting
        vm.stopBroadcast();

        // Log the deployed address
        console.log("NFTVote contract deployed to:", address(nftVote));

        return nftVote;
    }
}