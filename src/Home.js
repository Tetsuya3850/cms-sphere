import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="jumbotron text-center">
        <h1 className="display-3">SPHERE CMS</h1>
        <p className="lead">Tell your own Earth Story</p>
        <Link to={`/scenario/add`} className="btn btn-dark btn-lg">
          オリジナル・シナリオを作る
        </Link>
      </div>
    );
  }
}

export default Home;
