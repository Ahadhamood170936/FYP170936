import React, { Component } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import NavItem from "./NavItem";

class Sidebar extends Component {
  state = { loading: true, active: false, items: [] };

  async componentDidMount() {
    const expanded = localStorage.getItem("expanded");
    if (expanded) {
      expanded === "true"
        ? this.setState({ active: true })
        : this.setState({ active: false });
    }
  }

  logout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    if (logout) {
      localStorage.removeItem("election-teacher");
      window.location.replace("/teacher");
    }
  };

  handleActive = () => {
    this.setState({
      active: !this.state.active,
    });
    localStorage.setItem("expanded", !this.state.active);
  };

  render() {
    return (
      <div className={this.state.active ? "wrapper active" : "wrapper"}>
        <div className="main_body">
          <div className="sidebar_menu">
            <div className="inner__sidebar_menu">
              <ul>
                <div className="main_logo">
                  <h4>Teacher Panel</h4>
                </div>
                <NavItem path="/teacher/dashboard" Icon={FaHome} label="Dashboard" />
                <NavItem path="/teacher/profile" Icon={FaUser} label="Profile" />

                <li className="pointer">
                  <div onClick={this.logout}>
                    <span className="icon">
                      <FiLogOut />
                    </span>
                    <span className="list">Logout</span>
                  </div>
                </li>
              </ul>

              <div className="hamburger" onClick={this.handleActive}>
                <div className="inner_hamburger">
                  <span className="arrow">
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-container">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
