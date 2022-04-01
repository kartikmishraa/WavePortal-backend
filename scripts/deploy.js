/* Script to DEPLOY contract using HARDHAT */

const main = async () => {
  // Connecting to contract and deploying
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const contractBalance = 0.01;
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther(contractBalance.toString()),
  });
  await waveContract.deployed(); // await deployment

  const [deployer] = await hre.ethers.getSigners(); // contract owner
  const accountBalance = await deployer.getBalance(); // owner balance

  console.log("Deploying Contract with account: ", deployer.address); // owner address
  console.log("Account Balance: ", accountBalance.toString()); // owner balance

  console.log("Contract Address: ", waveContract.address); // contract address generated
  console.log("Contract Balance: ", contractBalance, "Ether"); // contract balance
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
