import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Scenarios from "./Scenarios";
import Scenario from "./Scenario";
import AddScenario from "./AddScenario";
import EditScenario from "./EditScenario";
import AddSequence from "./AddSequence";
import EditSequence from "./EditSequence";
import PrivateRoute from "./PrivateRoute";

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/all" component={Scenarios} />
          <PrivateRoute exact path="/scenarios/:id" component={Scenario} />
          <PrivateRoute path="/scenario/add" component={AddScenario} />
          <PrivateRoute path="/scenario/edit/:id" component={EditScenario} />
          <PrivateRoute path="/sequence/add/:id" component={AddSequence} />
          <PrivateRoute path="/sequence/edit/:id" component={EditSequence} />
        </div>
      </Router>
    );
  }
}

export default AppContainer;
