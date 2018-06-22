import React, { Component } from "react";
import { addSequence, uploadSequenceResource } from "./api";
import Earth from "./Earth";

class AddSequence extends Component {
  state = {
    scenario_id: this.props.match.params.id,
    longitude: "",
    latitude: "",
    localtext: "",
    localimg: "",
    img_url: "",
    time: "",
    tab: "text",
    form_error: false,
    file_error: false
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const payload = {
      SCENARIO_ID: this.state.scenario_id,
      ROTATE_FROM: "",
      ROTATE_TO: `${this.state.longitude},${this.state.latitude}`,
      ROTATE_SPEED: "",
      LAYER1_INDEX: "",
      LOCAL_TEXT: this.state.localtext,
      LOCAL_TEXT_WHY: "",
      LOCAL_TEXT_HOW: "",
      LOCAL_IMAGE: "",
      LOCAL_VIDEO: "",
      LOCAL_SOUND: "",
      TIME: this.state.time
    };
    try {
      if (this.state.file_error === false) {
        var { data } = await addSequence(payload);
        if (data.result !== "true") {
          this.setState({ form_error: true });
          return;
        }
      }
      if (this.state.localimg !== "") {
        let fd = new FormData();
        fd.append("LOCAL_IMAGE", this.state.localimg);
        var response = await uploadSequenceResource(data.id, fd);
        if (response.data.result !== "true") {
          this.setState({ file_error: true });
          return;
        }
      }
      this.props.history.push(`/scenarios/${this.props.match.params.id}`);
    } catch (e) {
      console.log(e);
      this.setState({ form_error: true });
    }
  };

  render() {
    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3>シーケンス案</h3>

          <div
            className="alert alert-danger"
            style={{
              display:
                this.state.form_error || this.state.file_error
                  ? "block"
                  : "none"
            }}
          >
            エラー：申し訳ありません。もう一度送信してください。
          </div>

          <div
            className="form-group row"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <div className="col-xs-3" style={{ marginRight: 20 }}>
              <label>緯度</label>
              <input
                type="number"
                step="any"
                min={-90}
                max={90}
                value={this.state.longitude}
                onChange={e => {
                  this.setState({ longitude: e.target.value });
                }}
                className="form-control"
                required
              />
            </div>

            <div className="col-xs-3">
              <label>経度</label>
              <input
                type="number"
                step="any"
                min={-180}
                max={180}
                value={this.state.latitude}
                onChange={e => {
                  this.setState({ latitude: e.target.value });
                }}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-xs-12">
            <Earth
              onEarthClick={(longitude, latitude) =>
                this.setState({ longitude, latitude })
              }
            />
          </div>

          <div className="col-xs-12 ">
            <nav>
              <div
                className="nav nav-tabs nav-fill"
                id="nav-tab"
                role="tablist"
              >
                <div
                  className={
                    this.state.tab === "text"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ tab: "text" })}
                >
                  説明テキスト
                </div>
                <div
                  className={
                    this.state.tab === "img"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ tab: "img" })}
                >
                  説明画像
                </div>
              </div>
            </nav>
            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
              <div
                role="tabpanel"
                style={{
                  display: this.state.tab === "text" ? "block" : "none"
                }}
              >
                <textarea
                  className="form-control"
                  rows="4"
                  value={this.state.localtext}
                  onChange={e => {
                    this.setState({
                      localtext: e.target.value,
                      localimg: "",
                      img_url: ""
                    });
                  }}
                  maxLength="1000"
                />
              </div>
              <div
                role="tabpanel"
                style={{
                  display: this.state.tab === "img" ? "block" : "none"
                }}
              >
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={e => {
                    var file = e.target.files[0];
                    var img_url = window.URL.createObjectURL(file);
                    this.setState({ localimg: file, img_url, localtext: "" });
                  }}
                />
                <br />
                <img
                  id="upload"
                  alt="upload preview"
                  src={this.state.img_url}
                  width="50%"
                  style={{
                    display: this.state.img_url === "" ? "none" : "block",
                    marginTop: 10
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-3">
              <label>時間</label>
              <input
                type="number"
                min={0}
                value={this.state.time}
                onChange={e => {
                  this.setState({ time: e.target.value });
                }}
                className="form-control"
                required
              />
            </div>
          </div>

          <input className="btn btn-primary" type="submit" value="作成" />
        </form>
      </div>
    );
  }
}

export default AddSequence;
