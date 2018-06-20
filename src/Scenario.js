import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSequences } from "./api";
import DeleteModal from "./DeleteModal";

class Scenario extends Component {
  state = {
    sequences: []
  };
  async componentDidMount() {
    const { data } = await getSequences(this.props.match.params.id);
    this.setState({ sequences: data.sequences });
  }

  removeSequence = id => {
    var removed = this.state.sequences.filter(sequence => sequence.ID !== id);
    this.setState({ sequences: removed });
  };

  render() {
    return (
      <div className="container">
        <h2 style={{ textAlign: "center" }}>シナリオ</h2>
        <Link
          to={`/sequence/add/${this.props.match.params.id}`}
          role="button"
          style={{ color: "white", marginBottom: "10px", marginRight: "10px" }}
          className="btn btn-primary"
        >
          新規作成
        </Link>
        <Link
          to={`/scenario/edit/${this.props.match.params.id}`}
          role="button"
          style={{ color: "white", marginBottom: "10px" }}
          className="btn btn-primary"
        >
          シナリオ編集
        </Link>
        {this.state.sequences.map(sequence => (
          <div className="card card-body" key={sequence.ID}>
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
                  <span style={{ fontSize: "20px" }}>
                    {sequence.LOCAL_TEXT}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    {sequence.LAYER1_INDEX}
                  </span>
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
                    remove={() => this.removeSequence(sequence.ID)}
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

export default Scenario;
