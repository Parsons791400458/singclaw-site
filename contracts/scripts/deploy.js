const hre = require("hardhat");

async function main() {
  console.log("🦐 Deploying ShrimpFi to Base Sepolia...\n");

  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance:  ${hre.ethers.formatEther(balance)} ETH\n`);

  if (balance === 0n) {
    console.error("❌ No ETH balance! Get test ETH from https://www.alchemy.com/faucets/base-sepolia");
    process.exit(1);
  }

  const ShrimpFi = await hre.ethers.getContractFactory("ShrimpFi");
  const shrimpfi = await ShrimpFi.deploy();
  await shrimpfi.waitForDeployment();

  const address = await shrimpfi.getAddress();
  console.log(`✅ ShrimpFi deployed to: ${address}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Verify: npx hardhat verify --network baseSepolia ${address}`);
  console.log(`   2. Update game/index.html with contract address`);
  console.log(`   3. Test hatch() function on BaseScan`);

  // Save deployment info
  const fs = require("fs");
  const deployInfo = {
    network: "base-sepolia",
    chainId: 84532,
    contract: "ShrimpFi",
    address: address,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    txHash: shrimpfi.deploymentTransaction()?.hash
  };
  fs.writeFileSync("deployments.json", JSON.stringify(deployInfo, null, 2));
  console.log(`\n💾 Deployment info saved to deployments.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
