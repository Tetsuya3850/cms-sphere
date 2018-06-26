import React, { Component } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

class ScenarioCard extends Component {
  render() {
    const { scenario } = this.props;
    return (
      <div className="card card-body">
        <div className="row">
          <div
            className="col-sm-6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="col-sm-9"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end"
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  width: "150px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >
                {scenario.TITLE}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  width: "150px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >{`by ${scenario.CREDIT}`}</span>
            </div>
          </div>

          <div
            className="col-sm-6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="col-sm-5"
              style={{
                display: "flex",
                justifyContent: "space-around"
              }}
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
                remove={this.props.removeScenario}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScenarioCard;
