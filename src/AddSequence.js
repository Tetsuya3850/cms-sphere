import React, { Component } from "react";
import { addSequence, uploadSequenceResource } from "./api";
import Earth from "./Earth";
import ProgressModal from "./ProgressModal";

class AddSequence extends Component {
  state = {
    scenario_id: this.props.match.params.id,
    layer1_index: 0,
    globalimg: "",
    global_url: "",
    longitude: "",
    latitude: "",
    localtext: "",
    localimg: "",
    img_url: "",
    time: "",
    global_tab: "preset",
    local_tab: "text",
    form_error: false,
    file_error: false,
    is_sumbitting: false
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    if (this.state.globalimg === "" && this.state.layer1_index == 0) {
      this.setState({ layer1_index: "1" });
    }
    const payload = {
      SCENARIO_ID: this.state.scenario_id,
      ROTATE_FROM: "",
      ROTATE_TO: `${this.state.longitude},${this.state.latitude}`,
      LAYER1_INDEX: this.state.layer1_index,
      LOCAL_TEXT: this.state.localtext,
      LOCAL_TEXT_WHY: "",
      LOCAL_TEXT_HOW: "",
      LOCAL_IMAGE: "",
      LOCAL_VIDEO: "",
      LOCAL_SOUND: "",
      TIME: this.state.time
    };
    try {
      this.setState({ is_sumbitting: true });
      if (this.state.file_error === false) {
        var { data } = await addSequence(payload);
        if (data.result !== "true") {
          this.setState({ form_error: true, is_sumbitting: false });
          return;
        }
      }
      if (this.state.globalimg !== "" || this.state.localimg !== "") {
        var fd = new FormData();
        fd.append("LAYER1", this.state.globalimg);
        fd.append("LOCAL_IMAGE", this.state.localimg);
        var response = await uploadSequenceResource(data.id, fd);
        if (response.data.result !== "true") {
          this.setState({ file_error: true, is_sumbitting: false });
          return;
        }
      }
      this.props.history.push(`/scenarios/${this.props.match.params.id}`);
    } catch (e) {
      console.log(e);
      this.setState({ form_error: true, is_sumbitting: false });
    }
  };

  render() {
    const global_chocies = [
      "ブルーマーブル(国境線なし)",
      "ブルーマーブル(国境線あり)",
      "夜の地球(国境線なし)",
      "夜の地球(国境線あり)",
      "白地図"
    ];

    const allGlobalChoices = global_chocies.map((g_choice, index) => (
      <option key={g_choice} value={index + 1}>
        {g_choice}
      </option>
    ));

    return (
      <div id="formContainer" className="container card card-body">
        <form onSubmit={this.handleFormSubmit}>
          <h3
            style={{
              marginBottom: "20px"
            }}
          >
            シーケンス案
          </h3>

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

          <div className="col-xs-12">
            <nav>
              <div
                className="nav nav-tabs nav-fill"
                id="nav-tab"
                role="tablist"
              >
                <div
                  className={
                    this.state.global_tab === "preset"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ global_tab: "preset" })}
                >
                  プリセット
                </div>
                <div
                  className={
                    this.state.global_tab === "original"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ global_tab: "original" })}
                >
                  オリジナル
                </div>
              </div>
            </nav>
            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
              <div
                role="tabpanel"
                style={{
                  display: this.state.global_tab === "preset" ? "block" : "none"
                }}
              >
                <select
                  className="form-control"
                  value={this.state.layer1_index}
                  onChange={e => {
                    this.global.value = null;
                    this.setState({
                      layer1_index: e.target.value,
                      globalimg: "",
                      global_url: ""
                    });
                  }}
                >
                  <option value="0">地球データを選ぶ</option>
                  {allGlobalChoices}
                </select>
              </div>
              <div
                role="tabpanel"
                style={{
                  display:
                    this.state.global_tab === "original" ? "block" : "none"
                }}
              >
                <input
                  ref={node => {
                    this.global = node;
                  }}
                  type="file"
                  name="pic"
                  accept="image/*"
                  data-toggle="tooltip"
                  title="画像ファイルの大きさは横1024px縦512pxが推奨です"
                  onChange={e => {
                    var file = e.target.files[0];
                    var global_url = window.URL.createObjectURL(file);
                    this.setState({
                      globalimg: file,
                      global_url,
                      layer1_index: 0
                    });
                  }}
                />
                <br />
                <img
                  alt="upload preview"
                  src={this.state.global_url}
                  width="50%"
                  style={{
                    display: this.state.global_url === "" ? "none" : "block",
                    marginTop: 10
                  }}
                />
              </div>
            </div>
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
                    this.state.local_tab === "text"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ local_tab: "text" })}
                >
                  説明テキスト
                </div>
                <div
                  className={
                    this.state.local_tab === "img"
                      ? "nav-item nav-link active"
                      : "nav-item nav-link"
                  }
                  role="tab"
                  onClick={() => this.setState({ local_tab: "img" })}
                >
                  説明画像
                </div>
              </div>
            </nav>
            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
              <div
                role="tabpanel"
                style={{
                  display: this.state.local_tab === "text" ? "block" : "none"
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
                      img_url: ""
                    });
                  }}
                  maxLength="1000"
                />
              </div>
              <div
                role="tabpanel"
                style={{
                  display: this.state.local_tab === "img" ? "block" : "none"
                }}
              >
                <input
                  ref={node => {
                    this.file = node;
                  }}
                  type="file"
                  name="pic"
                  accept="image/*"
                  data-toggle="tooltip"
                  title="画像ファイルの大きさは横1024px縦576pxが推奨です"
                  onChange={e => {
                    var file = e.target.files[0];
                    var img_url = window.URL.createObjectURL(file);
                    this.setState({ localimg: file, img_url, localtext: "" });
                  }}
                />
                <br />
                <img
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
              <label>表示時間(秒)</label>
              <input
                style={{ width: "20%" }}
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
          <ProgressModal isOpen={this.state.is_sumbitting} />
        </form>
      </div>
    );
  }
}

export default AddSequence;
