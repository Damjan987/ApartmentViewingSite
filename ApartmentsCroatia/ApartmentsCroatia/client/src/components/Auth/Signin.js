import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signin } from "../../api/auth";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import { useHistory } from "react-router-dom";
require("./../../styles/Auth.css");

const Signin = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push(`/postFeed/${isAuthenticated()._id}`);
    }
  }, [history]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push("/admin/dashboard");
          } else {
            history.push(`/postFeed/${isAuthenticated()._id}`);
          }
        })
        .catch((err) => {
          console.log("Signin api function error: ", err);
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
          style={{ borderRadius: "5%" }}
        >
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <h2 className="pl-3 pb-1" style={{ color: "#3277a8" }}>
              Sign In
            </h2>
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
            {/* password */}
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                value={password}
                className="form-control"
                placeholder="Password"
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
                Sign In
              </button>
            </div>
            {/* already have an account */}
            <p className="text-center text-white">
              Don't have an account? <a href="/signup">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
