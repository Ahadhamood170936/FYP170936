import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import {
  deleteTeacher,
  getclassfourworkers,
  getTeachers,
  deleteclassfourworkers,
  getStudents,
  deleteStudent,
} from "../../Firebase/Firebase";
import DataTable from "./Table";
import Spinner from "../Common/Spinner";
import { BsChevronDoubleDown } from "react-icons/bs";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState("Students");
  const [teachers, setTeachers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [students, setStudents] = useState([]);
  const [activitiesPerPage, setActivitiesPerPage] = useState(10);

  useEffect(() => {
    fetchTeachers()
      .then((res) => {
        setTeachers(res);
      })
      .catch((err) => {
        alert(err.message);
      });
    fetchClassFourWorkers()
      .then((res) => {
        setWorkers(res);
      })
      .catch((err) => {
        alert(err.message);
      });
    fetchStudents()
      .then((res) => {
        setStudents(res);
      })
      .catch((err) => {
        alert(err.message);
      });
    setLoading(false);
  }, []);

  const loadMoreActivities = () => {
    setActivitiesPerPage(activitiesPerPage + 10);
  };

  const fetchTeachers = async () => {
    const dbTeachers = await getTeachers();
    return dbTeachers;
  };

  const fetchStudents = async () => {
    const dbStudents = await getStudents();
    return dbStudents;
  };

  const fetchClassFourWorkers = async () => {
    const dbWorkers = await getclassfourworkers();
    return dbWorkers;
  };

  const deleteData = async (id) => {
    try {
      setLoading(true);
      await deleteTeacher(id);
      let teachersCopy = [...teachers];
      teachersCopy = teachersCopy.filter((item) => item.uid !== id);
      setTeachers(teachersCopy);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const deleteWorker = async (id) => {
    try {
      setLoading(true);
      await deleteclassfourworkers(id);
      let workersCopy = [...workers];
      workersCopy = workersCopy.filter((item) => item.uid !== id);
      setWorkers(workersCopy);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const deleteStd = async (id) => {
    try {
      setLoading(true);
      await deleteStudent(id);
      let studentsCopy = [...students];
      studentsCopy = studentsCopy.filter((item) => item.uid !== id);
      setStudents(studentsCopy);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <Sidebar>
      {loading ? (
        <Spinner />
      ) : (
        <div>
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

          {activeKey === "Students" && (
            <div className="my-3">
              <Link
                to="/users/newstudent"
                className="btn primary-button-outline btn-block mr-3 mb-3"
              >
                Create Student
              </Link>

              <DataTable
                activeKey={activeKey}
                data={students.slice(0, activitiesPerPage)}
                deleteStudent={deleteStd}
              />
              {workers.length > 0 && activitiesPerPage < workers.length ? (
                <span className="d-flex justify-content-center">
                  <button
                    className="btn primary-button"
                    onClick={loadMoreActivities}
                  >
                    <BsChevronDoubleDown />
                  </button>
                </span>
              ) : null}
            </div>
          )}
          {activeKey === "Teachers" && (
            <div className="my-3">
              <Link
                to="/users/newteacher"
                className="btn primary-button-outline btn-block mr-3 mb-3"
              >
                Create Teacher
              </Link>

              <DataTable
                activeKey={activeKey}
                data={teachers.slice(0, activitiesPerPage)}
                deleteData={deleteData}
              />
              {teachers.length > 0 && activitiesPerPage < teachers.length ? (
                <span className="d-flex justify-content-center">
                  <button
                    className="btn primary-button"
                    onClick={loadMoreActivities}
                  >
                    <BsChevronDoubleDown />
                  </button>
                </span>
              ) : null}
            </div>
          )}
          {activeKey === "ClassFour" && (
            <div className="my-3">
              <Link
                to="/users/newworker"
                className="btn primary-button-outline btn-block mr-3 mb-3"
              >
                Create Class Four Worker
              </Link>

              <DataTable
                activeKey={activeKey}
                data={workers.slice(0, activitiesPerPage)}
                deleteWorker={deleteWorker}
              />
              {workers.length > 0 && activitiesPerPage < workers.length ? (
                <span className="d-flex justify-content-center">
                  <button
                    className="btn primary-button"
                    onClick={loadMoreActivities}
                  >
                    <BsChevronDoubleDown />
                  </button>
                </span>
              ) : null}
            </div>
          )}
        </div>
      )}
    </Sidebar>
  );
};

export default Users;
