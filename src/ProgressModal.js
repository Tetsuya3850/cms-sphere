import React, { Component } from "react";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import Loader from "./Loader/Loader";

class ProgressModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} style={styles}>
          <div
            className="modal-content"
            style={{
              border: "none",
              backgroundColor: "transparent"
            }}
          >
            <div className="modal-body">
              <Loader />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Modal.setAppElement("#root");

const styles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%)",
    padding: "0",
    border: "none",
    backgroundColor: "transparent"
  }
};

export default withRouter(ProgressModal);
