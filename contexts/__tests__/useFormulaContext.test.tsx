import { ExpressionBuilder } from "__utils__/expression";
import { muteErrors } from "__utils__/jest";
import { useFavoritesStore, useFormulasStore } from "__utils__/stores";
import { render, RenderOptions, screen } from "@testing-library/react";
import { FormulaProvider, useFormulaContext } from "contexts/useFormulaContext";
import { NO_PROVIDER_ERROR_MESSAGE } from "contexts/useFormulaContext/consts";
import { FormulaProviderProps } from "contexts/useFormulaContext/models";
import { FavoritesSlice } from "modules/favorites/models";
import {
  selectFavoriteFormulaById,
  selectFavoriteSliceById,
} from "modules/favorites/selectors";
import { FormulaType } from "modules/formulas/enums";
import { selectFormulaSliceById } from "modules/formulas/selectors";
import { getFormulaSlice } from "modules/formulas/utils/slice";
import { FC, ReactElement } from "react";
import { keyBy } from "utils/map";

interface TestingComponentProps {
  type?: FormulaType;
}

const ConsumerComponent: FC<TestingComponentProps> = ({ type }) => {
  const { formula } = useFormulaContext(type);

  return (
    <>
      <span role={"id"}>{formula.id}</span>
      <span role={"type"}>{formula.type}</span>
      <span role={"value"}>{formula.value}</span>
    </>
  );
};

const renderWithProvider = (
  ui: ReactElement,
  {
    providerProps,
    ...renderOptions
  }: RenderOptions & { providerProps: FormulaProviderProps<any, any> }
) => {
  return render(
    <FormulaProvider {...providerProps}>{ui}</FormulaProvider>,
    renderOptions
  );
};

const sharedProviderProps = {
  useStore: useFormulasStore,
  sliceSelector: selectFormulaSliceById,
};

describe("useFormulaContext", () => {
  muteErrors();

  const value = 100;
  const { expression, map } = new ExpressionBuilder().addValue(value);
  const [formulaId] = expression.value;

  type RenderConsumerProps = Partial<FormulaProviderProps<any, any>> &
    TestingComponentProps;

  const renderConsumer = ({ id, type }: RenderConsumerProps) => {
    const providerProps = {
      id: id ?? formulaId,
      ...sharedProviderProps,
    };

    useFormulasStore.setState({ map });

    return renderWithProvider(<ConsumerComponent type={type} />, {
      providerProps,
    });
  };

  it("consumer gets formula of correct type from provider", () => {
    const type = FormulaType.VALUE;

    renderConsumer({ type });

    expect(screen.getByRole("id")).toHaveTextContent(formulaId);
    expect(screen.getByRole("type")).toHaveTextContent(`${type}`);
    expect(screen.getByRole("value")).toHaveTextContent(`${value}`);
  });

  it("consumer gets formula from a different store", () => {
    const providerProps: FormulaProviderProps<any, any> = {
      id: expression.id,
      useStore: useFavoritesStore,
      formulaSelector: selectFavoriteFormulaById,
      sliceSelector: selectFavoriteSliceById,
    };

    const favoritesSlice = getFormulaSlice(
      expression.id,
      map
    ) as FavoritesSlice;
    const favoritesSlices = [favoritesSlice];
    const favoritesMap = keyBy(favoritesSlices, "id");

    useFavoritesStore.setState({ map: favoritesMap });

    renderWithProvider(<ConsumerComponent type={FormulaType.EXPRESSION} />, {
      providerProps,
    });

    expect(screen.getByRole("id")).toHaveTextContent(expression.id);
    expect(screen.getByRole("type")).toHaveTextContent(
      `${FormulaType.EXPRESSION}`
    );
  });

  it("throws if not wrapped in provider", () => {
    expect(() => render(<ConsumerComponent />)).toThrow(
      NO_PROVIDER_ERROR_MESSAGE
    );
  });

  it("doesn't render if formula not found", () => {
    renderWithProvider(<ConsumerComponent type={FormulaType.VALUE} />, {
      providerProps: { id: "null", ...sharedProviderProps },
    });
    const getChild = () => screen.getByRole("id");

    expect(getChild).toThrowError();
  });

  it("throws if found formula type doesn't match", () => {
    const renderComponent = () =>
      renderConsumer({ type: FormulaType.OPERATOR });

    expect(renderComponent).toThrowError();
  });
});
