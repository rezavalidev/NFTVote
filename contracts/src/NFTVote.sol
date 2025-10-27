// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract NFTVote {

    // Option 0: "Yes"
    // Option 1: "No"
    // Option 2: "Abstain"
    uint256 public option0Votes;
    uint256 public option1Votes;
    uint256 public option2Votes;

    // A mapping to track which wallet has already voted
    // address => bool (voted or not)
    mapping(address => bool) public hasVoted;

    /**
     * @dev Casts a vote.
     * The `choiceId` must be 0, 1, or 2.
     */
    function castVote(uint8 choiceId) public {
        // 1. Check if the user has already voted
        require(hasVoted[msg.sender] == false, "Error: You have already voted.");
        
        // 2. Check for a valid choice
        require(choiceId <= 2, "Error: Invalid choice ID.");

        // 3. Record that the user has voted
        hasVoted[msg.sender] = true;

        // 4. Increment the vote count for the chosen option
        if (choiceId == 0) {
            option0Votes++;
        } else if (choiceId == 1) {
            option1Votes++;
        } else {
            option2Votes++;
        }
    }
}