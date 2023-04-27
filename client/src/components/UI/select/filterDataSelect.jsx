import classes from "./filterDataSelect.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";

const FilterDataSelect = (props) => {
  const { t } = useTranslation();

  const options = [
    {
      value: "",
      label: "Tutti",
    },
    {
      value: "Torte",
      label: "Torte",
    },
    {
      value: "Pane",
      label: "Pane",
    },
    {
      value: "Biscotti",
      label: "Biscotti",
    },
  ];

  return (
    <div className={classes.wrapper__filter__data__select}>
      <label>{t("filterSweets")}</label>
      <select
        className={classes.filter__data__select}
        onChange={props.onChange}
        value={props.value}
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
