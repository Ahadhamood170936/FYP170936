import React from "react";

const Input = ({
  name,
  description = "Input Description",
  label,
  error,
  ...rest
}) => {
  return (
    <div className="form-group ">
      <label htmlFor={name} className=" font-weight-bold mt-2">
        {label}
      </label>
      <input id={name} name={name} className="form-control" {...rest} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
