import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addBlog } from "../../redux/actions/blogAction";
import { fetchAllcategory } from "../../redux/actions/categoryAction";
import { Container, Form, Button } from "react-bootstrap";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../Common/Loader";
import swal from "sweetalert";
import Style from "./Blog.module.css";

const AddBlog = props => {
  const [state, setstate] = useState({
    category_id: "",
    title: "",
    blog: ""
  });

  useEffect(() => {
    const { error, response, getAllCategory } = props;
    getAllCategory();
    if (response) {
      if (error) {
        swal({
          title: "Failure",
          text: response,
          icon: "warning",
          timer: 800,
          button: false
        });
      } else {
        swal({
          title: "Success",
          text: response,
          icon: "success",
          timer: 800,
          button: false
        }).then(() => {
          alert("aa");
        });
      }
    }
  }, [props.response]);

  const handleChange = e => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      category_id: state.category_id,
      title: state.title,
      blog: state.blog,
      user_id: props.uid
    };
    props.addNewBlog(data);
  };

  const { formLoading, categoryList } = props;
  return formLoading ? (
    <Loader />
  ) : (
    <Container className="section-padding">
      <Form
        onSubmit={e => handleSubmit(e)}
        className={Style.sectionForm}
        encType="multipart/form-data"
      >
        <Form.Group controlId="category">
          <Form.Label className="h3 fw-200">Select Category</Form.Label>
          <Form.Control
            as="select"
            name="category_id"
            size="lg"
            onChange={e => handleChange(e)}
          >
            <option key="0" value="" defaultValue>
              === Select Category ===
            </option>
            {categoryList.map(item => (
              <option key={item._id} value={item._id}>
                {item.category_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label className="h3 fw-200">Blog Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            size="lg"
            placeholder="Enter your blog title !!!"
            onChange={e => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label className="h3 fw-200">Blog Content</Form.Label>
          <Form.Control
            as="textarea"
            name="blog"
            size="lg"
            rows="8"
            placeholder="Write your blog here !!!"
            onChange={e => handleChange(e)}
          />
        </Form.Group>

        <hr />

        <Form.Group controlId="image">
          <Form.Label className="h3 fw-200">Upload Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            size="lg"
            onChange={e => handleChange(e)}
          />
        </Form.Group>

        {/* <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        /> */}

        <hr />
        <Form.Group>
          <Button
            type="submit"
            variant="outline-dark"
            size="lg"
            className="float-right"
          >
            Create
          </Button>
        </Form.Group>
        <div className="clear"></div>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => ({
  formLoading: state.blogReducer.formLoading,
  error: state.blogReducer.error,
  response: state.blogReducer.response,
  categoryList: state.categoryReducer.categories,
  uid: state.authReducer.uid
});
const mapDispatchToProps = dispatch => ({
  getAllCategory: () => dispatch(fetchAllcategory()),
  addNewBlog: data => dispatch(addBlog(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
