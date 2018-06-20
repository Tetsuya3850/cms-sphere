import React, { Component } from "react";
import { login } from "./api";
import axios from "axios";
import { saveToken } from "./helper";

class Login extends Component {
  state = {
    id: "",
    password: ""
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    var payload = {
      id: Number(this.state.id),
      password: this.state.password
    };
    var { data } = await login(payload);
    if (data.result === "true") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        data.api_token
      }`;
      saveToken(data);
      this.props.history.push("/");
    }
  };

  clearForm = () => {
    this.setState({ id: "", password: "" });
  };

  render() {
    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3 style={{ textAlign: "center" }}>ログイン</h3>

          <div className="form-group">
            <label>ユーザーID</label>
            <input
              type="number"
              value={this.state.id}
              onChange={e => {
                this.setState({ id: e.target.value });
              }}
              className="form-control"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>パスワード</label>
            <input
              type="text"
              value={this.state.password}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              className="form-control"
              required
            />
          </div>

          <input className="btn btn-primary" type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

export default Login;
