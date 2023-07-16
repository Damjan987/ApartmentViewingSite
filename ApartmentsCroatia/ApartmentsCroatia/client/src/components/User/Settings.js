import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../../api/user";
require("./../../styles/Auth.css");

const Settings = (props) => {
  const userId = props.match.params.userId;
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getUser(userId).then((response) => {
      setUser(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setUsername(response.data.username);
      setContact(response.data.contact);
      setNotes(response.data.notes);
    });
  }, [userId]);

  const handleProfileImage = (evt) => {
    setProfileImage(evt.target.files[0]);
  };

  const submitUserData = () => {
    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("contact", contact);
    formData.append("notes", notes);
    formData.append("profileImage", profileImage);
    updateUser(userId, formData);
  };

  return (
    <div className="signup-container bg-white">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto align-self-center bg-dark"
          style={{ borderRadius: "3%", paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          {!user.isBanned ? (
            <form className="signup-form" onSubmit={submitUserData}>
              <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
                Settings
              </h2>
              <div className="col-sm-15">
                <label>Firstname</label>
                <input
                  type="text"
                  placeholder="Firstname"
                  className="form-control mb-3"
                  name="firstname"
                  value={firstname}
                  onChange={(evt) => {
                    setFirstname(evt.target.value);
                  }}
                />

                <label>Lastname</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  className="form-control mb-3"
                  name="lastname"
                  value={lastname}
                  onChange={(evt) => {
                    setLastname(evt.target.value);
                  }}
                />

                <label>Username</label>
                <input
                  type="text"
                  placeholder="New Username"
                  className="form-control mb-3"
                  name="username"
                  value={username}
                  onChange={(evt) => {
                    setUsername(evt.target.value);
                  }}
                />

                <label>Contact</label>
                <input
                  type="text"
                  placeholder="Contact"
                  className="form-control mb-3"
                  name="contact"
                  value={contact}
                  onChange={(evt) => {
                    setContact(evt.target.value);
                  }}
                />

                <div className="form-group custom-file mb-3" style={{ boxShadow: "2.5px 2.5px 7px lightblue" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="file"
                    className="custom-file-input"
                    name="profileImage"
                    onChange={handleProfileImage}
                  />
                  <label className="custom-file-label">
                    Upload new profile picture
                  </label>
                </div>

                <label>Notes</label>
                <textarea
                  type="text"
                  placeholder="Notes"
                  className="form-control"
                  name="notes"
                  value={notes}
                  rows="3"
                  onChange={(evt) => {
                    setNotes(evt.target.value);
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
          ) : (
            <h1 className="text-warning">Your account is currently banned</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
