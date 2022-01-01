import React from "react";
import Table from "./../Common/table";

const DataTable = ({
  data,
  activeKey,
  deleteData,
  deleteWorker,
  deleteStudent,
}) => {
  const teacherColumns = [
    { label: "First Name", path: "firstName" },
    { label: "Last Name", path: "lastName" },
    { label: "Email", path: "email" },
    { label: "Address", path: "address" },
    { label: "Phone Number", path: "phoneNumber" },
    { label: "Department", path: "department" },
    {
      label: "",
      key: "Delete",
      content: (item) => (
        <button onClick={() => deleteData(item.uid)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];
  const classfourColumns = [
    { label: "First Name", path: "firstName" },
    { label: "Last Name", path: "lastName" },
    { label: "Email", path: "email" },
    { label: "Address", path: "address" },
    { label: "Phone Number", path: "phoneNumber" },
    {
      label: "",
      key: "Delete",
      content: (item) => (
        <button
          onClick={() => deleteWorker(item.uid)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  const studentsColumns = [
    { label: "First Name", path: "firstName" },
    { label: "Last Name", path: "lastName" },
    { label: "Email", path: "email" },
    { label: "Address", path: "address" },
    { label: "Phone Number", path: "phoneNumber" },
    { label: "City", path: "city" },
    { label: "Department", path: "department" },
    {
      label: "",
      key: "Delete",
      content: (item) => (
        <button
          onClick={() => deleteStudent(item.uid)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <Table
      data={data}
      coloumns={
        activeKey === "Teachers"
          ? teacherColumns
          : activeKey === "ClassFour"
          ? classfourColumns
          : studentsColumns
      }
    />
  );
};

export default DataTable;
