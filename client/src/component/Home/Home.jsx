import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllBlog } from "../../redux/actions/blogAction";
import { Container, Card, Row, Col } from "react-bootstrap";
import Style from "./Home.module.css";

const Home = props => {
  useEffect(() => {
    props.listAllBlogs();
  }, []);
  const { blogList } = props;

  return (
    <Container fluid className="section-padding">
      <div className={`${Style.blogGrid}`}>
        {blogList.map(blog => (
          <figure className={`${Style.blogCard}`}>
            <Card className="shadow-lg">
              <Card.Img variant="top" src={blog.image} />

              <Card.Body>
                <span className="h6 fw-200 text-mute">
                  by shufflehound November 23, 2016
                </span>
                <Card.Title>Trip that you’ll never ever forget</Card.Title>
                <Card.Text>
                  Quisque dictum eros nisl, a maximus massa accumsan non.
                  Aliquam erat volutpat. Quisque at finibus dui. Praesent…
                </Card.Text>
                <div className="post-meta post-meta-two">
                  <div className="sh-columns post-meta-comments">
                    <span className="post-meta-categories">
                      <i className="icon-tag"></i>
                      <a
                        href="https://jevelin.shufflehound.com/blog1/category/people/"
                        rel="category tag"
                      >
                        People
                      </a>
                      ,{" "}
                      <a
                        href="https://jevelin.shufflehound.com/blog1/category/travel/"
                        rel="category tag"
                      >
                        Travel
                      </a>{" "}
                    </span>

                    <a
                      href="https://jevelin.shufflehound.com/blog1/2016/11/23/trip-that-youll-never-forget/#comments"
                      className="post-meta-comments"
                    >
                      <i className="icon icon-bubble"></i>0{" "}
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </figure>
        ))}
      </div>
    </Container>
  );
};
const mapStateToProps = state => ({
  blogList: state.blogReducer.data
});
const mapDispatchToProps = dispatch => ({
  listAllBlogs: () => dispatch(fetchAllBlog())
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
