import React from "react";

const LocationElement = (props) => {
  return (
    <div
      className="col-md-3"
      key={props._id}
      style={{
        width: "100%",
        display: "block",
      }}
    >
      <article className="box bg-dark rounded" style={{ marginBottom: "2rem" }}>
        <figure>
          {" "}
          <a href={`/location/${props._id}`} className="hover-effect popup-gallery">
            <img
              width="100%"
              height="160"
              alt=""
              src={`/uploads/${props.image}`}
              draggable="false"
            />
          </a>{" "}
        </figure>
        <div className="details p-2">
          {" "}
          <span className="price">
            <small>RESULTS</small>
            {props.posts.length}
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
          <div className="action">
            {" "}
            <a
              href={`/location/${props._id}`}
              className="button btn-small text-dark mb-1"
            >
              EXPLORE
            </a>{" "}
            <a
              className="button btn-small yellow popup-map bg-primary"
              href={`https://www.google.com/maps/place/${props.name}`}
            >
              VIEW ON MAP
            </a>{" "}
          </div>
        </div>
      </article>
    </div>
  );
};

export default LocationElement;
