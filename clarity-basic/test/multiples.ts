import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";

describe("multiples contract test suite", () => {
  let mathClient: Client;
  let provider: Provider;
  before(async () => {
    provider = await ProviderRegistry.createProvider();
    mathClient = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.multiples", "multiples", provider);
  });
  it("should have a valid syntax", async () => {
    await mathClient.checkContract();
  });
  describe("deploying an instance of the contract", () => {
    const getMultiply = async () => {
      const query = mathClient.createQuery({
        method: { name: "get-multiply", args: [] }
      });
      const receipt = await mathClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      return result
    }
    const execMethod = async (method: string) => {
      const tx = mathClient.createTransaction({
        method: {
          name: method,
          args: [],
        },
      });
      await tx.sign("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7");
      const receipt = await mathClient.submitTransaction(tx);
      return receipt;
    }
    before(async () => {
      await mathClient.deployContract();
    });
    it("all should start at one ", async () => {
      const multiply = await getMultiply();
      assert.equal(multiply, 1);
    })
    it("multiply variable should double everytime", async () => {
      await execMethod("multiply-number");
      assert.equal(await getMultiply(), 2);
      await execMethod("multiply-number");
      assert.equal(await getMultiply(), 4);
    })
  });
  after(async () => {
    await provider.close();
  });
});
