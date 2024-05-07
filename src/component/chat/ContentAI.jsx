import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import logoAI from "./../../logoAI.png";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import Cookies from "js-cookie";

function ContentAI(props) {
  const [like, setLike] = useState(null);
  const handleLike = (value) => {
    console.log(value);
    console.log(props.bot);
    setLike(value);
  };

  return (
    <div className="d-flex flex-row justify-content-start mb-4 mt-3">
      {/* <FontAwesomeIcon
        icon={faDiscord}
        style={{
          color: "#91b3ee",
          width: "40px",
          height: "100%",
          marginRight: "10px",
        }}
      /> */}
      <img src={logoAI} style={{ width: "60px", height: "60px" }} />
      <div>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "rgba(202, 205,209)", color: "black" }}
        >
          {props.bot}
        </p>
        {Cookies.get("user") === "admin" ? (
        <span className="p-2 ms-3 mb-1">
          {like === null ? (
            <>
              <BiLike
                onClick={() => {
                  handleLike(true);
                }}
                color="white"
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="likeIcon"
              />
              <BiDislike
                onClick={() => {
                  handleLike(false);
                }}
                color="white"
                size={20}
                style={{ cursor: "pointer" }}
                className="likeIcon"
              />
            </>
          ) : like ? (
            <>
              <BiSolidLike
                color="white"
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="likeIcon"
              />
              <BiDislike
                onClick={() => {
                  handleLike(false);
                }}
                color="white"
                size={20}
                style={{ cursor: "pointer" }}
                className="likeIcon"
              />
            </>
          ) : (
            <>
              <BiLike
                onClick={() => {
                  handleLike(true);
                }}
                color="white"
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="likeIcon"
              />
              <BiSolidDislike
                color="white"
                size={20}
                style={{ cursor: "pointer" }}
                className="likeIcon"
              />
            </>
          )}
        </span>
      ) : null}
      </div>
    </div>
  );
}

export default ContentAI;
