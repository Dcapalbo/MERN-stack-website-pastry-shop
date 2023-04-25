import React from "react";

const TypeSelect = (props) => {
  const options = [
    {
      value: "",
      label: "",
    },
    {
      value: "Lungometraggio",
      label: "Lungometraggio",
    },
    {
      value: "Cortometraggio",
      label: "Cortometraggio",
    },
    {
      value: "Documentario",
      label: "Documentario",
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
