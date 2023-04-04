import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: asin,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setComment((prevComment) => ({
      ...prevComment,
      elementId: asin,
    }));
  }, [asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMWViZTBlNzg3MDAwMTRkODkzMDAiLCJpYXQiOjE2ODA2MTMwNTQsImV4cCI6MTY4MTgyMjY1NH0.ydpq6dP9FLtTdyl2yZcM1MlmkHkT0kc6PWo_WIQGloQ",
          },
        }
      );
      if (response.ok) {
        alert("Recensione aggiunta!");
        setComment({
          comment: "",
          rate: 1,
          elementId: asin,
        });
        setShowModal(false);
        //  per navigare all'URL corrente
        window.history.replaceState(
          null,
          null,
          window.location.pathname + window.location.search
        );
      } else {
        console.log("error");
        alert("Qualcosa è andato storto");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="my-3">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Aggiungi recensione
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lascia il tuo parere</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendComment}>
            <Form.Group>
              <Form.Label>Scrivi testo</Form.Label>
              <Form.Control
                type="text"
                placeholder="lascia una recensione..."
                value={comment.comment}
                onChange={(e) =>
                  setComment((prevComment) => ({
                    ...prevComment,
                    comment: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Voto</Form.Label>
              <Form.Control
                as="select"
                value={comment.rate}
                onChange={(e) =>
                  setComment((prevComment) => ({
                    ...prevComment,
                    rate: e.target.value,
                  }))
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Aggiungi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddComment;
