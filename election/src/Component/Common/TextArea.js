import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const TextArea = ({
  name,
  description = "Textarea Description",
  label,
  error,
  ...rest
}) => {
  return (
    <Tippy content={description}>
      <div className="form-group row">
        <label htmlFor={name} className="col-sm-2 font-weight-bold">
          {label}
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id={name}
            name={name}
            rows="10"
            {...rest}
          ></textarea>
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
    </Tippy>
  );
};

export default TextArea;
