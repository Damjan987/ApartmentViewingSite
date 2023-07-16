import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "../../helpers/localStorage";
import { isAuthenticated } from "../../helpers/auth";
import { getLocation } from "../../api/location";
import { getPostsByLocation } from "../../api/post";
import { FaStar } from "react-icons/fa";
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
          {posts &&
            posts.map((p) => (
              <div
                className="col-md-3"
                key={p._id}
                style={{
                  width: "100%",
                  display: "block",
                }}
              >
                <article className="box rounded border border-info bg-dark">
                  <figure>
                    {" "}
                    <a
                      href={`/post/${p._id}`}
                      className="hover-effect popup-gallery"
                    >
                      <img
                        width="100%"
                        height="160"
                        alt=""
                        src={`/uploads/${p.images[0]}`}
                        draggable="false"
                      />
                    </a>{" "}
                  </figure>
                  <div className="details p-2">
                    {" "}
                    <span className="price">
                      <small>DAY PRICE</small>
                      {p.dayPrice}€
                    </span>
                    <h2 className="box-title text-white mb-3">{p.name}</h2>
                    <div className="feedback">
                      <div
                        data-placement="bottom"
                        data-toggle="tooltip"
                        className="fa fa-star"
                        title=""
                        data-original-title="4 stars"
                      >
                        <span
                          style={{ width: "80%" }}
                          className="five-stars"
                        ></span>
                      </div>
                    </div>
                    <div className="w-80 text-center mb-3">
                      {[...Array(p.stars)].map(() => {
                        return (
                          <FaStar className="star" size={30} color="#ffc107" />
                        );
                      })}
                    </div>
                    <div className="action">
                      {" "}
                      <a
                        href={`/post/${p._id}`}
                        className="button btn-small text-dark mb-1"
                      >
                        EXPLORE
                      </a>{" "}
                      <a
                        className="button btn-small yellow popup-map bg-primary"
                        href={`https://www.google.com/maps/place/${p.name}`}
                        data-box="37.089072, -8.247880"
                      >
                        VIEW ON MAP
                      </a>{" "}
                    </div>
                  </div>
                </article>
              </div>
            ))}
        </div>
      </div>

      {/* <section className="mb-5">
        <div className="container">
          <div className="col-md-2">
            <form action="" method="post">
              <input type="text" name="somename" />
            </form>
          </div>

          <div className="col-md-10" style={{ marginBottom: "10rem" }}>
            {posts &&
              posts.map((p) => (
                <div
                  className="col-md-4 w-30 pt-3"
                  style={{ border: "solid thin whitesmoke" }}
                >
                  <div className="col-md-16">
                    <a href={`/post/${p._id}`}>
                      <img
                        src={`/uploads/${p.images[0]}`}
                        className="img elementImage"
                      />
                    </a>
                    <br />
                    <br />
                  </div>
                  <div className="w-100 text-white text-center">
                    <h4>{p.name}</h4>
                  </div>
                  <div className="w-100 text-center">
                    {[...Array(p.stars)].map((star, index) => {
                      return (
                        <FaStar className="star" size={40} color="#ffc107" />
                      );
                    })}
                  </div>
                  <div className="w-100 text-white text-center">
                    <h4>{p.address}</h4>
                  </div>
                  <div className="w-100 text-white text-center">
                    <h4>$</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section> */}
    </Fragment>
  );
};

export default LocationDetails;
