import React, { Component } from "react";
import { getSequence, updateSequence, uploadSequenceResource } from "./api";
import Earth from "./Earth";
import ProgressModal from "./ProgressModal";

class EditSequence extends Component {
  state = {
    scenario_id: "",
    longitude: "",
    latitude: "",
    localtext: "",
    localimg: "",
    preview_url: "",
    previous_url: "",
    time: "",
    tab: "text",
    load_error: false,
    form_error: false,
    is_sumbitting: false
  };

  async componentDidMount() {
    try {
      const { data } = await getSequence(this.props.match.params.id);
      if (data.result !== "true") {
        this.setState({ load_error: true });
        return;
      }
      var sequence = data.sequences[0];
      var [longitude, latitude] = sequence.ROTATE_TO.split(",");
      this.setState({
        scenario_id: sequence.SCENARIO_ID,
        longitude,
        latitude,
        localtext: sequence.LOCAL_TEXT,
        preview_url: sequence.LOCAL_IMAGE,
        previous_url: sequence.LOCAL_IMAGE,
        time: sequence.TIME,
        tab: sequence.LOCAL_IMAGE === "" ? "text" : "img"
      });
    } catch (e) {
      console.log(e);
      this.setState({ load_error: true });
    }
  }

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
      LOCAL_IMAGE: this.state.previous_url,
      LOCAL_VIDEO: "",
      LOCAL_SOUND: "",
      TIME: this.state.time
    };
    try {
      this.setState({ is_sumbitting: true });
      const { data } = await updateSequence(
        this.props.match.params.id,
        payload
      );
      if (data.result !== "true") {
        this.setState({ form_error: true, is_sumbitting: false });
        return;
      }
      if (this.state.localtext !== "" || this.state.localimg !== "") {
        let fd = new FormData();
        fd.append("LOCAL_IMAGE", this.state.localimg);
        let response = await uploadSequenceResource(
          this.props.match.params.id,
          fd
        );
        if (response.data.result !== "true") {
          this.setState({ file_error: true, is_sumbitting: false });
          return;
        }
      }
      this.props.history.push(`/scenarios/${this.state.scenario_id}`);
    } catch (e) {
      console.log(e);
      this.setState({ form_error: true, is_sumbitting: false });
    }
  };

  render() {
    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3>シーケンス案</h3>

          <div
            className="alert alert-danger"
            style={{ display: this.state.load_error ? "block" : "none" }}
          >
            エラー：申し訳ありません。リロードしてください。
          </div>

          <div
            className="alert alert-danger"
            style={{
              display: this.state.form_error ? "block" : "none"
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
                    this.file.value = null;
                    this.setState({
                      localtext: e.target.value,
                      localimg: "",
                      preview_url: ""
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
                  ref={node => {
                    this.file = node;
                  }}
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={e => {
                    var file = e.target.files[0];
                    var preview_url = window.URL.createObjectURL(file);
                    this.setState({
                      localimg: file,
                      preview_url,
                      localtext: ""
                    });
                  }}
                />
                <br />
                <img
                  id="upload"
                  alt="upload preview"
                  src={this.state.preview_url}
                  width="50%"
                  style={{
                    display: this.state.preview_url === "" ? "none" : "block",
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

          <input className="btn btn-primary" type="submit" value="更新" />
          <ProgressModal isOpen={this.state.is_sumbitting} />
        </form>
      </div>
    );
  }
}

export default EditSequence;
