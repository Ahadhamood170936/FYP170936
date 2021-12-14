import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

const Users = () => {
  const [activeKey, setActiveKey] = useState("Students");

  return (
    <Sidebar>
      <h3>{activeKey}</h3>
      <div className="users-tabs">
        <Tabs
          activeKey={activeKey}
          id="uncontrolled-tab-example"
          onSelect={(k) => setActiveKey(k)}
        >
          <Tab
            eventKey="Students"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                Students
              </span>
            }
          ></Tab>
          <Tab
            eventKey="Teachers"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                Teachers
              </span>
            }
          ></Tab>
          <Tab
            eventKey="ClassFour"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                Class Four
              </span>
            }
          ></Tab>
        </Tabs>
      </div>
    </Sidebar>
  );
};

export default Users;
