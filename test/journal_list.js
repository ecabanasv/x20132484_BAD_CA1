const journalList = artifacts.require("journalList");
const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("journalList", function (/* accounts */) {
  describe("@ Journal entry functions", () => {
    it("newEntry: User can add new entry", async () => {});
    it("showListEntries: Function can list all the entries", async () => {});
    it("updateEntry: User can update an specific entry", async () => {});
  });
});