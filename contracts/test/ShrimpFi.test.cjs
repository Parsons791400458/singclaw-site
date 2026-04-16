const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ShrimpFi", function () {
  let shrimpfi, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const ShrimpFi = await ethers.getContractFactory("ShrimpFi");
    shrimpfi = await ShrimpFi.deploy();
    await shrimpfi.waitForDeployment();
  });

  describe("Hatching", function () {
    it("Should hatch a shrimp", async function () {
      await shrimpfi.connect(addr1).hatch("小虾米");
      expect(await shrimpfi.balanceOf(addr1.address)).to.equal(1);
      
      const info = await shrimpfi.getShrimpInfo(0);
      expect(info.name).to.equal("小虾米");
      expect(info.level).to.equal(1);
      expect(info.strategies).to.equal(0);
    });

    it("Should not exceed max shrimps per wallet", async function () {
      for (let i = 0; i < 5; i++) {
        await shrimpfi.connect(addr1).hatch(`虾${i}`);
      }
      await expect(
        shrimpfi.connect(addr1).hatch("多余虾")
      ).to.be.revertedWith("Max shrimps reached");
    });

    it("Should reject empty name", async function () {
      await expect(
        shrimpfi.connect(addr1).hatch("")
      ).to.be.revertedWith("Invalid name length");
    });
  });

  describe("Learning Strategies", function () {
    beforeEach(async function () {
      await shrimpfi.connect(addr1).hatch("学习虾");
    });

    it("Should learn strategy and gain exp", async function () {
      await shrimpfi.learnStrategy(0);
      const info = await shrimpfi.getShrimpInfo(0);
      expect(info.strategies).to.equal(1);
      expect(info.exp).to.equal(100);
    });

    it("Should level up after 6 strategies", async function () {
      for (let i = 0; i < 6; i++) {
        await shrimpfi.learnStrategy(0);
      }
      const info = await shrimpfi.getShrimpInfo(0);
      expect(info.level).to.equal(2);
      expect(info.strategies).to.equal(6);
    });

    it("Should only allow owner to call learnStrategy", async function () {
      await expect(
        shrimpfi.connect(addr1).learnStrategy(0)
      ).to.be.revertedWithCustomError(shrimpfi, "OwnableUnauthorizedAccount");
    });

    it("Should max at 36 strategies", async function () {
      for (let i = 0; i < 36; i++) {
        await shrimpfi.learnStrategy(0);
      }
      await expect(
        shrimpfi.learnStrategy(0)
      ).to.be.revertedWith("All strategies learned");
      
      const info = await shrimpfi.getShrimpInfo(0);
      expect(info.level).to.equal(7); // 36/6 + 1 = 7
      expect(info.strategies).to.equal(36);
    });
  });
});
