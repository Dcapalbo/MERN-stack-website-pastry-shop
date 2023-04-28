import React from "react";
import { useTranslation } from "react-i18next";

const TypeSelect = (props) => {
  const { t } = useTranslation();
  const options = [
    {
      value: "",
      label: "",
    },
    {
      value: t("filterOptions.cakes"),
      label: t("filterOptions.cakes"),
    },
    {
      value: t("filterOptions.breads"),
      label: t("filterOptions.breads"),
    },
    {
      value: t("filterOptions.biscuits"),
      label: t("filterOptions.biscuits"),
    },
    {
      value: t("filterOptions.tarts"),
      label: t("filterOptions.tarts"),
    },
    {
      value: t("filterOptions.glutenFree"),
      label: t("filterOptions.glutenFree"),
    },
    {
      value: t("filterOptions.lactoseFree"),
      label: t("filterOptions.lactoseFree"),
    },
  ];

  return (
    <select onChange={props.onChange} value={props.value}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TypeSelect;
