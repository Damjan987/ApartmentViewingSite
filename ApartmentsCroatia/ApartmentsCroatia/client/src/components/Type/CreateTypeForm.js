import React, { useState, useEffect } from "react";
import { createType } from "../../api/type";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";

const CreateTypeForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [typeData, setTypeData] = useState({
    typeName: "",
    typeImage: null,
  });

  const { typeName, typeImage } = typeData;

  useEffect(() => {});

  const handleTypeImage = (evt) => {
    setTypeData({
      ...typeData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleTypeChange = (evt) => {
    setTypeData({
      ...typeData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTypeSubmit = (evt) => {
    evt.preventDefault();

    if (typeImage === null) {
      setErrorMsg("Please select an image");
    } else {
      // success
      let formData = new FormData();

      formData.append("typeName", typeName);
      formData.append("typeImage", typeImage);

      createType(formData)
        .then((response) => {
          setTypeData({
            typeName: "",
            typeImage: null,
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
          <form className="signup-form" onSubmit={handleTypeSubmit}>
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
                name="typeImage"
                onChange={handleTypeImage}
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
                name="typeName"
                className="form-control"
                placeholder="Name"
                type="text"
                onChange={handleTypeChange}
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

export default CreateTypeForm;
