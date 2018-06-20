import React, { Component } from "react";
import { getScenario, updateScenario } from "./api";

class EditScenario extends Component {
  state = {
    title: "",
    credit: ""
  };

  async componentDidMount() {
    const { data } = await getScenario(this.props.match.params.id);
    var scenario = data.scenarios[0];
    this.setState({
      title: scenario.TITLE,
      credit: scenario.CREDIT
    });
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const payload = {
      CATEGORY: "CMS",
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
      this.props.history.push(`/scenarios/${this.props.match.params.id}`);
    } catch (e) {
      if (!e.response) {
        console.log(e);
        return;
      }
    }
  };

  render() {
    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3>シナリオ案</h3>

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
