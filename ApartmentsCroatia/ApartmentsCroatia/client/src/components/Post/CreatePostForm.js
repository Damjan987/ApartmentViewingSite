import React, { useState, useEffect } from "react";
import _ from "lodash";
import { createPost } from "../../api/post";
import { getTypes } from "../../api/type";
import { getLocations } from "../../api/location";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { getLocalStorage } from "../../helpers/localStorage";
import { FaStar } from "react-icons/fa";
require("./../../styles/Auth.css");

const CreatePostForm = () => {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [hover, setHover] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [postData, setPostData] = useState({
    postName: "",
    postImages: [],
    postDescription: "",
    postLocation: "",
    postAddress: "",
    postType: "",
    postDayPrice: 0,
    postStars: 0,
    userId: null,
  });

  const {
    postName,
    postImages,
    postDescription,
    postLocation,
    postAddress,
    postType,
    postDayPrice,
    postStars,
  } = postData;

  useEffect(() => {
    getTypes().then((response) => {
      setTypes(response.data.types);
    });
    getLocations().then((response) => {
      setLocations(response.data.locations);
    });
  }, []);

  const handlePostImages = (e) => {
    // setPostData({
    //   ...postData,
    //   [evt.target.name]: evt.target.files,
    // });
    _.forEach(e.target.files, (file) => {
      postImages.push(file);
    });
  };

  const handlePostChange = (evt) => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handlePostSubmit = (evt) => {
    evt.preventDefault();

    if (postImages === null) {
      setErrorMsg("Please select an image");
    } else {
      // success
      let formData = new FormData();

      postImages.forEach((f) => {
        formData.append("postImages", f);
      });
      // formData.append("postImages", postImages);
      formData.append("postName", postName);
      formData.append("postDescription", postDescription);
      formData.append("postLocation", postLocation);
      formData.append("postAddress", postAddress);
      formData.append("postType", postType);
      formData.append("postDayPrice", postDayPrice);
      formData.append("postStars", postStars);
      formData.append("userId", getLocalStorage("user")._id);

      createPost(formData)
        .then((response) => {
          setPostData({
            postName: "",
            postImages: [],
            postDescription: "",
            postLocation: "",
            postAddress: "",
            postType: "",
            postDayPrice: 0,
            postStars: null,
            userId: null,
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  return (
    <div className="signup-container bg-white pt-3 pb-4 mb-5">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto align-self-center bg-dark pt-4 pb-2"
          style={{ borderRadius: "3%" }}
        >
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          <form className="signup-form" onSubmit={handlePostSubmit}>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Create new post
            </h2>
            {/* name */}
            <div className="form-group">
              <label>Name</label>
              <input
                name="postName"
                className="form-control"
                type="text"
                onChange={handlePostChange}
              />
            </div>

            {/* image */}
            <label>Choose images</label>
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
                multiple
                className="custom-file-input"
                name="postImages"
                onChange={handlePostImages}
              />
              <label className="custom-file-label">Choose files</label>
            </div>

            {/* location */}
            <label>Location</label>
            <div
              className="form-group"
              style={{ boxShadow: "2.5px 2.5px 7px lightblue" }}
            >
              <select
                className="custom-select mr-sm-2"
                name="postLocation"
                onChange={handlePostChange}
              >
                <option selected>Not Selected</option>
                {locations &&
                  locations.map((l) => {
                    return <option value={l._id}>{l.name}</option>;
                  })}
              </select>
            </div>

            {/* address */}
            <div className="form-group">
              <label>Address</label>
              <input
                name="postAddress"
                className="form-control"
                type="text"
                onChange={handlePostChange}
              />
            </div>

            {/* type */}
            <label>Type</label>
            <div
              className="form-group"
              style={{ boxShadow: "2.5px 2.5px 7px lightblue" }}
            >
              <select
                className="custom-select mr-sm-2"
                name="postType"
                onChange={handlePostChange}
              >
                <option selected>Not Selected</option>
                {types &&
                  types.map((t) => {
                    return <option value={t._id}>{t.name}</option>;
                  })}
              </select>
            </div>

            {/* day price */}
            <div className="form-group">
              <label>Day price (in Euros)</label>
              <input
                name="postDayPrice"
                className="form-control"
                type="number"
                onChange={handlePostChange}
                defaultValue={0}
                min="0"
              />
            </div>

            {/* stars */}
            <label>How many stars does your property have?</label>
            <br></br>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="postStars"
                    value={currentRating}
                    onChange={handlePostChange}
                  />
                  <FaStar
                    className="star"
                    size={40}
                    color={
                      currentRating <= (hover || postStars)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    name="postStars"
                    onChange={handlePostChange}
                  />
                </label>
              );
            })}

            {/* description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="postDescription"
                className="form-control"
                type="text"
                rows="3"
                onChange={handlePostChange}
              />
            </div>

            {/* submit button */}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                style={{ backgroundColor: "#3277a8" }}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
