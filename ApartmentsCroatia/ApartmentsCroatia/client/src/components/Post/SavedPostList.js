import React, { useEffect, useState, Fragment } from "react";
import {
  getUsersSavedPosts,
} from "../../api/user";
import { getLocalStorage } from "../../helpers/localStorage";
require("./../../styles/UserDetails.css");

const SavedPostList = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (getLocalStorage("user")) {
      setLoggedInUserId(getLocalStorage("user")._id);
      getUsersSavedPosts(getLocalStorage("user")._id).then((response) => {
        setSavedPosts(response.data);
      });
    }
  }, []);

  return (
    <Fragment>
      <section className="vh-100 mt-5">
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-9">
              <div
                className="card"
                style={{ borderRadius: "30px", backgroundColor: "white" }}
              >
                <div className="card-body">
                  <div className="d-flex text-black">
                    <div
                      className="flex-grow-1 ms-32 ml-2"
                      style={{ width: "70%" }}
                    >
                      <div
                        className="d-flex justify-content-center rounded-3 p-1 pt-2"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#3277a8",
                        }}
                      >
                        <h3 className="text-dark">Saved Posts</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-5">
                  <div className="row" id="grid">
                    {savedPosts.map((p) => (
                      <div className="col-md-4 p-0">
                        <a href={`/postFeed/${loggedInUserId}/${p._id}`}>
                          <img
                            src={`/uploads/${p.image}`}
                            className="img-responsive"
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SavedPostList;
