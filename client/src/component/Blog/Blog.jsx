import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getBlogById } from "../../redux/actions/blogAction";
import {
  getCommentByBlog,
  addComment
} from "../../redux/actions/commentAction";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Media,
  Form,
  Button
} from "react-bootstrap";
import Loader from "../Common/Loader";

const Blog = props => {
  const userComment = useRef(null);
  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      comment: userComment.current.value,
      blog_id: props.blogContent._id,
      user_id: props.uid
    };
    props.addNewComment(data);
  };

  useEffect(() => {
    const {
      match: { params }
    } = props;
    props.getBlog(params.id);
  }, [props.comments]);

  const { isLoading, blogContent, comments } = props;

  return isLoading ? (
    <Loader />
  ) : (
    <Container className="section-padding">
      <Row>
        <Col lg={9}>
          <h3 className="h1 fw-500 text-secondary">{blogContent.blog_title}</h3>
          <p className="lead">by {blogContent.username}</p>
          <hr />
          <p>Posted on {blogContent.published_on}</p>
          <hr />
          <Image
            className="img-fluid rounded"
            src={blogContent.image}
            alt="blog-image"
          />
          <hr />

          <p className="lead">{blogContent.blog}</p>

          <hr />

          <Card className="my-3">
            <h5 className="card-header">Leave a Comment:</h5>
            <Card.Body>
              <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    size="lg"
                    rows="4"
                    placeholder="Add your comment here !!!"
                    ref={userComment}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-dark"
                  size="xs"
                  className="float-right"
                >
                  Add Comment
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {comments.map(comment => (
            <Media key={comment._id} className="my-2">
              <Image
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt="avatar"
              />
              <Media.Body>
                <h5 className="my-0">{comment.username}</h5>
                {comment.comment}
              </Media.Body>
            </Media>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoading: state.blogReducer.isLoading,
  error: state.blogReducer.error,
  response: state.blogReducer.response,
  blogContent: state.blogReducer.blog,
  comments: state.commentReducer.blogComments,
  uid: state.authReducer.uid
});
const mapDispatchToProps = dispatch => ({
  getBlog: id => dispatch(getBlogById(id)),
  getComment: id => dispatch(getCommentByBlog(id)),
  addNewComment: data => dispatch(addComment(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
