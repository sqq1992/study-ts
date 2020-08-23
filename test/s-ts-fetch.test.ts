import DummyClass from "../src/s-ts-fetch"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })
})
