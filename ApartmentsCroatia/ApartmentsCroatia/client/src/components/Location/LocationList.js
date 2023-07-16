import React, { useState, useEffect } from "react";
import { getLocations, deleteLocation, loadLocationsBySearchName } from "../../api/location";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    await getLocations()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchNameChange = async (evt) => {
    if (evt.target.value !== "") {
      loadLocationsBySearchName(evt.target.value)
        .then((response) => {
          setLocations(response.data.locations);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteLocationReq = async (id) => {
    await deleteLocation(id);
  };

  return (
    <section>
      <div className="form-outline mb-4">
        <label className="form-label"></label>
      </div>
      <ul className="list-group list-group-light">
        <input
          type="search"
          className="form-control mt-3"
          placeholder="Search"
          onChange={handleSearchNameChange}
        />
        {locations &&
          locations.map((l) => (
            <a key={l._id} href={`/location/${l._id}`}>
              <li
                className="list-group-item d-flex flex-row justify-content-between align-items-center mt-1"
                style={{ background: "black" }}
              >
                <div>
                  <div className="text-warning">{l.name}</div>
                </div>
                <div
                  className="p-1"
                  onClick={() => {
                    handleDeleteLocationReq(l._id);
                  }}
                >
                  <span className="badge-dark rounded-pill badge p-3">
                    Delete
                  </span>
                </div>
              </li>
            </a>
          ))}
      </ul>
    </section>
  );
};

export default LocationList;
