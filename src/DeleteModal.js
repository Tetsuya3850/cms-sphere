import React, { Component } from "react";
import Modal from "react-modal";
import { deleteSequence, deleteScenario } from "./api";
import { withRouter } from "react-router-dom";

class DeleteModal extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div>
        <div
          className="btn btn-danger"
          style={{ color: "white" }}
          onClick={this.openModal}
        >
          削除
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={styles}
        >
          <div style={innerStyles.container}>
            <p>本当に削除しますか？</p>
            <p onClick={this.closeModal} style={innerStyles.close}>
              X
            </p>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <div
              className="btn btn-danger"
              style={{ color: "white" }}
              onClick={() => {
                if (this.props.type === "scenario") {
                  deleteScenario(this.props.id);
                  this.props.remove();
                  this.closeModal();
                } else {
                  deleteSequence(this.props.id);
                  this.props.remove();
                  this.closeModal();
                }
              }}
            >
              削除
            </div>
          </form>
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
    right: "80%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%)"
  }
};

const innerStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  close: {
    cursor: "pointer"
  },
  text: {
    width: "100%",
    margin: "10px 0px",
    fontSize: "14px"
  }
};

export default withRouter(DeleteModal);
