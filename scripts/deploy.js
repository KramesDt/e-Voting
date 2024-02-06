const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.provider.getSigner();
  console.log("Deploying contracts with the account:", deployer.address);
  const accountBalance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const candidates = ["Bola Tinunbu", "Adeyeye Omokorede", "Dare Samuel", "Osolale Festus", "Prof Obe"];
  const party = ["PDP", "SDP", "APC", "LP", "FUTA"];
  const votingDurationInMinutes = 90000;

  const Voting = await ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(
    candidates,
    party,
    votingDurationInMinutes
  );

  await Voting_.waitForDeployment();
  console.log("Successsfully deployed at: ", Voting_.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
