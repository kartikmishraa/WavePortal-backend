const main = async () => {
  console.log("prints rightnow");
  setTimeout(() => {
    console.log("prints after a while");
  }, 3000);
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

// const main = async () => {
//   console.log("prints rn");
//   setTimeout(() => {
//     console.log("helo after a while");
//   }, 3000);
// };

// main();
