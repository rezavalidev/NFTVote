// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Import Foundry's testing utilities and your contract
import {Test, console} from "forge-std/Test.sol";
import {NFTVote} from "../src/NFTVote.sol"; 

contract NFTVoteTest is Test {

    NFTVote public nftVote; // Declare instance of contract to test

    // This function runs before each test case
    function setUp() public {
        // Deploy a fresh instance of NFTVote for each test
        nftVote = new NFTVote(); 
    }

    // Test if a user can successfully cast a vote (e.g., option 0)
    function testCastVoteSuccess() public {
        // Arrange: Define the voter and their choice
        address voter = address(0x1); // Use a standard test address
        uint8 choiceId = 0; // Vote for option 0 ("Yes")
    
        // Act: Make the voter cast the vote
        vm.prank(voter); // Make the *next* call come from 'voter'
        nftVote.castVote(choiceId);
    
        // Assert: Check if the state updated correctly
        assertEq(nftVote.option0Votes(), 1, "Vote count for option 0 should be 1");
        assertTrue(nftVote.hasVoted(voter), "Voter should be marked as having voted");
        assertEq(nftVote.option1Votes(), 0, "Vote count for option 1 should be 0");
        assertEq(nftVote.option2Votes(), 0, "Vote count for option 2 should be 0");
    }

    // Test if a user is prevented from voting twice
    function test_RevertIf_HasAlreadyVoted() public {
        // Arrange: Define the voter and cast their first vote
        address voter = address(0x1);
        uint8 firstChoice = 0;
        
        vm.prank(voter);
        nftVote.castVote(firstChoice);
        
        // Assert Pre-condition: Check they are marked as voted
        assertTrue(nftVote.hasVoted(voter), "Voter should be marked voted after first vote");
        assertEq(nftVote.option0Votes(), 1, "Vote count should be 1 after first vote");

        // Act & Assert: Attempt a second vote and expect a revert
        uint8 secondChoice = 1;

        // Expect the *next* call to revert with a specific error message
        vm.expectRevert(bytes("Error: You have already voted.")); 
        
        vm.prank(voter); // Need to prank again for the second call
        nftVote.castVote(secondChoice);

        // Assert Post-condition: Ensure state didn't change after revert
        assertEq(nftVote.option0Votes(), 1, "Option 0 count shouldn't change on revert");
        assertEq(nftVote.option1Votes(), 0, "Option 1 count shouldn't change on revert");
    }

    // Test if casting a vote with an invalid choiceId reverts
    function test_RevertIf_InvalidChoice() public {
        // Arrange: Define the voter and an invalid choice
        address voter = address(0x2); // Use a different test address
        uint8 invalidChoiceId = 3; // Invalid choice (should be 0, 1, or 2)

        // Act & Assert: Expect the call to revert with the correct message
        vm.expectRevert(bytes("Error: Invalid choice ID.")); 
        
        vm.prank(voter);
        nftVote.castVote(invalidChoiceId);

        // Assert Post-condition: Ensure vote counts did not change
        assertEq(nftVote.option0Votes(), 0, "Option 0 count shouldn't change");
        assertEq(nftVote.option1Votes(), 0, "Option 1 count shouldn't change");
        assertEq(nftVote.option2Votes(), 0, "Option 2 count shouldn't change");
        assertFalse(nftVote.hasVoted(voter), "Voter should not be marked as voted");
    }

}