import React, { useState, useEffect } from "react";
import { createLocation } from "../../api/location";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";

const CreateLocationForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [locationData, setLocationData] = useState({
    locationName: "",
    locationImage: null,
  });

  const { locationName, locationImage } = locationData;

  useEffect(() => {});

  const handleLocationImage = (evt) => {
    setLocationData({
      ...locationData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleLocationChange = (evt) => {
    setLocationData({
      ...locationData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleLocationSubmit = (evt) => {
    evt.preventDefault();

    if (locationImage === null) {
      setErrorMsg("Please select an image");
    } else {
      // success
      let formData = new FormData();

      formData.append("locationName", locationName);
      formData.append("locationImage", locationImage);

      createLocation(formData)
        .then((response) => {
          setLocationData({
            locationName: "",
            locationImage: null,
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
          <form className="signup-form" onSubmit={handleLocationSubmit}>
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
                name="locationImage"
                onChange={handleLocationImage}
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
                name="locationName"
                className="form-control"
                placeholder="Name"
                type="text"
                onChange={handleLocationChange}
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

export default CreateLocationForm;
