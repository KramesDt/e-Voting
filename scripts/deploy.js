async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(["Mark", "Mike", "Henry", "Rock"], ["PDP", "SDP", "APC", "LP"], 90);
  // console.log("Contract address:", Voting_.address);
  console.log("Successsfully deployed at: ", Voting_.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
