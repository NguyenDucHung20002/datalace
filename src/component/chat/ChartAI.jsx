import React, { useEffect, useState } from "react";
import CardforChatbot from "../cards/CardforChatbot";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import Cookies from "js-cookie";
import { Button, Form } from "react-bootstrap";
import { IoCheckmark, IoCloseSharp } from "react-icons/io5";
import { select } from "d3";

const ReasonTag = ({ item, textFB }) => {
  const [select, setSelect] = textFB;
  const [click, setClick] = useState(false);
  return (
    <span
      className={!click ? "reasonTag" : "reasonTagAction"}
      onClick={() => {
        setClick(!click);
        if (!select.includes(item)) {
          setSelect([...select, item]);
        } else {
          setSelect(select.filter((i) => i !== item));
        }
      }}
    >
      {click ? <IoCheckmark size={20} /> : null}
      {item}
    </span>
  );
};

const FeedBackChart = ({ like, closeFB }) => {
  const [close, setColse] = closeFB;
  const [textFB, setTextFB] = useState([]);
  const [textarea, setTextarea] = useState("");
  return (
    <div
      style={{
        width: "40%",
        height: "16rem",
        background: "rgb(72, 77, 91)",
        position: "relative",
        borderRadius: "10px",
        color: "white",
        display: close ? "block" : "none",
      }}
      className="containerFB"
    >
      <IoCloseSharp
        size={20}
        color="white"
        style={{ float: "right", margin: "10px", cursor: "pointer" }}
        onClick={() => {
          setColse(false);
        }}
      />
      <div style={{ padding: "3%" }} className="feedBackChart">
        <p style={{ fontSize: "1.2rem" }}>
          Why do you rate it like that? (optional)
        </p>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
          {like ? (
            <>
              <ReasonTag item={"Exactly"} textFB={[textFB, setTextFB]} />
              <ReasonTag item={"Clear"} textFB={[textFB, setTextFB]} />
              <ReasonTag item={"Intuitive"} textFB={[textFB, setTextFB]} />
            </>
          ) : (
            <>
              <ReasonTag item={"Unclear"} textFB={[textFB, setTextFB]} />
              <ReasonTag item={"Incorrect"} textFB={[textFB, setTextFB]} />
              <ReasonTag item={"Not intuitive"} textFB={[textFB, setTextFB]} />
            </>
          )}

          <Form.Control
            placeholder="Another reason..."
            as="textarea"
            rows={3}
            value={textarea}
            onChange={(e) => {
              setTextarea(e.target.value);
            }}
          />
        </Form.Group>
        <button
          className="btnSendFB"
          disabled={
            textFB.length <= 0 && textarea.trim().length <= 0 ? "disabled" : ""
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ChartAI = ({
  moveChartToGallery,
  jsonData,
  jsonRequest,
  cardId,
  savehistory,
  moveChartToChat,
  openMenu,
  activeChatTab
}) => {
  const [like, setLike] = useState(null);
  const [closeFB, setCloseFB] = useState(true);
  const handleLike = (value) => {
    setLike(value);
  };

  if (!jsonData) {
    return null;
  }

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        marginBottom: like === null || !closeFB ? "50px" : "19rem",
      }}
    >
      <CardforChatbot
        id={cardId}
        moveChartToGallery={() => {
          moveChartToGallery(jsonData, jsonRequest);
          savehistory();
        }}
        chart={jsonData}
        edit={async () => {
          await moveChartToChat(jsonData, jsonRequest);
          openMenu();
          savehistory();
          activeChatTab();
        }}
      />
      {Cookies.get("user") === "admin" ? (
        <span className="p-2 ms-3 mb-1">
          {like === null ? (
            <>
              <BiLike
                onClick={() => {
                  handleLike(true);
                  setCloseFB(true);
                }}
                color="white"
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="likeIcon"
              />
              <BiDislike
                onClick={() => {
                  handleLike(false);
                  setCloseFB(true);
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
                onClick={() => {
                  handleLike(null);
                }}
              />
              <BiDislike
                onClick={() => {
                  handleLike(false);
                  setCloseFB(true);
                }}
                color="white"
                size={20}
                style={{ cursor: "pointer" }}
                className="likeIcon"
              />
              <FeedBackChart like={like} closeFB={[closeFB, setCloseFB]} />
            </>
          ) : (
            <>
              <BiLike
                onClick={() => {
                  handleLike(true);
                  setCloseFB(true);
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
                onClick={() => {
                  handleLike(null);
                }}
              />
              <FeedBackChart like={like} closeFB={[closeFB, setCloseFB]} />
            </>
          )}
        </span>
      ) : null}
    </div>
  );
};

export default ChartAI;
