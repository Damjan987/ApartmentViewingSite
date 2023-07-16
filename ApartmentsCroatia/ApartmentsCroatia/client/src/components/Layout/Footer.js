import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { getLocalStorage } from "../../helpers/localStorage";

const Footer = () => {
  return (
    <footer
      className="fixed-bottom text-center text-black pt-2 pb-2"
      style={{ backgroundColor: "#3277a8" }}
    >
      <div className="container">
        <section>
          <div className="row">
            {!getLocalStorage("user") ? (
              <Fragment>
                <div className="col col-md-4 mb-md-0"></div>
                <div className="col col-md-4 mb-md-0">
                  <a href={`/user`}>
                    <button type="button" className="btn btn-info w-100">
                      <span className="bi bi-plus"></span> Search
                    </button>
                  </a>
                </div>
                <div className="col col-md-12 mb-md-0"></div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="col col-md-4 mb-md-0">
                  <a href={`/post/create`}>
                    <button type="button" className="btn btn-info w-100">
                      <span className="bi bi-plus"></span> + New Post
                    </button>
                  </a>
                </div>
                <div className="col col-md-4 mb-md-0">
                  <a href={`/user/${getLocalStorage("user")._id}`}>
                    <button type="button" className="btn btn-info w-100">
                      <span className="bi bi-plus"></span> ⌂ My Profile
                    </button>
                  </a>
                </div>
                <div className="col col-md-4 mb-md-0">
                  <a href={`/user`}>
                    <button type="button" className="btn btn-info w-100">
                      <span className="bi bi-plus"></span> Search
                    </button>
                  </a>
                </div>
              </Fragment>
            )}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
