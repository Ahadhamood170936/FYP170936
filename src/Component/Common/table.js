import React from "react";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";

const Table = ({ data, coloumns }) => {
  return (
    <table className="table table-striped table-bordered responsive__table ">
      <TableHeaders coloumns={coloumns} />
      <TableBody coloumns={coloumns} data={data} />
    </table>
  );
};

export default Table;
