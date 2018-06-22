import React, { Component } from "react";
import { postScenario } from "./api";

class AddScenario extends Component {
  state = {
    title: "",
    credit: "",
    form_error: false
  };

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
      const { data } = await postScenario(payload);
      if (data.result === "true") {
        this.setState({ form_error: false });
        this.props.history.push(`/scenarios/${data.id}`);
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

          <input className="btn btn-primary" type="submit" value="作成" />
        </form>
      </div>
    );
  }
}

export default AddScenario;
