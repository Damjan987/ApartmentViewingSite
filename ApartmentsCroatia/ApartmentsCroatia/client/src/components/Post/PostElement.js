import React from "react";
import { FaStar } from "react-icons/fa";

const PostElement = (props) => {
  return (
    <div
      className="col-md-3"
      key={props._id}
      style={{
        width: "100%",
        display: "block",
      }}
    >
      <article className="box rounded border border-info bg-dark">
        <figure>
          {" "}
          <a href={`/post/${props._id}`} className="hover-effect popup-gallery">
            <img
              width="100%"
              height="160"
              alt=""
              src={`/uploads/${props.images[0]}`}
              draggable="false"
            />
          </a>{" "}
        </figure>
        <div className="details p-2">
          {" "}
          <span className="price">
            <small>DAY PRICE</small>
            {props.dayPrice}€
          </span>
          <h2 className="box-title text-white mb-3">{props.name}</h2>
          <div className="feedback">
            <div
              data-placement="bottom"
              data-toggle="tooltip"
              className="fa fa-star"
              title=""
              data-original-title="4 stars"
            >
              <span style={{ width: "80%" }} className="five-stars"></span>
            </div>
          </div>
          <div className="w-80 text-center mb-3">
            {[...Array(props.stars)].map(() => {
              return <FaStar className="star" size={30} color="#ffc107" />;
            })}
          </div>
          <div className="action">
            {" "}
            <a
              href={`/post/${props._id}`}
              className="button btn-small text-dark mb-1"
            >
              EXPLORE
            </a>{" "}
            <a
              className="button btn-small yellow popup-map bg-primary"
              href={`https://www.google.com/maps/place/${props.name}`}
              data-box="37.089072, -8.247880"
            >
              VIEW ON MAP
            </a>{" "}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostElement;
