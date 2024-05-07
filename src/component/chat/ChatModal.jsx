import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Command from "./Command";
import { TailSpin } from "react-loader-spinner";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import ContentUser from "./ContentUser";
import ContentAI from "./ContentAI";
import Cookies from "js-cookie";
import chatService from "../../services/chat.js";
import { IoIosMicOff } from "react-icons/io";
import { IoIosMic } from "react-icons/io";
function ChatModal(props) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [chatHistory, setchatHistory] = useState([]);
  const [openVoice, setOpenVoice] = useState(false);
  const [nextQuestions, setNextQuestion] = useState([]);
  const scrollRef = useRef(null);

  const chatbot = (timestamp) => {
    if (props.filename === "") {
      setchatHistory((prev) => [
        ...prev,
        ["error", userInput, "Sorry! I don't have any file"],
      ]);
      setisLoading(false);
    } else {
      setchatHistory((prev) => [...prev, ["chat", userInput]]);
      setUserInput("");
      chatService
        .sendQuestion(
          userInput,
          props.filename,
          timestamp,
          props.title,
          Cookies.get("accessToken")
        )
        .then((response) => {
          // response.data.nex_questions
          setNextQuestion(response.data.next_questions);
          if (response.data.result[1] === 2) {
            setchatHistory((prev) => {
              const lastChat = [...prev];
              lastChat[lastChat.length - 1].push(
                response.data.result[0].answer
              );
              lastChat[lastChat.length - 1].push(response.data.result[0].info);
              return lastChat;
            });
          } else {
            setchatHistory((prev) => {
              const lastChat = [...prev];
              lastChat[lastChat.length - 1].push(response.data.result[0].info);
              return lastChat;
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            props.logoutmodal();
          } else {
            console.error("Error: ", error);
            setchatHistory((prev) => {
              const lastChat = [...prev];
              lastChat[lastChat.length - 1][0] = "error";
              lastChat[lastChat.length - 1].push(
                "Sorry! I can't answer the question"
              );
              return lastChat;
            });
          }
        })
        .finally(() => {
          setisLoading(false);
          props.savehistorymodal();
        });
    }
  };
  const addHistory = (event) => {
    event.preventDefault();
    if (userInput !== "") {
      const timestamp = props.timestamp ? props.timestamp : Date.now();
      setisLoading(true);
      setUserInput("");
      chatbot(timestamp);
    }
  };
  useEffect(() => {
    if (props.chat) {
      setchatHistory(props.chat);
    }
  }, [props.show]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatHistory, userInput, props.show]);

  useEffect(() => {
    if (chatHistory) props.setchat(chatHistory);
  }, [chatHistory]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chatModal"
    >
      <Modal.Header closeButton style={{ backgroundColor: "#33363F" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ width: "100%" }}
        >
          <MdOutlineMarkUnreadChatAlt style={{ marginRight: "2%" }} />
          Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "66vh", backgroundColor: "#33363F" }}>
        <div
          className="overflow-auto"
          style={{
            position: "relative",
            height: "62vh",
            borderRadius: "30px",
            borderTopLeftRadius: 0,
          }}
        >
          {chatHistory &&
            chatHistory.map((history, index) => (
              <div key={index} ref={scrollRef}>
                {history[1] && <ContentUser user={history[1]} />}
                {history[0] === "chat" ? (
                  <>
                    <ContentAI bot={history[2]} />
                    {history[3] && <ContentAI bot={history[3]} />}
                  </>
                ) : (
                  <ContentAI bot={history[2]} />
                )}
              </div>
            ))}
          <div id="ref" style={{ height: "0.5px" }} />
        </div>
      </Modal.Body>
      <div className="nextQuestions">
        {nextQuestions.map((item, index) => (
          <button key={index} onClick={() => setUserInput(item)}>
            {item}
          </button>
        ))}
      </div>
      <Modal.Footer
        className="d-flex justify-content-start"
        style={{ background: "#33363F" }}
      >
        <form
          style={{
            width: "100%",
            background: "white",
            borderRadius: "30px",
            boxShadow: "rgb(136, 136, 136) -2px 2px 5px",
          }}
          onSubmit={addHistory}
        >
          <input
            type="text"
            className={`form-control form-control-lg ${
              isLoading ? "d-none" : ""
            }`}
            id="exampleFormControlInput3"
            placeholder="Type message"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              width: "88%",
            }}
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          {isLoading && (
            <TailSpin
              height="59"
              width="50"
              color="#54b4d3"
              marginLeft="15px"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </form>
        <Button
          style={{
            position: "absolute",
            right: "20px",
            background: "none",
            borderRadius: 10,
            boxShadow: "none",
            border: "none",
            paddingRight: "2%",
          }}
          disabled={isLoading}
          onClick={(e) => addHistory(e)}
        >
          <IoSendSharp
            size={30}
            style={{
              color: "#3B71CA",
              width: "30px",
              height: "40px",
              boxShadow: "#3b71ca",
              shadow: "#3b71ca",
            }}
          />
        </Button>
        <span
          style={{ position: "absolute", right: "80px", cursor: "pointer" }}
        >
          {!openVoice ? (
            <IoIosMicOff color="black" size={30} />
          ) : (
            <IoIosMic color="black" size={30} />
          )}
        </span>
      </Modal.Footer>
    </Modal>
  );
}

export default ChatModal;
