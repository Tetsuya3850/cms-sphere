import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSequences, getScenario } from "./api";
import SequenceCard from "./SequenceCard";
import Loader from "./Loader/Loader";

class Scenario extends Component {
  state = {
    isFetching: false,
    title: "",
    sequences: [],
    error: false
  };

  async componentDidMount() {
    try {
      this.setState({ isFetching: true });
      var { data } = await getScenario(this.props.match.params.id);
      if (data.result !== "true") {
        this.setState({ isFetching: false, error: true });
        return;
      }
      this.setState({ title: data.scenarios[0].TITLE });
      var { data } = await getSequences(this.props.match.params.id);
      if (data.result !== "true") {
        this.setState({ isFetching: false, error: true });
        return;
      }
      this.setState({
        sequences: data.sequences,
        isFetching: false,
        error: false
      });
    } catch (e) {
      this.setState({ isFetching: false, error: true });
      console.log(e);
    }
  }

  removeSequence = id => {
    var removed = this.state.sequences.filter(sequence => sequence.ID !== id);
    this.setState({ sequences: removed });
  };

  render() {
    return (
      <div className="container">
        {this.state.isFetching ? (
          <Loader />
        ) : (
          <div>
            <div
              style={{
                margin: "auto",
                width: "30%"
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >
                {this.state.title}
              </h2>
            </div>

            <Link
              to={`/sequence/add/${this.props.match.params.id}`}
              role="button"
              style={{
                color: "white",
                marginBottom: "10px",
                marginRight: "10px"
              }}
              className="btn btn-primary"
            >
              新規シーケンス作成
            </Link>
            <Link
              to={`/scenario/edit/${this.props.match.params.id}`}
              role="button"
              style={{ color: "white", marginBottom: "10px" }}
              className="btn btn-primary"
            >
              シナリオ編集
            </Link>

            <div
              className="alert alert-danger"
              style={{ display: this.state.error ? "block" : "none" }}
            >
              エラー：申し訳ありません。リロードしてみてください。
            </div>
            {this.state.sequences.length !== 0 ? (
              <div>
                {this.state.sequences.map(sequence => (
                  <SequenceCard
                    key={sequence.ID}
                    sequence={sequence}
                    removeSequence={() => this.removeSequence(sequence.ID)}
                  />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>
                まだシーケンスがありません。
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Scenario;
