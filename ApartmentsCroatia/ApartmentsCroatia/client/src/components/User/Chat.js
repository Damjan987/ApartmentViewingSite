import React, { useEffect, useState } from "react";
import "./../../styles/Chat.css";
import { getUser } from "../../api/user";
import {
  createChat,
  doesChatExist,
  addMessageToChat,
  loadChatMessages,
} from "../../api/chat";
import ScrollToBottom from "react-scroll-to-bottom";
import { getLocalStorage } from "../../helpers/localStorage";
import { isAuthenticated } from "../../helpers/auth";

function Chat(props) {
  const chatId = props.match.params.chatId;
  const member2Id = props.match.params.userId;
  const [member2, setMember2] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [doesChatExistVar, setDoesChatExistVar] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      if (!doesChatExistVar) {
        createChat(loggedInUser._id, member2Id);
      }

      addMessageToChat({
        senderId: loggedInUser._id,
        receiverId: member2Id,
        message: currentMessage,
        creationTime:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      });
      setCurrentMessage("");
      window.location.reload(true);
    }
  };

  useEffect(() => {
    if (getLocalStorage("user")) {
      getUser(isAuthenticated()._id).then((response) => {
        setLoggedInUser(response.data);
      });
      doesChatExist(isAuthenticated()._id, member2Id).then((response) => {
        setDoesChatExistVar(response.data);
      });
      getUser(member2Id).then((response) => {
        setMember2(response.data);
      });
      if (doesChatExistVar === true) {
        setDoesChatExistVar(true);
        loadChatMessages(isAuthenticated()._id, member2Id).then((response) => {
          setMessageList(response.data);
        });
      }
    }
  }, [chatId, doesChatExistVar, member2Id]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{member2.username}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((m) => {
            return (
              <div
                className="message"
                key={m._id}
                id={loggedInUser._id !== m.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content bg-warning text-dark">
                    <p>{m.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{m.creationTime}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
