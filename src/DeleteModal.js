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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">本当に削除しますか？</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>一度削除したデータは取り戻せません。</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  try {
                    if (this.props.type === "scenario") {
                      var { data } = await deleteScenario(this.props.id);
                    } else {
                      var { data } = await deleteSequence(this.props.id);
                    }
                  } catch (e) {
                    console.log(e);
                    return;
                  }
                  if (data.result === "true") {
                    this.props.remove();
                    this.closeModal();
                  }
                }}
              >
                はい
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.closeModal}
              >
                いいえ
              </button>
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
    border: "none"
  }
};

export default withRouter(DeleteModal);
