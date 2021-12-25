import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Select = ({
  name,
  description = "Seclect Area Description",
  label,
  data,
  error,
  ...rest
}) => {
  return (
    <Tippy content={description}>
      <div className="form-group row">
        <label
          htmlFor={name}
          className="col-sm-2 col-form-label font-weight-bold"
        >
          {label}
        </label>
        <div className="col-sm-10">
          <select name={name} {...rest} className="form-control">
            <option value="">Search {label}</option>
            {data.map((e, i) => (
              <option key={i} value={e.uid}>
                {e.name}
              </option>
            ))}
          </select>
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
    </Tippy>
  );
};

export default Select;
