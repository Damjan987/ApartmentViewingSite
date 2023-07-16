import React, { useState, useEffect } from "react";
import { getUsers, loadUsersBySearchName } from "../../api/user";

const UserList = (props) => {
  const userId = props.match.params.userId;
  const postId = props.match.params.postId;
  const [users, setUsers] = useState([]);
  const [searchMode, setSearchMode] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    await getUsers()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    setSearchMode(0);
  };

  const handleSearchNameChange = async (evt) => {
    if (evt.target.value !== "") {
      await loadUsersBySearchName(evt.target.value, searchMode, userId, postId)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section>
      <div className="form-outline">
        <label className="form-label"></label>
      </div>
      <ul className="list-group list-group-light">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          onChange={handleSearchNameChange}
        />
        {users &&
          users.map((u) => (
            <a key={u._id} href={`/user/${u._id}`}>
              <li
                className="list-group-item d-flex flex-row justify-content-between align-items-center mt-1"
                style={{ background: "black" }}
              >
                <div>
                  <div className="text-warning">{u.username}</div>
                  <div className="text-muted">
                    {u.firstname} {u.lastname}
                  </div>
                </div>
              </li>
            </a>
          ))}
      </ul>
    </section>
  );
};

export default UserList;
