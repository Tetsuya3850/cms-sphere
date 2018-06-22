import React, { Component } from "react";
import { getScenario, updateScenario } from "./api";

class EditScenario extends Component {
  state = {
    title: "",
    credit: "",
    load_error: false,
    form_error: false
  };

  async componentDidMount() {
    try {
      const { data } = await getScenario(this.props.match.params.id);
      if (data.result !== "true") {
        this.setState({ load_error: true });
        return;
      }
      var scenario = data.scenarios[0];
      this.setState({
        title: scenario.TITLE,
        credit: scenario.CREDIT
      });
    } catch (e) {
      console.log(e);
      this.setState({ load_error: true });
    }
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const payload = {
      TITLE: this.state.title,
      CREDIT: this.state.credit,
      YEAR: "",
      LATITUDE: "",
      LONGITUDE: ""
    };
    try {
      const { data } = await updateScenario(
        this.props.match.params.id,
        payload
      );
      if (data.result === "true") {
        this.setState({ form_error: false });
        this.props.history.push(`/scenarios/${this.props.match.params.id}`);
      } else {
        this.setState({ form_error: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3>シナリオ案</h3>

          <div
            className="alert alert-danger"
            style={{ display: this.state.load_error ? "block" : "none" }}
          >
            エラー：申し訳ありません。リロードしてください。
          </div>

          <div
            className="alert alert-danger"
            style={{ display: this.state.form_error ? "block" : "none" }}
          >
            エラー：申し訳ありません。もう一度送信してください。
          </div>

          <div className="form-group">
            <label>タイトル</label>
            <input
              type="text"
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              className="form-control"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>クレジット</label>
            <input
              type="text"
              value={this.state.credit}
              onChange={e => {
                this.setState({ credit: e.target.value });
              }}
              className="form-control"
              required
            />
          </div>

          <input className="btn btn-primary" type="submit" value="更新" />
        </form>
      </div>
    );
  }
}

export default EditScenario;
