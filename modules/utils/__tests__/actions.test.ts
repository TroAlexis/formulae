import { act, renderHook } from "@testing-library/react";
import {
  createStoreActionFactory,
  createStoreMutationFactory,
} from "modules/utils/actions";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TestState {
  test: string;
}

interface TestStoreActions {
  setTest: (value: string) => void;
}

type TestStore = TestState & TestStoreActions;

const setTestMutation = createStoreMutationFactory<
  TestStoreActions,
  TestStore
>()("setTest")((state, value) => {
  state.test = value;
});

const createUseStore = () => {
  return create<TestStore>()(
    immer((set) => {
      const setTest = createStoreActionFactory<TestStoreActions, TestStore>()(
        set
      )(setTestMutation);

      return { test: "test", setTest };
    })
  );
};

describe("createStoreMutationFactory", () => {
  it("creates working and typed mutation", () => {
    const useStore = createUseStore();
    const state = useStore.getState();

    const newValue = "mutation";
    setTestMutation(state, newValue);

    expect(state.test).toBe(newValue);
  });
});

describe("createStoreActionFactory", () => {
  it("creates working immer action from a mutation", () => {
    const useStore = createUseStore();
    const { result } = renderHook(() => useStore((state) => state));

    const newValue = "correct";

    act(() => {
      result.current.setTest(newValue);
    });

    expect(result.current.test).toBe(newValue);
  });
});
