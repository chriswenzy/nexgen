import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
const DelegationConfirmModal = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Complete Property Listing{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <small>
              Complete the Property Listing, Add all the details to showcase the
              property exactly the way you want, for the Property to be approved
            </small>
          </div>

          <div>
            <Row>
              <Col md={6}>
                <Button
                  // onClick={() => props.onHide()}
                  variant="light"
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
              <Col md={6}>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 shadow bg-orange text-white"
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default DelegationConfirmModal;
