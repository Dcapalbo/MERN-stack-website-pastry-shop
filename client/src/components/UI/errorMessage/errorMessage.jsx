import React from "react";

const ErrorMessage = ({ error, className = "", index = null }) => {
  const message = index !== null ? error?.[index]?.message : error?.message;
  return message ? <small className={className}>{message}</small> : null;
};

export default ErrorMessage;
