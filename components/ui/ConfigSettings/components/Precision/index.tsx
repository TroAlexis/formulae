import { NumberInput, NumberInputProps } from "@mantine/core";
import { useThemeStore } from "modules/theme";
import {
  selectEditConfig,
  selectResultPrecision,
  selectValuePrecision,
} from "modules/theme/selectors";
import React, { FC } from "react";
import { DEFAULT_PRECISION } from "types/consts";

interface Props extends Omit<NumberInputProps, "type"> {
  type: "resultPrecision" | "valuePrecision";
}

const config = {
  resultPrecision: {
    selector: selectResultPrecision,
    label: "Result precision",
  },
  valuePrecision: {
    selector: selectValuePrecision,
    label: "Value precision",
  },
} as const;

const ConfigSettingsPrecision: FC<Props> = ({ type, ...props }) => {
  const settings = config[type];
  const precision = useThemeStore(settings.selector);
  const editConfig = useThemeStore(selectEditConfig);
  const handleChange: NumberInputProps["onChange"] = (value) => {
    editConfig(type, value ?? DEFAULT_PRECISION);
  };

  return (
    <NumberInput
      label={settings.label}
      value={precision}
      startValue={DEFAULT_PRECISION}
      precision={0}
      description={"Amount of digits after decimal point"}
      placeholder={"Enter precision"}
      onChange={handleChange}
      {...props}
    />
  );
};

export default ConfigSettingsPrecision;
