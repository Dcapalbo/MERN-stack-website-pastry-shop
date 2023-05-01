import classes from "./filterDataSelect.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";

const FilterDataSelect = ({ onChange, value }) => {
  const { t } = useTranslation();

  const options = [
    {
      value: "",
      label: t("filterOptions.all"),
    },
    {
      value: t("filterOptions.cakes"),
      label: t("filterOptions.cakes"),
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
    <div className={classes.wrapper__filter__data__select}>
      <label>{t("filterSweets")}</label>
      <select
        className={classes.filter__data__select}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDataSelect;
