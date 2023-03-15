import { getLast, getLastIndex, spliceItem } from "utils/array";

let filledArray: number[];
let emptyArray: unknown[];

beforeEach(() => {
  filledArray = [0, 1, 2, 3];
  emptyArray = [];
});

describe("getLastIndex", () => {
  it("returns array's last index", () => {
    expect(getLastIndex(filledArray)).toBe(3);
  });

  it("returns -1 if array is empty", () => {
    expect(getLastIndex(emptyArray)).toBe(-1);
  });
});

describe("getLast", () => {
  it("returns array's last element", () => {
    expect(getLast(filledArray)).toBe(3);
  });

  it("returns undefined if array is empty", () => {
    expect(getLast(emptyArray)).toBe(undefined);
  });
});

describe("spliceItem", () => {
  it("deletes element from array", () => {
    const length = filledArray.length;
    const itemToDelete = getLast(filledArray);

    spliceItem(filledArray, itemToDelete);

    expect(length).toBe(filledArray.length + 1);
    expect(filledArray).not.toContain(itemToDelete);
  });
  it("replaces element with another", () => {
    const length = filledArray.length;
    const itemToReplace = filledArray[1];
    const itemToAdd = 100;

    const indexOfReplaced = filledArray.indexOf(itemToReplace);

    spliceItem(filledArray, itemToReplace, itemToAdd);

    const indexOfAdded = filledArray.indexOf(itemToAdd);

    expect(length).toEqual(filledArray.length);
    expect(filledArray).not.toContain(itemToReplace);
    expect(filledArray).toContain(itemToAdd);
    expect(indexOfReplaced).toEqual(indexOfAdded);
  });
});
