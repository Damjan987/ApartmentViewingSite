import React, { useEffect, useState } from "react";
import { getType, updateType } from "../../api/type";
require("./../../styles/Auth.css");

const EditTypeForm = (props) => {
  const typeId = props.match.params.typeId;
  const [type, setType] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getType(typeId).then((response) => {
      setType(response.data);
      setName(response.data.name);
    });
  }, [typeId]);

  const handleImage = (evt) => {
    setImage(evt.target.files[0]);
  };

  const submitTypeData = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    updateType(typeId, formData);
  };

  return (
    <div className="signup-container bg-white">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto bg-dark align-self-center pt-2 pb-2"
          style={{ borderRadius: "4%" }}
        >
          <form className="signup-form" onSubmit={submitTypeData}>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Edit Type
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
                  Upload a new type image
                </label>
              </div>

              <div className="form-group mt-2">
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

export default EditTypeForm;
