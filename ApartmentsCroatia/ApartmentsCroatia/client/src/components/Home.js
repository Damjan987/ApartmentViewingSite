import React, { useEffect, useState, Fragment } from "react";
import { getUser } from "../api/user";
import { getLocations } from "../api/location";
require("./../styles/Home.css");

const Home = (props) => {
  const userId = props.match.params.userId;
  const [user, setUser] = useState({});
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    // getUser(userId).then((response) => {
    //   setUser(response.data);
    // });
    getLocations().then((response) => {
      setLocations(response.data.locations);
    });
  }, []);

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row">
          {locations &&
            locations.map((l) => (
              <div
                className="col-md-3"
                key={l._id}
                style={{
                  width: "100%",
                  display: "block",
                }}
              >
                <article className="box bg-dark rounded">
                  <figure>
                    {" "}
                    <a
                      href={`/location/${l._id}`}
                      className="hover-effect popup-gallery"
                    >
                      <img
                        width="100%"
                        height="160"
                        alt=""
                        src={`/uploads/${l.image}`}
                        draggable="false"
                      />
                    </a>{" "}
                  </figure>
                  <div className="details p-2">
                    {" "}
                    <span className="price">
                      <small>RESULTS</small>
                      {l.posts.length}
                    </span>
                    <h2 className="box-title text-white mb-3">{l.name}</h2>
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
                    <div className="action">
                      {" "}
                      <a
                        href={`/location/${l._id}`}
                        className="button btn-small text-dark mb-1"
                      >
                        EXPLORE
                      </a>{" "}
                      <a
                        className="button btn-small yellow popup-map bg-primary"
                        href={`https://www.google.com/maps/place/${l.name}`}
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
    </Fragment>
  );
};

export default Home;
