import React, { useState, useEffect } from "react";
import { createTag } from "../../api/tag";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";

const CreateTagForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [tagData, setTagData] = useState({
    tagName: "",
    tagImage: null,
  });

  const { tagName, tagImage } = tagData;

  useEffect(() => {});

  const handleTagImage = (evt) => {
    setTagData({
      ...tagData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleTagChange = (evt) => {
    setTagData({
      ...tagData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTagSubmit = (evt) => {
    evt.preventDefault();

    if (tagImage === null) {
      setErrorMsg("Please select an image");
    } else {
      // success
      let formData = new FormData();

      formData.append("tagName", tagName);
      formData.append("tagImage", tagImage);

      createTag(formData)
        .then((response) => {
          setTagData({
            tagName: "",
            tagImage: null,
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          <form className="signup-form" onSubmit={handleTagSubmit}>
            {/* image */}
            <div className="form-group custom-file mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="file"
                className="custom-file-input"
                name="tagImage"
                onChange={handleTagImage}
              />
              <label className="custom-file-label">Choose file</label>
            </div>

            {/* name */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                name="tagName"
                className="form-control"
                placeholder="Name"
                type="text"
                onChange={handleTagChange}
              />
            </div>

            {/* submit button */}
            <div className="form-group">
              <button type="submit" className="btn btn-warning btn-block">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTagForm;
