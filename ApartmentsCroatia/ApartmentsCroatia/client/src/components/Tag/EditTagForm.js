import React, { useEffect, useState } from "react";
import { getTag, updateTag } from "../../api/tag";
require("./../../styles/Auth.css");

const EditTagForm = (props) => {
  const tagId = props.match.params.tagId;
  const [tag, setTag] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getTag(tagId).then((response) => {
      setTag(response.data);
      setName(response.data.name);
    });
  }, [tagId]);

  const handleImage = (evt) => {
    setImage(evt.target.files[0]);
  };

  const submitTagData = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    updateTag(tagId, formData);
  };

  return (
    <div className="signup-container bg-white">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto align-self-center bg-dark pt-2 pb-2"
          style={{ borderRadius: "3%" }}
        >
          <form className="signup-form" onSubmit={submitTagData}>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Edit Tag
            </h2>
            <div className="col-sm-15">
              <input
                type="text"
                placeholder="Tag name"
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
                  Upload a new tag image
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

export default EditTagForm;
