import React from "react";

const TypeSelect = (props) => {
  const options = [
    {
      value: "",
      label: "",
    },
    {
      value: "Torte",
      label: "Torte",
    },
    {
      value: "Biscotti",
      label: "Biscotti",
    },
    {
      value: "Crostate",
      label: "Crostate",
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
