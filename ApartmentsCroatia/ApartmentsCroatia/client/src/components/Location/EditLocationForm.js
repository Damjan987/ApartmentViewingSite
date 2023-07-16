import React, { useEffect, useState } from "react";
import { getLocation, updateLocation } from "../../api/location";
require("./../../styles/Auth.css");

const EditLocationForm = (props) => {
  const locationId = props.match.params.locationId;
  const [location, setLocation] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getLocation(locationId).then((response) => {
      setLocation(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
    });
  }, [locationId]);

  const handleImage = (evt) => {
    setImage(evt.target.files[0]);
  };

  const submitLocationData = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    updateLocation(locationId, formData);
  };

  return (
    <div className="signup-container bg-white">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto align-self-center bg-dark pt-2 pb-2"
          style={{ borderRadius: "3%" }}
        >
          <form className="signup-form" onSubmit={submitLocationData}>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Edit Location
            </h2>
            <div className="col-sm-15">
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-3"
                name="name"
                value={name}
                onChange={(evt) => {
                  setName(evt.target.value);
                }}
              />

              <div
                className="form-group custom-file mb-3"
                style={{ boxShadow: "2.5px 2.5px 7px lightblue" }}
              >
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  type="file"
                  className="custom-file-input"
                  name="image"
                  onChange={handleImage}
                />
                <label className="custom-file-label">
                  Upload a new location image
                </label>
              </div>

              <textarea
                type="text"
                placeholder="Description"
                className="form-control"
                name="description"
                value={description}
                rows="3"
                onChange={(evt) => {
                  setDescription(evt.target.value);
                }}
              />

              <div className="form-group mt-4">
                <button
                  type="submit"
                  className="btn btn-block"
                  style={{ backgroundColor: "#3277a8" }}
                >
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

export default EditLocationForm;
