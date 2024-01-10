const ZombieFactory = artifacts.require("zombieFactory");

contract("ZombieFactory", (accounts) => {
  it("should create a random zombie with a given name", async () => {
    const instance = await ZombieFactory.deployed();
    console.log("Contract instance address:", instance.address);

    const result = await instance.createRandZombie("TestZombie", { from: accounts[0] });
    console.log("Transaction result:", result);

    // Add assertions below this line

    assert.equal(result.logs.length, 1, "NewZombie event should be emitted");
    assert.equal(result.logs[0].event, "NewZombie", "Event name should be NewZombie");
    assert.equal(result.logs[0].args.name, "TestZombie", "Name should match");
  });
});
