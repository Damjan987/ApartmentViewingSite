import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "../../helpers/localStorage";
import { isAuthenticated } from "../../helpers/auth";
import { getLocation } from "../../api/location";
import { getPostsByLocation } from "../../api/post";
import PostElement from "./../Post/PostElement";
require("./../../styles/LocationDetails.css");

const LocationDetails = (props) => {
  const locationId = props.match.params.locationId;
  const [location, setLocation] = useState({});
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getLocation(locationId).then((response) => {
      setLocation(response.data);
    });
    getPostsByLocation(locationId).then((response) => {
      setPosts(response.data.posts);
    });
  }, [locationId]);

  //   const openChat = () => {
  //     history.push(`/chat/${userId}/${undefined}`);
  //   };

  return (
    <Fragment>
      <header
        style={{
          height: "100vh",
          minHeight: "500px",
          backgroundImage: `url("/uploads/${location.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <p
                className="fw-light"
                style={{ fontSize: "7rem", color: "white" }}
              >
                {location.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-5 mb-5">
        <div className="row">
          {posts && posts.map((p) => <PostElement {...p} />)}
        </div>
      </div>
    </Fragment>
  );
};

export default LocationDetails;
