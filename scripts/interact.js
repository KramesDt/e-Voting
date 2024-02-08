const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contractAbi = require("../artifacts/contracts/Voting.sol/Voting.json");
const provider = new ethers.AlchemyProvider((network = "sepolia"), API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function fetchAllCandidates() {
  try {
    let allCandidates = await contract.getAllVotesOfCandiates();

    const customJson = JSON.stringify(allCandidates, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });

    const outputObject = JSON.parse(customJson);

    // console.log("All Candidates:", customJson);
    console.log("All Candidates:", outputObject);
    // console.log("All Candidates:", allCandidates);


    return outputObject;
  } catch (error) {
    throw error;
  }
}

async function checkVotingStatus() {
  try {
    let votingStatus = await contract.getVotingStatus();
    // console.log("Is Voting Active?", votingStatus);
    return votingStatus;
  } catch (error) {
    throw error;
  }
}

async function checkRemainingTime() {
  try {
    const remainingTime = await contract.getRemainingTime();
    // console.log("Remaining Time:", remainingTime, "seconds");
    return remainingTime.toString();
  } catch (error) {
    throw error;
  }
}

async function vote(candidateIndex) {
  try {
    //  const candidateIndex = 0; // Replace with the desired candidate index
    await contract.vote(candidateIndex);
    console.log("Vote Successful!");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkRemainingTime,
  checkVotingStatus,
  fetchAllCandidates,
  vote,
  contract,
};

// fetchAllCandidates();
// vote(1)
// fetchAllCandidates();
// checkVotingStatus();
// checkRemainingTime();
