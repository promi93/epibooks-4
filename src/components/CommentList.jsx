import { ListGroup, Container, Row, Col } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentList = ({ commentsToShow }) => (
  <Container className="mt-3">
    <Row>
      <Col>
        <ListGroup>
          {commentsToShow.map((comment) => (
            <SingleComment comment={comment} key={comment._id} />
          ))}
        </ListGroup>
      </Col>
    </Row>
  </Container>
);

export default CommentList;
