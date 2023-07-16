import React, { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import {
  postComment,
  getPostsComments,
  deleteComment,
} from "../../api/post";
import { isAuthenticated } from "../../helpers/auth";

const PostsCommentList = (props) => {
  const userId = isAuthenticated()._id;
  const postId = props.match.params.postId;
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [postsComments, setPostsComments] = useState([]);

  useEffect(() => {
    getUser(userId).then((response) => {
      setUser(response.data);
    });
    getPostsComments(postId, isAuthenticated()._id).then((response) => {
      setPostsComments(response.data);
    });
  }, [userId, postId]);

  const handleCommentChange = async (evt) => {
    setComment(evt.target.value);
  };

  const handlePostCommentReq = async () => {
    postComment({ comment }, postId, userId);
    window.location.reload(true);
  };

  const handleDeleteCommentReq = async (commentId, postId) => {
    deleteComment(commentId, postId);
    window.location.reload(true);
  };

  return (
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "5em", marginBottom: "4em" }}
    >
      <div className="col-md-8 col-lg-6">
        <div
          className="card shadow-0"
          style={{ backgroundColor: "black", borderRadius: "15px" }}
        >
          <div className="card-body p-4">
            {!user.isBanned && (
              <div className="form-outline form-group input-group mb-4">
                <input
                  type="text"
                  id="addANote"
                  name="comment"
                  className="form-control"
                  placeholder="Type comment..."
                  onChange={handleCommentChange}
                />
                <span className="input-group-text">
                  <i
                    onClick={() => {
                      handlePostCommentReq();
                    }}
                    type="submit"
                  >
                    Post
                  </i>
                </span>
              </div>
            )}

            {postsComments.map((c) => (
              <div className="card mb-4 bg-warning">
                <div className="card-body">
                  <p>{c.commentObject.text}</p>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      {c.commentOwner.profileImage === null ? (
                        <img
                          src={`/uploads/default_profile_photo.jpg`}
                          alt="avatar"
                          width="25"
                          height="25"
                        />
                      ) : (
                        <img
                          src={`/uploads/${c.commentOwner.profileImage}`}
                          alt="avatar"
                          width="25"
                          height="25"
                        />
                      )}
                      <p className="small ml-2 mb-0 ms-2">
                        {c.commentOwner.username}
                      </p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <i
                        className="far fa-thumbs-up mx-2 fa-xs text-black"
                        style={{ marginTop: "-0.16rem" }}
                      ></i>
                      <p className="small mb-0">
                        {c.commentObject.stars} likes
                      </p>
                      <i
                        className="far fa-thumbs-up mx-2 fa-xs text-black"
                        style={{ marginTop: "-0.16rem" }}
                      ></i>
                      {c.ableToDelete && (
                        <p
                          className="small mb-0"
                          onClick={() => {
                            handleDeleteCommentReq(c.commentObject._id, postId);
                          }}
                        >
                          Delete
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCommentList;
