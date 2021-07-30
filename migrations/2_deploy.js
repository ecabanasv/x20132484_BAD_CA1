// migrations/2_deploy.js
const Diary = artifacts.require('diaryList');

module.exports = async function (deployer) {
  await deployer.deploy(Diary);
};