/* TESTING Random reward and Cooldown functionalities */

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
    Carrying out 3 WAVE TXNs
  */
  const accounts = await hre.ethers.getSigners();

  let waveTxn = await waveContract.wave("Hiiii, its KM");
  await waveTxn.wait(); // wait for the transaction to be mined

  waveTxn = await waveContract.connect(accounts[1]).wave("hey its muskan");
  await waveTxn.wait();

  setTimeout(async () => {
    waveTxn = await waveContract.wave("KM Again");
    await waveTxn.wait();
  }, 12000);
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
    //process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
