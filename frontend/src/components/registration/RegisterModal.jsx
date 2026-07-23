import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function RegisterModal({
    show,
    handleClose,
    selectedEvent,
    handleRegister
}) {

    if (!selectedEvent) return null;

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>
                    Register for Event
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <h4>{selectedEvent.title}</h4>

                <hr />

                <p>
                    <strong>Date :</strong> {selectedEvent.date}
                </p>

                <p>
                    <strong>Venue :</strong> {selectedEvent.venue}
                </p>

                <p>
                    {selectedEvent.description}
                </p>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="success"
                    onClick={handleRegister}
                >
                    Confirm Registration
                </Button>

            </Modal.Footer>

        </Modal>

    );
}

export default RegisterModal;