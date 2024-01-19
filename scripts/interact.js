const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const SEPOLIA_URL = process.env.SEPOLIA_URL;

const contractAbi = require("../artifacts/contracts/Voting.sol/Voting.json");
const provider = new ethers.AlchemyProvider((network = "sepolia"), API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function fetchAllCandidates() {
  try {
    const allCandidates = await contract.getAllVotesOfCandiates();
    console.log("All Candidates:", allCandidates);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function checkVotingStatus() {
  try {
    const votingStatus = await contract.getVotingStatus();
    console.log("Is Voting Active?", votingStatus);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function checkRemainingTime() {
  try {
    const remainingTime = await contract.getRemainingTime();
    console.log("Remaining Time:", remainingTime, "seconds");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function vote(candidateIndex) {
  try {
    //  const candidateIndex = 0; // Replace with the desired candidate index
    await contract.vote(candidateIndex);
    console.log("Vote Successful!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}


// fetchAllCandidates();
// vote(1)
// fetchAllCandidates();
checkVotingStatus();
checkRemainingTime();