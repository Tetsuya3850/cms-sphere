import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getScenarios } from "./api";
import ScenarioCard from "./ScenarioCard";
import Loader from "./Loader/Loader";

class Scenarios extends Component {
  state = {
    isFetching: false,
    scenarios: [],
    error: false
  };

  async componentDidMount() {
    try {
      this.setState({ isFetching: true });
      const { data } = await getScenarios();
      if (data.result === "true") {
        this.setState({
          scenarios: data.scenarios,
          isFetching: false,
          error: false
        });
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      this.setState({ error: true });
      console.log(e);
    }
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

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "block" : "none" }}
        >
          エラー：申し訳ありません。リロードしてみてください。
        </div>

        {this.state.isFetching ? (
          <Loader />
        ) : (
          <div>
            {this.state.scenarios.length !== 0 ? (
              <div>
                {this.state.scenarios.map(scenario => (
                  <ScenarioCard
                    key={scenario.ID}
                    scenario={scenario}
                    removeScenario={() => this.removeScenario(scenario.ID)}
                  />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>まだシナリオがありません。</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Scenarios;
