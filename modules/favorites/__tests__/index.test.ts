import { ExpressionBuilder } from "__utils__/expression";
import { act, renderHook } from "@testing-library/react";
import { FavoritesSlice, FavoritesStore } from "modules/favorites/models";
import {
  selectAddFavorite,
  selectEditFavorite,
  selectFavoriteFormulaById,
  selectFavorites,
  selectRemoveFavorite,
  selectSetFavorites,
} from "modules/favorites/selectors";
import { createFavoritesSlice } from "modules/favorites/slice";
import { FormulaOperatorType } from "modules/formulas/enums";
import { getFormulaSlice } from "modules/formulas/utils/slice";
import { selectMap } from "modules/map/selectors";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create<FavoritesStore>()(immer(createFavoritesSlice));

const expressionBuilder = new ExpressionBuilder()
  .addValue(100)
  .addOperator(FormulaOperatorType.DIVISION)
  .addValue(50);

describe("Favorites store", () => {
  const { expression, map } = expressionBuilder;
  const expressionSlice = getFormulaSlice(expression.id, map) as FavoritesSlice;

  const getFavorites = () => {
    const { result: favorites } = renderHook(() => useStore(selectFavorites));
    return favorites;
  };

  const getFavoritesMap = () => {
    const { result: favoritesMap } = renderHook(() => useStore(selectMap));
    return favoritesMap;
  };

  const getFormula = (id: string) => {
    const { result: newExpression } = renderHook(() =>
      useStore((state) => selectFavoriteFormulaById(state, id))
    );

    return newExpression;
  };

  const addExpression = (slice: FavoritesSlice = expressionSlice) => {
    const favorites = getFavorites();
    const { result: addFavorite } = renderHook(() =>
      useStore(selectAddFavorite)
    );

    act(() => {
      addFavorite.current(slice);
    });

    const [newId] = favorites.current;

    return newId;
  };

  it("adds favorite with different id", () => {
    const newId = addExpression();
    const favorites = getFavorites();
    const favoritesMap = getFavoritesMap();

    expect(favorites.current).toHaveLength(1);
    expect(newId).not.toBe(expression.id);
    expect(favoritesMap.current).toHaveProperty(newId);
  });

  it("edits favorite properties", () => {
    const newId = addExpression();
    const { result: editFavorite } = renderHook(() =>
      useStore(selectEditFavorite)
    );
    const newExpression = getFormula(newId);

    const newProperties = {
      name: "test-name",
      description: "test-description",
    };

    act(() => {
      editFavorite.current(newId, newProperties);
    });

    expect(newExpression.current).toBeDefined();
    expect(newExpression?.current).toMatchObject(newProperties);
  });

  it("sets favorites with different ids", () => {
    const { result: setFavorites } = renderHook(() =>
      useStore(selectSetFavorites)
    );
    const favorites = getFavorites();
    const favoritesMap = getFavoritesMap();

    const newFavorites = [expressionSlice, expressionSlice];

    act(() => {
      setFavorites.current(newFavorites);
    });

    const [newId] = favorites.current;

    expect(favorites.current.length).toBe(newFavorites.length);
    expect(favoritesMap.current).toHaveProperty(newId);
    expect(expressionSlice.id).not.toBe(newId);
  });

  it("removes favorite", () => {
    const idToRemove = addExpression();
    addExpression();
    addExpression();

    const { result: removeFavorite } = renderHook(() =>
      useStore(selectRemoveFavorite)
    );
    const favorites = getFavorites();

    act(() => {
      removeFavorite.current(idToRemove);
    });

    const removedExpression = getFormula(idToRemove);

    expect(favorites.current).toHaveLength(2);
    expect(favorites.current).not.toContain(idToRemove);
    expect(removedExpression.current).not.toBeDefined();
  });
});
