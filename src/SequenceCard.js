import React, { Component } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

class SequenceCard extends Component {
  render() {
    const { sequence } = this.props;
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
              <span style={{ fontSize: "20px" }}>{sequence.LAYER1_INDEX}</span>
              {sequence.LOCAL_IMAGE !== "" ? (
                <div style={{ width: "150px" }}>
                  <img style={{ height: "40px" }} src={sequence.LOCAL_IMAGE} />
                </div>
              ) : (
                <span
                  style={{
                    fontSize: "16px",
                    width: "150px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {sequence.LOCAL_TEXT}
                </span>
              )}
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
                to={`/sequence/edit/${sequence.ID}`}
                role="button"
                style={{ color: "white" }}
                className="btn btn-secondary"
              >
                編集
              </Link>
              <DeleteModal
                type="sequence"
                id={sequence.ID}
                remove={this.props.removeSequence}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SequenceCard;
