import { createStoreSelector } from "modules/utils/selectors";

describe("createStoreSelector", () => {
  const state = {
    test: "test",
  };

  it("creates property getter", () => {
    const selector = createStoreSelector(state)("test");
    const selected = selector(state);

    expect(selected).toBe(state.test);
  });
});
