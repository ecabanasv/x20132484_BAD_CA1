const diaryList = artifacts.require("diaryList");
const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("diaryList", function (accounts) {
  describe("@ Diary entry functions", () => {
    it("newEntry: User should add new entry", async () => {
      const title = "Hello World!";
      const content =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      const score = 5;
      const instance = await diaryList.deployed();
      const entry = await instance.newEntry(title, content, score, {
        from: accounts[0],
      });
      // test BikeCreated event
      truffleAssert.eventEmitted(entry, "entryCreated", (ev) => {
        return ev.title == title && ev.content == content && ev.score == score;
      });
    });
    it("showListEntries: should list all the entries", async () => {
      const instance = await diaryList.deployed();
      const entry1 = await instance.newEntry("Hello World1", "1", 1, {
        from: accounts[0],
      });
      const entry2 = await instance.newEntry("Hello World2", "2", 2, {
        from: accounts[0],
      });
      const entry3 = await instance.newEntry("Hello World3", "3", 3, {
        from: accounts[0],
      });
      const entryList = await instance.showListEntries();
      //Entry 1
      assert.equal(entryList[1][2], "Hello World1");
      //Entry 2
      assert.equal(entryList[2][3], "2");
      //Entry 3
      assert.equal(entryList[3][4], 3);
    });
    it("updateEntry: User should update an entry", async () => {
      const title = "Hello New World";
      const content = "This is the new content";
      const score = 5;
      const instance = await diaryList.deployed();
      const result = await instance.updateEntry(0, title, content, score, {
        from: accounts[0],
      });
      //Test entryUpdated event
      truffleAssert.eventEmitted(result, "entryUpdated", (ev) => {
        return (
          ev.id == 0 &&
          ev.title == title &&
          ev.content == content &&
          ev.score == score
        );
      });
    });
  });
});
