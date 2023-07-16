import React, { useState, useEffect } from "react";
import { deleteTag, getTags, loadTagsBySearchName } from "../../api/tag";

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    await getTags()
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchNameChange = async (evt) => {
    if (evt.target.value !== "") {
      loadTagsBySearchName(evt.target.value)
        .then((response) => {
          setTags(response.data.tags);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteTagReq = async (id) => {
    await deleteTag(id);
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
        {tags &&
          tags.map((t) => (
            <a key={t._id} href={`/tag/${t._id}`}>
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
                    handleDeleteTagReq(t._id);
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

export default TagList;
