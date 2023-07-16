import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../../helpers/auth";
import { getLocalStorage } from "../../helpers/localStorage";

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push("/signin");
    });
  };

  const handleOpenSettings = (evt) => {
    history.push(`/settings/${getLocalStorage("user")._id}`);
  };

  const handleOpenSavedPostList = (evt) => {
    history.push(`/user/savedPosts`);
  };

  const handleOpenChatList = (evt) => {
    history.push(`/chats`);
  };

  const handleOpenAdminDashboard = (evt) => {
    history.push(`/admin/dashboard`);
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-fixed-top mb-0"
        style={{ backgroundColor: "#3277a8" }}
      >
        <a className="navbar-brand" href={`/home`}>
          Apartments Croatia
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/signup">
                    <i className="fas fa-edit"></i> Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/signin">
                    <i className="fas fa-sign-in-alt"></i> Signin
                  </a>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li className="nav-item">
                <button className="btn pl-0" onClick={handleOpenAdminDashboard}>
                  <i className="fas fa-signout-alt"></i> Dashboard
                </button>
              </li>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <button className="btn pl-0" onClick={handleOpenChatList}>
                    <i className="fas fa-signout-alt"></i> Chats
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn pl-0"
                    onClick={handleOpenSavedPostList}
                  >
                    <i className="fas fa-signout-alt"></i> Saved Posts
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn pl-0" onClick={handleOpenSettings}>
                    <i className="fas fa-signout-alt"></i> Settings
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn pl-0" onClick={handleLogout}>
                    <i className="fas fa-signout-alt"></i> Logout
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Header);
