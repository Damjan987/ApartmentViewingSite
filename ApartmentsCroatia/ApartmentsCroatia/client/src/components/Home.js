import React, { useEffect, useState, Fragment } from "react";
import { getUser } from "../api/user";
import { getLocations } from "../api/location";
import LocationElement from "./Location/LocationElement";
require("./../styles/Home.css");

const Home = () => {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    getLocations().then((response) => {
      setLocations(response.data.locations);
    });
  }, []);

  return (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="row">
          {locations &&
            locations.map((l) => (
              <LocationElement {...l} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
