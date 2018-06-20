import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getScenarios } from "./api";
import DeleteModal from "./DeleteModal";

class Scenarios extends Component {
  state = {
    scenarios: []
  };

  async componentDidMount() {
    const { data } = await getScenarios();
    this.setState({ scenarios: data.scenarios });
  }

  removeScenario = id => {
    var removed = this.state.scenarios.filter(scenario => scenario.ID !== id);
    this.setState({ scenarios: removed });
  };

  render() {
    return (
      <div className="container">
        <h2 style={{ textAlign: "center" }}>シナリオ一覧</h2>
        <Link
          to={`/scenario/add`}
          role="button"
          style={{ color: "white", marginBottom: "10px" }}
          className="btn btn-primary"
        >
          新規作成
        </Link>
        {this.state.scenarios.map(scenario => (
          <div className="card card-body" key={scenario.ID}>
            <div className="row">
              <div
                className="col-sm-6"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="col-sm-8"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-end"
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{scenario.TITLE}</span>
                  <span style={{ fontSize: "16px" }}>{`by ${
                    scenario.CREDIT
                  }`}</span>
                </div>
              </div>

              <div
                className="col-sm-6"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="col-sm-5"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Link
                    to={`/scenarios/${scenario.ID}`}
                    role="button"
                    style={{ color: "white" }}
                    className="btn btn-secondary"
                  >
                    編集
                  </Link>
                  <DeleteModal
                    type="scenario"
                    id={scenario.ID}
                    remove={() => this.removeScenario(scenario.ID)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Scenarios;
