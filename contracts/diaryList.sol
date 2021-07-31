// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract diaryList {
    // Counter for Diary entries
    uint256 private entryCounter = 0;

    // Struct for Diary
    struct diaryEntry {
        uint256 id;
        uint256 date;
        string title;
        string content;
        uint256 score;
        address user_address;
    }

    // Map of Diary entries
    mapping(uint256 => diaryEntry) public diaryEntries;

    // Event when Diary entry is created
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
    // it validates that score is between 1 to 5 (both included)
    modifier validScore(uint256 _score) {
        require(
            _score >= 0 && _score <= 5,
            "Not valid score. Only allow: 1-5."
        );
        _;
    }

    // newEntry: Functions that create new entry in Diary
    function newEntry(
        string memory _title,
        string memory _content,
        uint256 _score
    ) public validScore(_score) emptyString(_title, _content) {
        diaryEntries[entryCounter] = diaryEntry(
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

    // ShowListEntries: Functions that show all Diary entries
    function showListEntries() public view returns (diaryEntry[] memory) {
        diaryEntry[] memory _entries = new diaryEntry[](entryCounter);
        for (uint256 i = 0; i < entryCounter; i++) {
            _entries[i] = diaryEntries[i];
        }
        return _entries;
    }

    // UpdateEntry: Functions that updates specific Entries from Diary)
    function updateEntry(
        uint256 _id,
        string memory _title,
        string memory _content,
        uint256 _score
    ) public {
        diaryEntries[_id].title = _title;
        diaryEntries[_id].content = _content;
        diaryEntries[_id].score = _score;
        emit entryUpdated(_id, _title, _content, _score);
    }
}
