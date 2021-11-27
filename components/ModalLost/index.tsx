import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import style from "./ModalLost.module.scss";

interface PropsType {
  show: boolean;
  onHide: () => void;
}
function ModalLost({ show, onHide }: PropsType) {
  return (
    <Modal
      show={show}
      size="lg"
      className={`${style.ModalLost}`}
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}
      centered
    >
      <Modal.Header>
        <button className="btn default" onClick={onHide}>
          <img src="/images/Close.svg" />
        </button>
      </Modal.Header>
      <Modal.Body className={`${style.Container}`}>
        <p className={`${style.Description}`}>فرصت امروز شما تمام شده است</p>
        <p className={`${style.Description}`}>
          می توانید فردا مجددا در مسابقه شرکت کنید.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className={`${style.SubmitButton}`} onClick={onHide}>
          بسیار خوب
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLost;
