import PuffLoader from "react-spinners/PuffLoader";
import React from "react";

const LoadingSpinner = () => {
  return (
    <PuffLoader
      style={{
        display: "inherit",
        position: "relative",
        width: "100px",
        height: "100px",
        margin: "auto",
      }}
      color={"#d27b7b"}
      size={100}
    />
  );
};

export default LoadingSpinner;
