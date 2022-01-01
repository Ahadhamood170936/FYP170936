import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaUsers, FaUserGraduate, FaUserTie } from "react-icons/fa";
import CardItem from "./CardItem";
import Spinner from "./../Common/Spinner";
import {
  getclassfourworkers,
  getStudents,
  getTeachers,
  getTeachersPositions,
  setElectionSetting,
} from "../../Firebase/Firebase";
import DataTable from "./DataTable";

class Dashboard extends React.Component {
  state = {
    loading: true,
    students: [],
    teachers: [],
    workers: [],
    tPositions: [],
    activeActivity: "",
    status: false,
    formSubmissionDate: new Date(),
    startingDate: new Date(),
    endingDate: new Date(),
  };

  async componentDidMount() {
    try {
      const students = await getStudents();
      const teachers = await getTeachers();
      const workers = await getclassfourworkers();
      const tPositions = await getTeachersPositions();

      this.setState({
        loading: false,
        students,
        workers,
        teachers,
        tPositions,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  submitHandler = async (item, e) => {
    try {
      this.setState({ loading: true });
      const { formSubmissionDate, startingDate, endingDate } = this.state;
      const tpCopy = [...this.state.tPositions];

      const index = tpCopy.findIndex((it) => it.name === item.name);
      tpCopy[index].status = e.target.checked;

      await setElectionSetting(
        item.name,
        e.target.checked,
        formSubmissionDate.getTime(),
        startingDate.getTime(),
        endingDate.getTime()
      );

      this.setState({ tPositions: tpCopy, loading: false });
      alert("Added Successfully!!");
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  dateChangeHandler = (name, item, date) => {
    const tCopy = [...this.state.tPositions];
    const index = tCopy.findIndex((it) => it.name === item.name);
    tCopy[index][name] = date;
    this.setState({ [name]: date, tPositions: tCopy });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h3 className="mb-4 mt-2">Dashboard</h3>
            <div className="row">
              <CardItem
                title="Total Students"
                Icon={FaUsers}
                value={this.state.students.length}
                bgcolor="bg-purple"
                txtcolor="text-purple"
                borderColor="border-purple"
              />
              <CardItem
                title="Total Teachers"
                Icon={FaUserGraduate}
                value={this.state.teachers.length}
                bgcolor="bg-orange"
                txtcolor="text-orange"
                borderColor="border-orange"
              />
              <CardItem
                title="Total Workers"
                Icon={FaUserTie}
                value={this.state.workers.length}
                bgcolor="bg-green"
                txtcolor="text-green"
                borderColor="border-green"
              />
            </div>

            <h4 className="my-3 primary-color">Teaching Societies Positions</h4>
            <DataTable
              data={this.state.tPositions}
              dateChangeHandler={this.dateChangeHandler}
              submitHandler={this.submitHandler}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Dashboard;
