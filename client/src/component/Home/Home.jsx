import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllBlog } from "../../redux/actions/blogAction";
import { Container, Card } from "react-bootstrap";
import Style from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = props => {
  useEffect(() => {
    props.listAllBlogs();
  }, []);
  const { blogList } = props;

  return (
    <Container fluid className="section-padding">
      <div className={Style.blogGrid}>
        {blogList.map(blog => (
          <figure key={blog._id} className={Style.blogCard}>
            <Card className="shadow-lg">
              <Card.Img variant="top" src={blog.image} alt="blog-image" />

              <Card.Body>
                <span className="h6 fw-200 text-mute">
                  by {blog.username} on {blog.published_on}
                </span>
                <Link
                  to={`/blog/view/${blog.category_id}/${blog.user_id}/${blog._id}`}
                >
                  <Card.Title>{blog.blog_title}</Card.Title>
                </Link>
                <Card.Text>{blog.blog}</Card.Text>
                <div className={Style.blogInfo}>
                  <span className="fw-700">{blog.category_name}</span>

                  <a href="#" className={Style.blogComment}>
                    <i className="fas fa-comments"></i>&nbsp;
                    {blog.comment_count}
                  </a>
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
