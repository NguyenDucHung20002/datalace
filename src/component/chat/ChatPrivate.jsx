import React, { useEffect, useRef, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import ContentAI from "./ContentAI";
import ContentUser from "./ContentUser";
import Command from "./Command";
import ChatModal from "./ChatModal.jsx";
import { getObject } from "../../scripts/functionS3.js";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import ChartAI from "./ChartAI";
import { getItem } from "../../scripts/dynamodb.js";
import Button from "react-bootstrap/Button";
import CardforChatbot from "../cards/CardforChatbot";
import chatService from "../../services/chat.js";
import { IoSendSharp } from "react-icons/io5";
function ChatPrivate(props) {
  const [commandList, setCommandList] = useState(["/visualize", "/edit"]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setchatHistory] = useState({});
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [nextQuestion, setNextQuestion] = useState([]);
  const [receivedChart, setReceivedChart] = useState(null);
  const [collapseChart, setCollapseChart] = useState(true);
  const [title, setTitle] = useState("");
  const [timestamp_query, setTimestampQuery] = useState("");
  const [filename, setFilename] = useState("");
  const [open, setOpen] = useState(false);
  const scrollReffPrv = useRef(null);

  const addHistory = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      const timestamp = Date.now();
      setIsLoading(true);
      edit(inputValue, timestamp);
    }
  };

  const setChatModalPrivate = (chatHistory) => {
    props.setChatModalPrivate(props.keyChat, chatHistory);
  };

  const edit = async (userInput, timestamp) => {
    setchatHistory((prevState) => ({
      ...prevState,
      [props.keyChat]: [
        ...(prevState[props.keyChat] || []),
        ["viz", inputValue],
      ],
    }));
    setInputValue("");
    const input = "edit " + userInput;
    try {
      const response = await chatService.edit(
        input,
        filename,
        timestamp_query,
        timestamp,
        title.replace(/\s/g, "_"),
        Cookies.get("accessToken")
      );
      // const data = await getItem("dy-t1", {
      //   pk: { S: Cookies.get("user") },
      //   sk: {
      //     S:
      //       filename +
      //       "_" +
      //       response.data.title.replace(/\s/g, "_") +
      //       "${process.env.REACT_APP_UNCODE}" +
      //       timestamp.toString(),
      //   },
      // });
      // const res = await getObject(
      //   "graph-uploads-hepha",
      //   data.path.S + "/file.json"
      // );
      // const jsonData = JSON.parse(JSON.parse(res.Body));
      const jsonData = JSON.parse(response.data.chart);
      setchatHistory((prevChatHistory) => {
        const lastChat = [...prevChatHistory[props.keyChat]];
        lastChat[lastChat.length - 1].push(jsonData);
        lastChat[lastChat.length - 1].push(response.data.comment);
        lastChat[lastChat.length - 1].push({
          filename: filename,
          title: response.data.title,
          timestamp: timestamp.toString(),
        });
        return {
          ...prevChatHistory,
          [props.keyChat]: lastChat,
        };
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        props.logout();
      } else {
        setchatHistory((prevChatHistory) => {
          const lastChat = [...prevChatHistory[props.keyChat]];
          lastChat[lastChat.length - 1][0] = "error";
          lastChat[lastChat.length - 1].push(
            "Sorry! I can't visualize it. Please try again!!!"
          );
          return {
            ...prevChatHistory,
            [props.keyChat]: lastChat,
          };
        });
      }
    } finally {
      props.setChartPrivate(chatHistory);
      setIsLoading(false);
      props.savehistory();
    }
  };

  const recomment = (event) => {
    setInputValue(event.target.value);
    addHistory(event);
  };

  const handleInputChange = (event) => {
    const txt = event.target.value;
    setInputValue(txt);

    const display = txt === "/" ? "block" : "none";
    const dropElement = document.getElementById("drop");

    if (dropElement) {
      dropElement.style.display = display;
    }
  };

  const tabSuggest = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const texts = inputValue.split(" ");
      if (texts.length <= 1) {
        const text = texts[0];
        if (text.length > 0 && !commandList.includes(text)) {
          const filteredSuggestions = commandList.filter((suggestion) =>
            suggestion.toLowerCase().includes(text.toLowerCase())
          );
          const suggestionIndex =
            (suggestionIndex + 1) % filteredSuggestions.length;
          setSuggestionIndex(suggestionIndex);
          const nextSuggestion = filteredSuggestions[suggestionIndex];
          setInputValue(nextSuggestion);
        } else {
          const suggestionIndex = (suggestionIndex + 1) % commandList.length;
          setSuggestionIndex(suggestionIndex);
          const nextSuggestion = commandList[suggestionIndex];
          setInputValue(nextSuggestion);
        }
      }
    }
  };

  const receiveChart = (chart) => {
    setReceivedChart(chart);
  };

  const toggleChartCollapse = () => {
    setCollapseChart((prevState) => !prevState);
  };

  useEffect(() => {
    if (props.chartToMove) {
      receiveChart(props.chartToMove);
      const data = props.jsonRequest;
      updateJsonRequest(data.filename, data.title, data.timestamp);
      setchatHistory(props.historyChart);
    }
  }, [props.chartToMove]);

  const updateParentValue = (newValue) => {
    setInputValue(newValue);
  };

  const updateJsonRequest = (filename, title, timestamp) => {
    setTitle(title);
    setFilename(filename);
    setTimestampQuery(timestamp);
  };
  useEffect(() => {
    scrollReffPrv.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatHistory, inputValue, props.show]);

  return (
    <MDBRow style={{width:'100%', height:'100%'}}>
      <MDBCol md="12" lg="12" xl="12" style={{ height: "90vh" }}>
        <MDBCard
          id="chat4"
          style={{ background: "none", marginBottom: "0%" }}
          shadow="none"
        >
          <div
            className="overflow-auto"
            style={{
              position: "relative",
              height: "79vh",
              background: "none",
              borderRadius: "30px",
              overflowX: "hidden",
            }}
          >
            <Button
              onClick={toggleChartCollapse}
              style={{ width: "100%", marginTop: "20px" }}
            >
              {collapseChart ? "Hide Chart" : "Show Chart"}
            </Button>
            <MDBCollapse show={collapseChart}>
              <div className="received-chart" style={{ height: "50vh" }}>
                <CardforChatbot chart={receivedChart} />
              </div>
            </MDBCollapse>
            <MDBCardBody>
              {chatHistory[props.keyChat] &&
                chatHistory[props.keyChat].map((history, index) => (
                  <div key={index} ref={scrollReffPrv}>
                    <ContentUser user={history[1]} />
                    {history[0] === "chat" ? (
                      <>
                        <ContentAI bot={history[2]} />
                        {history[3] && <ContentAI bot={history[3]} />}
                      </>
                    ) : history[0] === "error" ? (
                      <ContentAI bot={history[2]} />
                    ) : (
                      <div>
                        <ChartAI
                          moveChartToGallery={props.moveChartToGallery}
                          savehistory={props.savehistory}
                          jsonData={history[2]}
                          jsonRequest={history[4]}
                        />
                        <ContentAI bot={history[3]} />
                      </div>
                    )}
                  </div>
                ))}
            </MDBCardBody>
          </div>
          <MDBCol md="12" lg="12" xl="12" className="m-2">
            {nextQuestion &&
              nextQuestion.map((ques, index) => (
                <Button
                  key={index}
                  value={ques}
                  onClick={recomment}
                  variant="outline-secondary"
                >
                  {ques}
                </Button>
              ))}
            <MDBBtn
              style={{
                background: "none",
                position: "absolute",
                right: "15px",
                bottom: "60px",
                boxShadow: "0px 2px 4px #c4c4c4",
                borderRadius: "10px",
                border: "none",
              }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className="btnPredict"
            >
              Chat
            </MDBBtn>
          </MDBCol>
          <MDBCardFooter
            className="text-muted d-flex justify-content-start align-items-center p-3"
            style={{
              borderWidth: 0,
              background: "#fff",
              height: "5vh",
              borderRadius: 40,
              shadowColor: "#3b71ca",
              boxShadow: "-2px 2px 5px #888888",
              margin: "0px 23px 0px 23px",
            }}
          >
            <form style={{ width: "100%" }} onSubmit={addHistory}>
              <input
                type="text"
                className={`form-control form-control-md ${
                  isLoading ? "d-none" : ""
                }`}
                id="exampleFormControlInput3"
                value={inputValue}
                placeholder="Type message"
                onChange={handleInputChange}
                onKeyDown={tabSuggest}
              />
              {isLoading && (
                <TailSpin
                  height="30"
                  width="30"
                  color="#54b4d3"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              )}
            </form>
            <Command onUpdateParentValue={setInputValue} state={commandList} />
            <Button
              onClick={addHistory}
              style={{
                background: "none",
                borderRadius: 10,
                boxShadow: "none",
                border: "none",
              }}
              disabled={!inputValue}
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
          </MDBCardFooter>
          <ChatModal
            key={`chat-${props.keyChat}`}
            chat={props.chatModalHistoryPrivate[props.keyChat]}
            filename={filename}
            show={open}
            timestamp={timestamp_query}
            title={title ? title.replace(/\s/g, "_") : ""}
            setchat={setChatModalPrivate}
            logoutmodal={props.logout}
            savehistorymodal={props.savehistory}
            onHide={() => setOpen((prev) => !prev)}
          />
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default ChatPrivate;
