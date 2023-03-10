import { renderHook } from "@testing-library/react";
import { useThemeStoreHook } from "modules/theme/index";
import { act } from "react-dom/test-utils";

describe("toggleTheme", () => {
  it("changes to dark if light is on", () => {
    const { result } = renderHook(() => useThemeStoreHook());

    act(result.current.toggleTheme);

    expect(result.current.theme).toBe("dark");
  });

  it("changes to light if dark is on", () => {
    const { result } = renderHook(() => useThemeStoreHook());

    act(result.current.toggleTheme);

    expect(result.current.theme).toBe("dark");

    act(result.current.toggleTheme);

    expect(result.current.theme).toBe("light");
  });
});
