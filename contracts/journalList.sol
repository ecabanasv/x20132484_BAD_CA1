// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract journalList {
    uint256 private entryCounter = 0;

    struct journalEntry {
        uint256 id;
        uint256 date;
        string title;
        string content;
        uint256 score;
        address user_address;
    }

    mapping(uint256 => journalEntry) public journalEntries;

    event entryCreated(
        uint256 id,
        uint256 date,
        string title,
        string content,
        uint256 score
    );

    event entryUpdated(uint256 id, string title, string content, uint256 score);

    // modifier functions that is executed before rest of code
    // it validates that fields (title & content) are not empty
    modifier emptyString(string memory _title, string memory _content) {
        require(bytes(_title).length > 0, "Not valid title. Must contain one.");
        require(
            bytes(_content).length > 0,
            "Not valid content. Must contain one."
        );
        _;
    }

    // modifier functions that is executed before rest of code
    // it validates that score is between 1 to 10 (both included)
    modifier validScore(uint256 _score) {
        require(
            _score >= 0 && _score <= 10,
            "Not valid score. Only allow: 1-10."
        );
        _;
    }

    function newEntry(
        string memory _title,
        string memory _content,
        uint256 _score
    ) public validScore(_score) emptyString(_title, _content) {
        journalEntries[entryCounter] = journalEntry(
            entryCounter,
            block.timestamp,
            _title,
            _content,
            _score,
            msg.sender
        );
        entryCounter++;
        emit entryCreated(
            entryCounter,
            block.timestamp,
            _title,
            _content,
            _score
        );
    }

    function showListEntries() public view returns (journalEntry[] memory) {
        journalEntry[] memory _entries = new journalEntry[](entryCounter);
        for (uint256 i = 0; i < entryCounter; i++) {
            _entries[i] = journalEntries[i];
        }
        return _entries;
    }

    function updateEntry(
        uint256 _id,
        string memory _title,
        string memory _content,
        uint256 _score
    ) public {
        journalEntries[_id].title = _title;
        journalEntries[_id].content = _content;
        journalEntries[_id].score = _score;
        emit entryUpdated(_id, _title, _content, _score);
    }
}
