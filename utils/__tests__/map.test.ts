import { keyBy } from "utils/map";

describe("keyBy", () => {
  it("returns map if value is record key", () => {
    const items = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];

    expect(keyBy(items, "a")).toEqual({
      "1": items[0],
      "3": items[1],
    });
  });

  it("returns empty if value cannot be used as key", () => {
    const items = [
      { a: () => {}, b: 2 },
      { a: () => {}, b: 4 },
    ];

    expect(keyBy(items, "a" as any)).toEqual({});
  });
});
