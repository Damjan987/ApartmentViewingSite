import React, { useState, useEffect } from "react";
import { getTypes, deleteType, loadTypesBySearchName } from "../../api/type";

const TypeList = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    await getTypes()
      .then((response) => {
        setTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchNameChange = async (evt) => {
    if (evt.target.value !== "") {
      loadTypesBySearchName(evt.target.value)
        .then((response) => {
          setTypes(response.data.types);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteTypeReq = async (id) => {
    await deleteType(id);
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
        {types &&
          types.map((t) => (
            <a key={t._id} href={`/type/${t._id}`}>
              <li
                className="list-group-item d-flex flex-row justify-content-between align-items-center mt-1"
                style={{ background: "black" }}
              >
                <div>
                  <div className="text-warning">{t.name}</div>
                </div>
                <div
                  className="p-1"
                  onClick={() => {
                    handleDeleteTypeReq(t._id);
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

export default TypeList;
