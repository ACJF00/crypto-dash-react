import React from "react";
import Alert from "react-bootstrap/Alert";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div>
      <Alert key={variant} variant={variant}>
        {children}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
