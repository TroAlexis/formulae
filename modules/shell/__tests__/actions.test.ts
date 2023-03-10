import { renderHook } from "@testing-library/react";
import { useShellStore } from "modules/shell/index";
import { act } from "react-dom/test-utils";

const getStore = () => {
  const { result } = renderHook(() => useShellStore());
  return result;
};

describe("toggleNavbar", () => {
  it("opens navbar if closed", () => {
    const store = getStore();
    act(store.current.toggleNavbar);

    expect(store.current.isNavBarOpen).toBe(true);
  });

  it("closes navbar if open", () => {
    const store = getStore();

    act(store.current.toggleNavbar);

    expect(store.current.isNavBarOpen).toBe(true);

    act(store.current.toggleNavbar);

    expect(store.current.isNavBarOpen).toBe(false);
  });
});

describe("closeNavbar", () => {
  it("closes navbar", () => {
    const store = getStore();

    act(store.current.closeNavbar);

    expect(store.current.isNavBarOpen).toBe(false);
  });
});
