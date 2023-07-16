import React, { useEffect, useState } from "react";
import { getPost, updatePost } from "../../api/post";
require("./../../styles/Auth.css");

const EditPostForm = (props) => {
  const postId = props.match.params.postId;
  const [post, setPost] = useState({});
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPost(postId).then((response) => {
      setPost(response.data);
      setDescription(response.data.description);
      setLocation(response.data.location);
      setType(response.data.type);
    });
  }, [postId]);

  const handleImage = (evt) => {
    setImage(evt.target.files[0]);
  };

  const submitPostData = () => {
    let formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("type", type);
    updatePost(postId, formData);
  };

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          <form className="signup-form" onSubmit={submitPostData}>
            <h2 className="col-sm-2 text-warning">Edit post</h2>
            <div className="col-sm-10">
              <input
                type="text"
                placeholder="Location"
                className="form-control mb-3"
                name="location"
                value={location}
                onChange={(evt) => {
                  setLocation(evt.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Type"
                className="form-control mb-3"
                name="type"
                value={type}
                onChange={(evt) => {
                  setType(evt.target.value);
                }}
              />

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  type="text"
                  rows="3"
                  onChange={(evt) => {
                    setDescription(evt.target.value);
                  }}
                />
              </div>

              <br></br>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
