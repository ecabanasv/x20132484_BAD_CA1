// migrations/2_deploy.js
const Journal = artifacts.require('journalList');

module.exports = async function (deployer) {
  await deployer.deploy(Journal);
};