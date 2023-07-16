import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  getUser,
  getUsersPostCount,
  getUsersPosts,
  banUser,
  unbanUser,
} from "../../api/user";
import { getLocalStorage } from "../../helpers/localStorage";
import { isAuthenticated } from "../../helpers/auth";
require("./../../styles/UserDetails.css");

const UserDetails = (props) => {
  const userId = props.match.params.userId;
  const [user, setUser] = useState({});
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [usersPosts, setUsersPosts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (getLocalStorage("user")) {
      setLoggedInUserId(getLocalStorage("user")._id);
      getUser(isAuthenticated()._id).then((response) => {
        setLoggedInUser(response.data);
      });
    }
    getUser(userId).then((response) => {
      setUser(response.data);
    });
    getUsersPostCount(userId).then((response) => {
      setNumOfPosts(response.data);
    });
    getUsersPosts(userId).then((response) => {
      setUsersPosts(response.data);
    });
  }, [userId]);

  const handleBanUserReq = async () => {
    banUser(userId);
    window.location.reload(true);
  };

  const handleUnbanUserReq = async () => {
    unbanUser(userId);
    window.location.reload(true);
  };

  const handleOpenPostDetails = (postId) => {
    history.push(`/post/${postId}`);
  };

  const openChat = () => {
    history.push(`/chat/${userId}/${undefined}`);
  };

  return (
    <section className="h-100 gradient-custom-2 mb-5">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#3277a8", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  {userId === loggedInUserId ? (
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: "1" }}
                    >
                      Edit profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: "1" }}
                    >
                      Send Message
                    </button>
                  )}
                </div>
                <div
                  className="ms-3"
                  style={{ marginTop: "8rem", marginLeft: "2rem" }}
                >
                  <p>{user.username}</p>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#000" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">{numOfPosts}</p>
                    <p className="small text-muted mb-0">Posts</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-white bg-dark">
                <div className="mb-4">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#343a40" }}>
                    <p className="font-italic mb-1">{user.notes}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="lead fw-normal mb-1">Contact</p>
                  <div
                    className="pl-4 pt-4 pr-4 pb-1"
                    style={{ backgroundColor: "#343a40" }}
                  >
                    <p className="font-italic mb-1">
                      <i className="text-info">Email:</i> {user.email}
                    </p>
                  </div>
                  <div
                    className="pl-4 pt-4 pr-4 pb-4"
                    style={{ backgroundColor: "#343a40" }}
                  >
                    <p className="font-italic mb-1">
                      <i className="text-info">Phone:</i> {user.contact}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">My properties</p>
                </div>
                <div className="col-md-12">
                  <div className="row" id="grid">
                    {usersPosts.map((post) => {
                      return (
                        <div className="col-md-6 p-2">
                          {/* <img
                            src={`/uploads/${post.images[0]}`}
                            className="w-100 rounded-3"
                            style={{ width: "100%", height: "14rem" }}
                            alt={post.name}
                          /> */}
                          <div className="card" style={{ width: "100%" }}>
                            <img
                              className="card-img-top"
                              src={`/uploads/${post.images[0]}`}
                              style={{ width: "100%", height: "13rem" }}
                              alt={post.name}
                              onClick={() => {
                                handleOpenPostDetails(post._id);
                              }}
                            />
                            <div className="card-body text-center bg-info">
                              <a href="#" className="card-link">
                                {post.name}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
