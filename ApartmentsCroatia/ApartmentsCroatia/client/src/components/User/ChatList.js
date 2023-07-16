import React, { useState, useEffect } from "react";
import { getUser } from "../../api/user";
import { loadUsersChats } from "../../api/chat";
import { isAuthenticated } from "../../helpers/auth";

const ChatList = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getUser(isAuthenticated()._id).then((response) => {
      setLoggedInUser(response.data);
    });
    loadUsersChats(isAuthenticated()._id).then((response) => {
      setChats(response.data);
    });
  }, []);

  return (
    <section>
      <ul className="list-group list-group-light mt-5">
        {chats &&
          chats.map((c) =>
            c.member1Obj._id === loggedInUser._id ? (
              <a
                key={c.chatObj._id}
                href={`/chat/${c.member2Obj._id}/${c.chatObj._id}`}
              >
                <li
                  className="list-group-item d-flex flex-row justify-content-between align-items-center mt-1"
                  style={{ background: "black" }}
                >
                  <div>
                    <div className="text-warning pt-2 pb-2">
                      {c.member2Obj.username}
                    </div>
                  </div>
                </li>
              </a>
            ) : (
              <a
                key={c.chatObj._id}
                href={`/chat/${c.member1Obj._id}/${c.chatObj._id}`}
              >
                <li
                  className="list-group-item d-flex flex-row justify-content-between align-items-center mt-1"
                  style={{ background: "black" }}
                >
                  <div>
                    <div className="text-warning pt-2 pb-2">
                      {c.member1Obj.username}
                    </div>
                  </div>
                </li>
              </a>
            )
          )}
      </ul>
    </section>
  );
};

export default ChatList;
