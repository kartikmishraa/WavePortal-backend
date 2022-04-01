const main = async () => {
  /*
   * Establish connection with the contract and
   * funding the contract with 0.1 ether
   */
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  // Logging out CONTRACT ADDRESS
  console.log("Contract address: ", waveContract.address);

  // Logging out CONTRACT BALANCE
  await getContractBalance(waveContract.address);

  /*
    Carrying out a WAVE TXN
  */
  let waveTxn = await waveContract.wave("Hiiii, its KM");
  await waveTxn.wait(); // wait for the transaction to be mined
};

const getContractBalance = async (contractAddress) => {
  const contractBalance = await hre.ethers.provider.getBalance(contractAddress);
  console.log(
    "Contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );
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
