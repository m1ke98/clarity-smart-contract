import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";

describe("fib contract test suite", () => {
  let basicClient: Client;
  let provider: Provider;
  before(async () => {
    provider = await ProviderRegistry.createProvider();
    basicClient = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.fib", "fib", provider);
  });
  it("should have a valid syntax", async () => {
    await basicClient.checkContract();
  });
  describe("deploying an instance of the contract", () => {
    const getFib = async () => {
      const query = basicClient.createQuery({
        method: { name: ''}
      })
    }
    const execMethod = async (method: string) => {
      const tx = basicClient.createTransaction({
        method: {
          name: method,
          args: [],
        },
      });
      await tx.sign("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7");
      const receipt = await basicClient.submitTransaction(tx);
      return receipt;
    }
    before(async () => {
      await basicClient.deployContract();
    });

    it("should return correct value", async () => {
      await execMethod("initialize-map")
      await execMethod("check-map")
      assert.equal(result, "hello world");
    });
    it("should echo number", async () => {
      const query = basicClient.createQuery({
        method: { name: "echo-number", args: ["123"] }
      });
      const receipt = await basicClient.submitQuery(query);
      const result = Result.unwrapInt(receipt)
      assert.equal(result, 123);
    });
  });
  after(async () => {
    await provider.close();
  });
});
