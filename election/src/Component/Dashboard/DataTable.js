import React from "react";
import Table from "./../Common/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataTable = ({ data, dateChangeHandler, submitHandler }) => {
  const getDate = (date) => {
    const uDate = new Date(date);

    return uDate;
  };
  const teachersColumns = [
    {
      path: "name",
      label: "Position",
    },
    {
      key: "formsubmission",
      label: "Form Submission Date",
      content: (item) => (
        <DatePicker
          selected={getDate(item.formSubmissionDate)}
          onChange={(date) =>
            dateChangeHandler("formSubmissionDate", item, date)
          }
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        >
          <div style={{ color: "red" }}>
            It's Candidates Submission Form Date
          </div>
        </DatePicker>
      ),
    },
    {
      key: "startDate",
      label: "Election Start Date",
      content: (item) => (
        <DatePicker
          selected={getDate(item.startingDate)}
          onChange={(date) => dateChangeHandler("startingDate", item, date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        >
          <div style={{ color: "red" }}>It's Election Start Date</div>
        </DatePicker>
      ),
    },
    {
      key: "enddate",
      label: "Election End Date",
      content: (item) => (
        <DatePicker
          selected={getDate(item.endingDate)}
          onChange={(date) => dateChangeHandler("endingDate", item, date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        >
          <div style={{ color: "red" }}>It's Election End Date</div>
        </DatePicker>
      ),
    },
    {
      key: "changeStatus",
      content: (item) => (
        <div className="custom-control custom-switch">
          <input
            onChange={(e) => submitHandler(item, e)}
            type="checkbox"
            className="custom-control-input"
            id={item.name}
            checked={item.status}
          />
          <label
            htmlFor={item.name}
            className="custom-control-label"
            style={{ whiteSpace: "nowrap" }}
          >
            Disable/Enable
          </label>
        </div>
      ),
    },
  ];
  return <Table data={data} coloumns={teachersColumns} />;
};

export default DataTable;
