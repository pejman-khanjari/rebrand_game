import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from "./ModalWin.module.scss";
import Container from "react-bootstrap/Container";
import Button from "../Button";

interface PropsType {
  show: boolean;
  onHide: () => void;
  submitForm: (phone: string) => void;
}

function ModalWin({ show, onHide, submitForm }: PropsType) {
  const [mobile, setMobile] = useState<string>('');

  return (
    <Modal
      show={show}
      size="lg"
      className={`${style.ModalWin}`}
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}
      centered
    >
      <Modal.Header>
        <Button variant="primary" onClick={onHide} className={style.CloseButton}>
          <img src="/images/Close.svg" />
        </Button>
      </Modal.Header>
      <Modal.Body className={style.Container}>
        <Container>
          <Row className={"justify-content-center"}>
            <Col sm={11} lg={7}>
              <div className={style.Banner}>
                <img src="/images/ribbon.svg" />
                <p className={`${style.Description}`}>تبریک</p>
              </div>
              <p className={style.Title}>
                <span> جواب درست</span>
                <b className={style.Brand}>لندو</b>
                می باشد.
              </p>
              <p className={style.Subtitle}>
                جهت شرکت در قرعه کشی، شماره همرا تلفن خور را وارد کنید.
              </p>

              <div>
                <Form>
                  <Form.Group className={` mb-3`} controlId="formBasicEmail">
                    <Form.Control
                      className={style.input}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className={style.SubmitButton} onClick={() => submitForm(mobile)}>
          ثبت شماره تلفن شما
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWin;
