import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signup } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";
require("./../../styles/Auth.css");

const Signup = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    contact: "",
    birthday: new Date(),
    gender: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    firstname,
    lastname,
    username,
    email,
    contact,
    birthday,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const {
        firstname,
        lastname,
        username,
        email,
        contact,
        birthday,
        gender,
        password,
      } = formData;
      const data = {
        firstname,
        lastname,
        username,
        email,
        contact,
        birthday,
        gender,
        password,
      };

      setFormData({
        ...formData,
        loading: true,
      });

      signup(data)
        .then((response) => {
          setFormData({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            contact: "",
            birthday: new Date(),
            gender: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div className="signup-container bg-white">
      <div className="row px-3 vh-100">
        <div
          className="col-md-5 mx-auto align-self-center bg-dark"
          style={{ borderRadius: "5%", paddingTop: "4rem", paddingBottom: "4rem" }}
        >
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Sign Up
            </h2>
            {/* firstname */}
            <div className="form-group">
              <label>Firstname</label>
              <input
                name="firstname"
                value={firstname}
                className="form-control"
                placeholder="Firstname"
                type="text"
                onChange={handleChange}
              />
            </div>
            {/* lastname */}
            <div className="form-group">
              <label>Lastname</label>
              <input
                name="lastname"
                value={lastname}
                className="form-control"
                placeholder="Lastname"
                type="text"
                onChange={handleChange}
              />
            </div>
            {/* username */}
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                value={username}
                className="form-control"
                placeholder="Username"
                type="text"
                onChange={handleChange}
              />
            </div>
            {/* email */}
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={email}
                className="form-control"
                placeholder="Email address"
                type="email"
                onChange={handleChange}
              />
            </div>
            {/* contact */}
            <div className="form-group">
              <label>Contact</label>
              <input
                name="contact"
                value={contact}
                className="form-control"
                placeholder="Contact"
                type="text"
                onChange={handleChange}
              />
            </div>
            {/* gender */}
            <div className="form-group">
              <label>Gender</label>
              <select
                className="custom-select mr-sm-2"
                name="gender"
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* birthday */}
            <div className="form-group">
              <label>Birthday</label>
              <input
                className="form-control"
                type="date"
                name="birthday"
                value={birthday}
                onChange={handleChange}
              />
            </div>
            {/* password */}
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                value={password}
                className="form-control"
                placeholder="Create password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {/* password2 */}
            <div className="form-group">
              <label>Confirm password</label>
              <input
                name="password2"
                value={password2}
                className="form-control"
                placeholder="Confirm password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {/* signup button */}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                style={{ backgroundColor: "#3277a8" }}
              >
                Sign Up
              </button>
            </div>
            {/* already have an account */}
            <p className="text-center text-white">
              Have an account? <a href="/signin">Log In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
