import {
  addToMap,
  clearMap,
  deleteFromMap,
  editInMap,
} from "modules/map/actions";
import { MapState } from "modules/map/models";

let state: MapState<string, { id: number }>;

const key = "id";
const value = {
  id: 0,
};

beforeEach(() => {
  state = {
    map: {
      [key]: value,
    },
  };
});

describe("addToMap", () => {
  it("adds value to map", () => {
    const newValue = { id: 1 };
    const newKey = "another-id";
    addToMap(state, newKey, newValue);
    const element = state.map[newKey];
    expect(element).toBe(newValue);
  });
});

describe("editInMap", () => {
  it("edits value in map", () => {
    const newId = 100;
    editInMap(state, key, (item) => {
      item.id = newId;
    });

    const element = state.map[key];
    expect(element.id).toBe(newId);
  });
});

describe("deleteFromMap", () => {
  it("deletes element from map", () => {
    const deletedElement = deleteFromMap(state, key);

    const element = state.map[key];

    expect(element).toBe(undefined);
    expect(deletedElement).toBe(value);
  });
});

describe("clearMap", () => {
  it("clears state map", () => {
    clearMap(state);

    const { map } = state;
    expect(map).toMatchObject({});
  });
});
