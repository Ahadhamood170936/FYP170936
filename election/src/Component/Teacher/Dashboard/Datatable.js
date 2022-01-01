import React from "react";
import Table from "./../../Common/table";

const DataTable = ({ data, active,submitVote, submitHandler }) => {
  const getDate = (date) => {
    const uDate = new Date(date);

    return uDate.toLocaleString();
  };
  const teachersColumns = [
    {
      path: "name",
      label: "Position",
    },
    {
      key: "formsubmission",
      label: "Form Submission Date",
      content: (item) => <span>{getDate(item.formSubmissionDate)}</span>,
    },
    {
      key: "startDate",
      label: "Election Start Date",
      content: (item) => <span>{getDate(item.startingDate)}</span>,
    },
    {
      key: "enddate",
      label: "Election End Date",
      content: (item) => <span>{getDate(item.endingDate)}</span>,
    },
    {
      key: "apply",
      content: (item) => (
        <button
          onClick={() => submitHandler(item)}
          className="btn primary-button"
        >
          Apply
        </button>
      ),
    },
  ];

  const electionColumns = [
    {
      path: "name",
      label: "Position",
    },
    {
      key: "startDate",
      label: "Election Start Date",
      content: (item) => <span>{getDate(item.startingDate)}</span>,
    },
    {
      key: "enddate",
      label: "Election End Date",
      content: (item) => <span>{getDate(item.endingDate)}</span>,
    },
    {
      key: "Vote",
      content: (item) => (
        <button
          onClick={() => submitVote(item)}
          className="btn primary-button"
          data-toggle="modal"
          data-target="#paymentmodal"
        >
          Vote
        </button>
      ),
    },
  ];

  return (
    <Table
      data={data}
      coloumns={active === "Apply" ? teachersColumns : electionColumns}
    />
  );
};

export default DataTable;
