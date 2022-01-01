import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Marquee from "react-fast-marquee";
import {
  getTeachersPositions,
  teacherApplyForElection,
} from "../../../Firebase/Firebase";
import Spinner from "../../Common/Spinner";
import { dates, DateDifference } from "../../Utils/data";
import DataTable from "./Datatable";
import Modal from "./../../Common/Modal";

class Dashboard extends React.Component {
  state = {
    loading: true,
    positions: [],
    activeElections: [],
    selectedPostion: null,
    selectedMember: null,
  };

  async componentDidMount() {
    try {
      const postions = await getTeachersPositions();
      const npostions = this.getPositions(postions);
      const activeElections = this.getActiveElections(postions);

      this.setState({ loading: false, positions: npostions, activeElections });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  getPositions = (poss) => {
    const newPoss = [];
    poss.forEach((item) => {
      if (item.status && this.compareDates(item.formSubmissionDate) <= 0) {
        newPoss.push(item);
      }
    });

    return newPoss;
  };

  getActiveElections = (poss) => {
    const newPoss = [];
    poss.forEach((item) => {
      if (
        item.status &&
        this.checkDateIsInRange(item.startingDate, item.endingDate)
      ) {
        newPoss.push(item);
      }
    });

    return newPoss;
  };

  compareDates = (itemDate) => {
    const today = new Date();
    const today1 = new Date(itemDate);
    const res = dates.compare(today, today1);
    return res;
  };

  checkDateIsInRange = (startDate, endDate) => {
    const today = new Date();
    const startingDate = new Date(startDate);
    const endingDate = new Date(endDate);
    const res = DateDifference.inRange(today, startingDate, endingDate);
    return res;
  };

  applyForElection = async (postion) => {
    const teacher = JSON.parse(localStorage.getItem("election-teacher"));
    const candidatesCopy = [...postion.candidates];
    const index = candidatesCopy.findIndex((item) => item.uid === teacher.uid);
    if (index < 0) {
      candidatesCopy.push({
        uid: teacher.uid,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        department: teacher.department,
        email: teacher.email,
        votes: 0,
      });

      try {
        this.setState({ loading: true });

        const pCopy = [...this.state.positions];

        const postIndex = pCopy.findIndex((it) => it.name === postion.name);

        pCopy[postIndex].candidates = candidatesCopy;

        await teacherApplyForElection(postion.name, candidatesCopy);
        this.setState({ loading: false, postions: pCopy });
        alert("Applied Successfully!!!!");
      } catch (error) {
        this.setState({ loading: false });
        alert(error.message);
      }
    } else {
      alert("You already applied!");
    }
  };

  submitVoteHandler = (post) => {
    this.setState({ selectedPostion: post });
  };

  memberSelectionHandler = (e) => {
    this.setState({ selectedMember: e.target.value });
  };

  submitVoteToMemberHandler = async () => {
    const { selectedMember, selectedPostion } = this.state;
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.state.positions.length > 0 && (
              <div>
                <Marquee speed={50} style={{ backgroundColor: "pink" }}>
                  <h1>
                    <span class="badge badge-secondary">New</span>
                    <span className="primary-color ml-2"> Apply for Election</span>
                  </h1>
                </Marquee>

                <br />
                <DataTable
                  data={this.state.positions}
                  active="Apply"
                  submitHandler={this.applyForElection}
                />
              </div>
            )}
            <div className="mt-4">
              {this.state.activeElections.length > 0 && (
                <div>
                  <Marquee speed={100} style={{ backgroundColor: "#34b3f7" }}>
                    <h3>
                      <span class="badge badge-warning">Vote</span>
                      <span style={{ color: "red" }} className="ml-2">
                        Vote for your Favourite Member
                      </span>
                    </h3>
                  </Marquee>

                  <br />
                  <DataTable
                    data={this.state.activeElections}
                    active="Election"
                    submitVote={this.submitVoteHandler}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <Modal
          label="Vote For Member"
          buttonLabel="Submit"
          buttonClicked={this.submitVoteToMemberHandler}
        >
          {this.state.selectedPostion && (
            <div>
              <h3 className="text-center">{this.state.selectedPostion.name}</h3>
              <ul class="list-group">
                <li class="list-group-item">
                  {this.state.selectedPostion.candidates.map((item) => (
                    <div className="row">
                      <div className="col-4">
                        <h6>{item.firstName + "" + item.lastName}</h6>
                      </div>
                      <div className="col-6">
                        <span>{item.email}</span>
                      </div>
                      <div className="col-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectedMember"
                            id={item.uid}
                            value={item.uid}
                            onChange={this.memberSelectionHandler}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={item.uid}
                          >
                            Vote
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          )}
        </Modal>
      </Sidebar>
    );
  }
}

export default Dashboard;
