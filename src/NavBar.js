import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { isAuthed, removeToken } from "./helper";
import axios from "axios";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
          <div className="container">
            <NavLink exact to="/" className="navbar-brand">
              <span>ホーム</span>
            </NavLink>

            {isAuthed() ? (
              <ul className="navbar-nav ml-auto">
                <li>
                  <NavLink
                    to={`/all`}
                    className="nav-item"
                    style={{ color: "white", marginRight: "30px" }}
                  >
                    シナリオ一覧
                  </NavLink>
                </li>
                <li>
                  <div
                    onClick={() => {
                      removeToken();
                      delete axios.defaults.headers.common["Authorization"];
                      this.props.history.push("/");
                    }}
                    className="nav-item"
                    style={{ color: "white", cursor: "pointer" }}
                  >
                    ログアウト
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li>
                  <NavLink
                    to={`/login`}
                    className="nav-item"
                    style={{ color: "white" }}
                  >
                    ログイン
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <hr />
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
