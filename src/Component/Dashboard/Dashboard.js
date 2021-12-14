import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaUsers, FaUserGraduate ,FaUserTie} from "react-icons/fa";
import CardItem from "./CardItem";

const Dashboard = () => {
  return (
    <Sidebar>
      <h3 className="mb-4 mt-2">Dashboard</h3>
      <div className="row">
        <CardItem
          title="Total Students"
          Icon={FaUsers}
          value={1200}
          bgcolor="bg-purple"
          txtcolor="text-purple"
          borderColor="border-purple"
        />
        <CardItem
          title="Total Teachers"
          Icon={FaUserGraduate}
          value={20}
          bgcolor="bg-orange"
          txtcolor="text-orange"
          borderColor="border-orange"
        />
        <CardItem
          title="Total class 4 Peoples"
          Icon={FaUserTie}
          value={40}
          bgcolor="bg-green"
          txtcolor="text-green"
          borderColor="border-green"
        />
      </div>
    </Sidebar>
  );
};

export default Dashboard;
