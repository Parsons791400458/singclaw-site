const hre = require("hardhat");

async function main() {
  console.log("🦐 Deploying ShrimpFi to", hre.network.name, "...");
  
  const ShrimpFi = await hre.ethers.getContractFactory("ShrimpFi");
  const shrimpfi = await ShrimpFi.deploy();
  await shrimpfi.waitForDeployment();
  
  const address = await shrimpfi.getAddress();
  console.log("✅ ShrimpFi deployed to:", address);
  console.log("🔗 Explorer:", `https://sepolia.basescan.org/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
