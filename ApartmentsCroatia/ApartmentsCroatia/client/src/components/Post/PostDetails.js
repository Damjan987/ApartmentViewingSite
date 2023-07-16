import React, { useEffect, useState, Fragment } from "react";
import { getLocalStorage } from "../../helpers/localStorage";
import { isAuthenticated } from "../../helpers/auth";
import { getPost } from "../../api/post";
import { FaStar } from "react-icons/fa";
require("./../../styles/PostDetails.css");

const PostDetails = (props) => {
  const postId = props.match.params.postId;
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(postId).then((response) => {
      setPost(response.data);
    });
  }, [postId]);

  return (
    <Fragment>
      <div className="container">
        <div
          className="product-content product-wrap clearfix product-deatil bg-dark"
          style={{ borderRadius: "2%" }}
        >
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-image">
                <div id="myCarousel-2" className="carousel slide">
                  <ol className="carousel-indicators">
                    <li
                      data-target="myCarousel-2"
                      data-slide-to="0"
                      className=""
                    ></li>
                    <li
                      data-target="myCarousel-2"
                      data-slide-to="1"
                      className="active"
                    ></li>
                    <li
                      data-target="myCarousel-2"
                      data-slide-to="2"
                      className=""
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="item active">
                      <img
                        src="https://www.bootdey.com/image/700x400/FFB6C1/000000"
                        className="img-responsive"
                        alt=""
                      />
                    </div>
                    <div className="item">
                      <img
                        src="https://www.bootdey.com/image/700x400/87CEFA/000000"
                        className="img-responsive"
                        alt=""
                      />
                    </div>
                    <div className="item">
                      <img
                        src="https://www.bootdey.com/image/700x400/B0C4DE/000000"
                        className="img-responsive"
                        alt=""
                      />
                    </div>
                  </div>
                  <a
                    className="left carousel-control"
                    href="myCarousel-2"
                    data-slide="prev"
                  >
                    {" "}
                    <span className="glyphicon glyphicon-chevron-left"></span>{" "}
                  </a>
                  <a
                    className="right carousel-control"
                    href="myCarousel-2"
                    data-slide="next"
                  >
                    {" "}
                    <span className="glyphicon glyphicon-chevron-right"></span>{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
              <h1 className="name" style={{ color: "#3277a8" }}>
                {post.name}
                <small className="mt-3 mb-2 text-white">
                  Published by{" "}
                  <a href={`/user/${post.creator}`}>{post.creatorUsername}</a>
                </small>

                <small className="text-white">109 views</small>
              </h1>
              <hr />
              <h3 className="price-container text-success">
                <small className="text-white">day price </small>
                {post.dayPrice}€
              </h3>
              <div className="certified">
                {[...Array(post.stars)].map(() => {
                  return <FaStar className="star" size={30} color="#ffc107" />;
                })}
              </div>
              <hr />
              <div
                className="description description-tabs"
                style={{ backgroundColor: "#343a40" }}
              >
                <ul id="myTab" className="nav nav-pills">
                  <li className="active">
                    <a
                      href="#more-information"
                      data-toggle="tab"
                      className="no-margin"
                    >
                      Description{" "}
                    </a>
                  </li>
                  <li className="">
                    <a href="#specifications" data-toggle="tab">
                      Specifications
                    </a>
                  </li>
                  <li className="">
                    <a href="#reviews" data-toggle="tab">
                      Reviews
                    </a>
                  </li>
                  <li className="">
                    <a href="#calendar" data-toggle="tab">
                      Calendar
                    </a>
                  </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                  <div
                    className="tab-pane fade active in"
                    id="more-information"
                  >
                    <br />
                    <strong>Description</strong>
                    <p>{post.description}</p>
                  </div>
                  <div className="tab-pane fade" id="specifications">
                    <br />
                    <dl className="">
                      <dt>Gravina</dt>
                      <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                      <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                      <dd>Eget lacinia odio sem nec elit.</dd>
                      <br />

                      <dt>Test lists</dt>
                      <dd>A description list is perfect for defining terms.</dd>
                      <br />

                      <dt>Altra porta</dt>
                      <dd>Vestibulum id ligula porta felis euismod semper</dd>
                    </dl>
                  </div>
                  <div className="tab-pane fade" id="reviews">
                    <br />
                    <form
                      method="post"
                      className="well padding-bottom-10"
                      onsubmit="return false;"
                    >
                      <textarea
                        rows="2"
                        className="form-control"
                        placeholder="Write a review"
                      ></textarea>
                      <div className="margin-top-10">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary pull-right"
                        >
                          Submit Review
                        </button>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Location"
                        >
                          <i className="fa fa-location-arrow"></i>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Voice"
                        >
                          <i className="fa fa-microphone"></i>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Photo"
                        >
                          <i className="fa fa-camera"></i>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add File"
                        >
                          <i className="fa fa-file"></i>
                        </a>
                      </div>
                    </form>

                    <div className="chat-body no-padding profile-message">
                      <ul>
                        <li className="message">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="online"
                          />
                          <span class="message-text">
                            <a href="javascript:void(0);" class="username">
                              Alisha Molly
                              <span class="badge">Purchase Verified</span>
                              <span class="pull-right">
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-muted"></i>
                              </span>
                            </a>
                            Can't divide were divide fish forth fish to. Was
                            can't form the, living life grass darkness very
                            image let unto fowl isn't in blessed fill life
                            yielding above all moved
                          </span>
                          <ul class="list-inline font-xs">
                            <li>
                              <a href="javascript:void(0);" class="text-info">
                                <i class="fa fa-thumbs-up"></i> This was helpful
                                (22)
                              </a>
                            </li>
                            <li class="pull-right">
                              <small class="text-muted pull-right ultra-light">
                                {" "}
                                Posted 1 year ago{" "}
                              </small>
                            </li>
                          </ul>
                        </li>
                        <li class="message">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            class="online"
                          />
                          <span class="message-text">
                            <a href="javascript:void(0);" class="username">
                              Aragon Zarko
                              <span class="badge">Purchase Verified</span>
                              <span class="pull-right">
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                                <i class="fa fa-star fa-2x text-primary"></i>
                              </span>
                            </a>
                            Excellent product, love it!
                          </span>
                          <ul class="list-inline font-xs">
                            <li>
                              <a href="javascript:void(0);" class="text-info">
                                <i class="fa fa-thumbs-up"></i> This was helpful
                                (22)
                              </a>
                            </li>
                            <li class="pull-right">
                              <small class="text-muted pull-right ultra-light">
                                {" "}
                                Posted 1 year ago{" "}
                              </small>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div class="btn-group pull-right">
                    <button class="btn btn-white btn-default">
                      <i class="fa fa-star"></i> Save Post
                    </button>
                    <button class="btn btn-success">
                      <i class="fa fa-envelope"></i> Contact Renter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostDetails;
