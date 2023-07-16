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

  const openChat = () => {
    history.push(`/chat/${userId}/${undefined}`);
  };

  return (
    <section class="h-100 gradient-custom-2">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-9 col-xl-7">
            <div class="card">
              <div
                class="rounded-top text-white d-flex flex-row"
                style={{ "backgroundColor" : "#000", "height" : "200px" }}
              >
                <div class="ms-4 mt-5 d-flex flex-column" style={{ "width" : "150px" }}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    class="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ "width" : "150px", "zIndex" : "1" }}
                  />
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    data-mdb-ripple-color="dark"
                    style={{"zIndex" : "1"}}
                  >
                    Edit profile
                  </button>
                </div>
                <div class="ms-3" style={{ "marginTop" : "130px" }}>
                  <h5>Andy Horwitz</h5>
                  <p>New York</p>
                </div>
              </div>
              <div class="p-4 text-black" style={{ "backgroundColor" : "#f8f9fa" }}>
                <div class="d-flex justify-content-end text-center py-1">
                  <div>
                    <p class="mb-1 h5">253</p>
                    <p class="small text-muted mb-0">Photos</p>
                  </div>
                  <div class="px-3">
                    <p class="mb-1 h5">1026</p>
                    <p class="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p class="mb-1 h5">478</p>
                    <p class="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div class="card-body p-4 text-black">
                <div class="mb-5">
                  <p class="lead fw-normal mb-1">About</p>
                  <div class="p-4" style={{ "backgroundColor" : "#f8f9fa" }}>
                    <p class="font-italic mb-1">Web Developer</p>
                    <p class="font-italic mb-1">Lives in New York</p>
                    <p class="font-italic mb-0">Photographer</p>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <p class="lead fw-normal mb-0">Recent photos</p>
                  <p class="mb-0">
                    <a href="#!" class="text-muted">
                      Show all
                    </a>
                  </p>
                </div>
                <div class="row g-2">
                  <div class="col mb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                      class="w-100 rounded-3"
                    />
                  </div>
                  <div class="col mb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      class="w-100 rounded-3"
                    />
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      class="w-100 rounded-3"
                    />
                  </div>
                  <div class="col">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      class="w-100 rounded-3"
                    />
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
