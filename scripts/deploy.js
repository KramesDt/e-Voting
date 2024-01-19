const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.provider.getSigner();
  console.log("Deploying contracts with the account:", deployer.address);
  const accountBalance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const Voting = await ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(
    ["Mark", "Mike", "Henry", "Rock"],
    ["PDP", "SDP", "APC", "LP"],
    90
  );

  await Voting_.waitForDeployment();
  console.log("Successsfully deployed at: ", Voting_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
