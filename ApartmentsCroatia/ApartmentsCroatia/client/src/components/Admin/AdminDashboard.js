import React, { useState, useEffect, Fragment } from "react";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { createLocation, getLocations, deleteLocation } from "../../api/location";
import { createTag, getTags, deleteTag } from "../../api/tag";
import { createType, getTypes, deleteType } from "../../api/type";

const AdminDashboard = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [locations, setLocations] = useState(null);
  const [tags, setTags] = useState(null);
  const [types, setTypes] = useState(null);

  const [location, setLocation] = useState({
    locationName: "",
    locationImage: null,
    locationDescription: "",
  });
  const [tag, setTag] = useState({
    tagName: "",
    tagImage: null,
  });
  const [type, setType] = useState({
    typeName: "",
    typeImage: null,
  });

  const { locationName, locationImage, locationDescription } = location;
  const { tagName, tagImage } = tag;
  const { typeName, typeImage } = type;

  useEffect(() => {
    loadLocations();
    loadTags();
    loadTypes();
  }, [loading]);

  function sortOn(property) {
    return function (a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  const handleMessages = (evt) => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  // *************************************************************
  // ******************** LOCATION METHODS ***********************
  // *************************************************************

  const loadLocations = async () => {
    await getLocations()
      .then((response) => {
        setLocations(response.data.locations.sort(sortOn("name")));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLocationChange = (evt) => {
    setErrorMsg("");
    setSuccessMsg("");
    setLocation({
      ...location,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleLocationImage = (evt) => {
    setLocation({
      ...location,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleLocationSubmit = (evt) => {
    evt.preventDefault();

    if (locationImage === null) {
      setErrorMsg("Please select an image");
    } else if (isEmpty(locationName) || isEmpty(locationDescription)) {
      setErrorMsg("All fields are required");
    } else {
      // success
      let formData = new FormData();

      formData.append("locationName", locationName);
      formData.append("locationImage", locationImage);
      formData.append("locationDescription", locationDescription);

      createLocation(formData)
        .then((response) => {
          setLocation({
            locationName: "",
            locationImage: null,
            locationDescription: "",
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  // *************************************************************
  // ************************ TAG METHODS ************************
  // *************************************************************

  const loadTags = async () => {
    await getTags()
      .then((response) => {
        setTags(response.data.tags.sort(sortOn("name")));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTagChange = (evt) => {
    setTag({
      ...tag,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTagImage = (evt) => {
    setTag({
      ...tag,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleTagSubmit = (evt) => {
    evt.preventDefault();

    if (tagImage === null) {
      setErrorMsg("Please select an image");
    } else if (isEmpty(tagName)) {
      setErrorMsg("All fields are required");
    } else {
      // success
      let formData = new FormData();

      formData.append("tagName", tagName);
      formData.append("tagImage", tagImage);

      createTag(formData)
        .then((response) => {
          setTag({
            tagName: "",
            tagImage: null,
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  // *************************************************************
  // *********************** TYPE METHODS ************************
  // *************************************************************

  const loadTypes = async () => {
    await getTypes()
      .then((response) => {
        setTypes(response.data.types.sort(sortOn("name")));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTypeChange = (evt) => {
    setType({
      ...type,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTypeImage = (evt) => {
    setType({
      ...type,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleTypeSubmit = (evt) => {
    evt.preventDefault();

    if (typeImage === null) {
      setErrorMsg("Please select an image");
    } else if (isEmpty(typeName)) {
      setErrorMsg("All fields are required");
    } else {
      // success
      let formData = new FormData();

      formData.append("typeName", typeName);
      formData.append("typeImage", typeImage);

      createType(formData)
        .then((response) => {
          setType({
            typeName: "",
            typeImage: null,
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  return (
    <section>
      <div className="bg-dark pb-2 pt-4" style={{ marginTop: "4rem" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 pt-1">
              <h1>
                <i className="fas fa-home text-primary"> Admin Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light">
        <div className="container">
          <div className="row pb-2 pt-2">
            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-primary btn-block border border-primary"
                data-toggle="modal"
                data-target="#addLocationModal"
              >
                <i className="fas fa-plus">+ Add Location</i>
              </button>
            </div>

            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-info btn-block border border-info"
                data-toggle="modal"
                data-target="#addTagModal"
              >
                <i className="fas fa-plus">+ Add Tag</i>
              </button>
            </div>

            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-success btn-block border border-success"
                data-toggle="modal"
                data-target="#addTypeModal"
              >
                <i className="fas fa-plus">+ Add Type</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="addLocationModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleLocationSubmit}>
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Location</h5>
                <button className="close" data-dismiss="modal">
                  <span>X</span>
                </button>
              </div>
              <div className="modal-body my-2">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}

                {loading ? (
                  <div className="text-secondary">{showLoading()}</div>
                ) : (
                  <Fragment>
                    <div className="custom-file" mb-2>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="locationImage"
                        onChange={handleLocationImage}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="locationName"
                        onChange={handleLocationChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="locationDescription"
                        onChange={handleLocationChange}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="addTagModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleTagSubmit}>
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Add Tag</h5>
                <button className="close" data-dismiss="modal">
                  <span>X</span>
                </button>
              </div>
              <div className="modal-body my-2">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}

                {loading ? (
                  <div className="text-secondary">{showLoading()}</div>
                ) : (
                  <Fragment>
                    <div className="custom-file" mb-2>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="tagImage"
                        onChange={handleTagImage}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tagName"
                        onChange={handleTagChange}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-info text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="addTypeModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleTypeSubmit}>
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Add Type</h5>
                <button className="close" data-dismiss="modal">
                  <span>X</span>
                </button>
              </div>
              <div className="modal-body my-2">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}

                {loading ? (
                  <div className="text-secondary">{showLoading()}</div>
                ) : (
                  <Fragment>
                    <div className="custom-file" mb-2>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="typeImage"
                        onChange={handleTypeImage}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="typeName"
                        onChange={handleTypeChange}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-success text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <ul className="list-group">
            <li className="list-group-item active">Locations</li>
            {locations &&
              locations.map((l) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={l._id}
                  value={l._id}
                >
                  {l.name}
                  <div className="col-6">
                    <a href={`/location/${l._id}`}>
                      <li className="badge badge-primary badge-pill">
                        Details
                      </li>
                    </a>
                    <a href={`/location/edit/${l._id}`}>
                      <li className="badge badge-primary badge-pill">Edit</li>
                    </a>
                    <li
                      className="badge badge-primary badge-pill"
                      onClick={() => deleteLocation(l._id)}
                    >
                      Delete
                    </li>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-4">
          <ul className="list-group">
            <li className="list-group-item bg-info">Tags</li>
            {tags &&
              tags.map((t) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={t._id}
                  value={t._id}
                >
                  {t.name}
                  <div className="col-6">
                    <a href={`/tag/${t._id}`}>
                      <li className="badge badge-primary badge-pill">
                        Details
                      </li>
                    </a>
                    <a href={`/tag/edit/${t._id}`}>
                      <li className="badge badge-primary badge-pill">Edit</li>
                    </a>
                    <li
                      className="badge badge-primary badge-pill"
                      onClick={() => deleteTag(t._id)}
                    >
                      Delete
                    </li>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-4">
          <ul className="list-group">
            <li className="list-group-item bg-success">Types</li>
            {types &&
              types.map((t) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={t._id}
                  value={t._id}
                >
                  {t.name}
                  <div className="col-6">
                    <a href={`/type/${t._id}`}>
                      <li className="badge badge-primary badge-pill">
                        Details
                      </li>
                    </a>
                    <a href={`/type/edit/${t._id}`}>
                      <li className="badge badge-primary badge-pill">Edit</li>
                    </a>
                    <li
                      className="badge badge-primary badge-pill"
                      onClick={() => deleteType(t._id)}
                    >
                      Delete
                    </li>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
