import React, { useEffect, useState, useRef } from "react";
import Chat from "./component/chat/Chat";
import Gallery from "./component/visualize/Gallery";
import Tab from "react-bootstrap/Tab";
import { s3 } from "./scripts/awsClient.js";
import { deleteS3Object } from "./scripts/functionS3.js";
import { deleteItem } from "./scripts/dynamodb.js";
import Cookies from "js-cookie";
import Papa from "papaparse";
import { LuUserCircle2 } from "react-icons/lu";
import Dashboard_v2 from "./component/visualize/Dashboard.v2";
import { BsFillCloudMoonFill, BsSun } from "react-icons/bs";
import { Dropdown, Form, Image, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logolight from "../src/component/homepage/Image/Datalace-01.png.png";
import logodark from "../src/component/homepage/Image/Datalace-01.png.png";
import ProfileUser from "./component/chat/ProfileUser.jsx";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import HighLight from "./component/chat/HighLight.jsx";
import HighLight1 from "./component/visualize/HighLight1.jsx";
import { getObject } from "./scripts/functionS3.js";
import { MdOutlineMenu } from "react-icons/md";
import { logoRepo } from "./logo.svg";

export default function App() {
  const defaultTheme = matchMedia("(prefers-color-scheme: light)").matches;
  const [state, setState] = useState({
    isData: false,
    csvData: [],
    pdfUrl: null,
    imgUrl: null,
    chatTabs: [],
    chartDashboards: [],
    chartComponents: [],
    chartHighLight: [],
    activeKey: "chat-1",
    username: "",
    responsiveNav: false,
  });
  const chatRef = useRef(null);
  const [theme, setTheme] = useState(defaultTheme);
  const navigate = useNavigate();
  const [tab, settab] = useState("");
  const [isIpad, setIsIpad] = useState(false);
  const logOut = () => {
    // chatRef.current();
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      // if (cookieName != 'user') {
      Cookies.remove(cookieName);
      // }
    }
    navigate("/login");
  };

  const setChatTab = (chatTab) => {
    setState((prevState) => ({
      ...prevState,
      chatTabs: chatTab,
    }));
  };

  const addTab = (tab) => {
    setState((prevState) => ({
      ...prevState,
      chatTabs: [...prevState.chatTabs, tab],
    }));
  };
  const moveChartToDashboard = (chartComponent, jsonRequest) => {
    setState((prevState) => {
      const { chartDashboards } = prevState;
      const chartExists = prevState.chartDashboards.some(
        (chart) => chart[1].timestamp === jsonRequest.timestamp
      );

      if (!chartExists) {
        return {
          ...prevState,
          activeKey: "dashboard",
          chartDashboards: [...chartDashboards, [chartComponent, jsonRequest]],
        };
      }

      return prevState;
    });
  };
  const moveChartToGallery = (chartComponent, jsonRequest) => {
    setState((prevState) => {
      const { chartComponents } = prevState;
      const chartExists = prevState.chartComponents.some(
        (chart) => chart[1].timestamp === jsonRequest.timestamp
      );

      if (!chartExists) {
        return {
          ...prevState,
          activeKey: "gallery",
          chartComponents: [...chartComponents, [chartComponent, jsonRequest]],
        };
      }

      return prevState;
    });
  };
  const setHighLight = (highlight) => {
    setState((prevState) => ({
      ...prevState,
      chartHighLight: highlight,
    }));
  };
  const setDashBoard = (dashboard) => {
    setState((prevState) => ({
      ...prevState,
      chartDashboards: dashboard,
    }));
  };
  const setGallery = (gallery) => {
    setState((prevState) => ({
      ...prevState,
      chartComponents: gallery,
    }));
  };
  const moveChartToChat = (chartComponent, jsonRequest) => {
    setState((prevState) => ({
      ...prevState,
      chatTabs: [...prevState.chatTabs, ["chart", chartComponent, jsonRequest]],
    }));
  };

  const deleteAWSClound = async (jsonRequest) => {
    const item = await deleteItem("dy-t1", {
      pk: { S: Cookies.get("user") },
      sk: {
        S:
          jsonRequest.filename +
          "_" +
          jsonRequest.title +
          "448096f0-12b4" +
          jsonRequest.timestamp.toString(),
      },
    });
    if (item) await deleteS3Object("graph-uploads-hepha", item.path.S);
  };

  const removeChartFromGallery = (chartToRemove, jsonRequest) => {
    setState((prevState) => ({
      ...prevState,
      chartComponents: prevState.chartComponents.filter(
        (chart) => chart[0] !== chartToRemove && chart[1] !== jsonRequest
      ),
    }));
  };

  const removeChartFromDashboard = (chartToRemove, jsonRequest) => {
    setState((prevState) => ({
      ...prevState,
      chartDashboards: prevState.chartDashboards.filter(
        (chart) => chart[0] !== chartToRemove && chart[1] !== jsonRequest
      ),
    }));
  };

  const loadImgFromS3 = async (bucketName, objectName) => {
    const params = {
      Bucket: bucketName,
      Key: objectName,
    };

    try {
      const data = await s3.getObject(params).promise();
      const imgBlob = new Blob([data.Body]);
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = URL.createObjectURL(imgBlob);
        setState((prev) => ({
          ...prev,
          imgUrl: imageUrl,
          pdfUrl: null,
          isData: true,
          csvData: [],
        }));
      };

      reader.readAsDataURL(imgBlob);
    } catch (err) {
      console.error("Error loading Image from S3:", err);
      // Handle error if needed
    }
  };

  const loadPdfFromS3 = async (bucketName, objectName) => {
    try {
      const data = await getObject(bucketName, objectName);
      const pdfBlob = new Blob([data.Body]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setState((prev) => ({
          ...prev,
          pdfUrl: reader.result,
          isData: true,
          csvData: [],
        }));
      };

      reader.readAsDataURL(pdfBlob);
    } catch (err) {
      console.error("Error loading PDF from S3:", err);
      // Handle error if needed
    }
  };
  const loadCsvFromS3 = async (bucketName, objectName) => {
    try {
      const data = await getObject(bucketName, objectName);
      Papa.parse(data.Body.toString(), {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          setState((prev) => ({
            ...prev,
            csvData: results.data.slice(0, 10),
            isData: true,
            pdfUrl: null,
          }));
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
          // Handle error if needed
        },
      });
    } catch (err) {
      console.error("Error loading CSV from S3:", err);
      // Handle error if needed
    }
  };

  useEffect(() => {
    document.body.classList.remove(theme ? "dark" : "light");
    document.body.classList.add(theme ? "light" : "dark");
  }, [theme]);
  const handleTheme = () => {
    setTheme(!theme);
  };
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      chatTabs: state.chatTabs,
      chartDashboards: state.chartDashboards,
      reponsiveNav: window.innerWidth <= 1400,
    }));
  }, []);

  const onSelect = (k) => {
    settab(k);
    setState((prevState) => ({
      ...prevState,
      activeKey: k,
    }));
  };
  const [selectedModel, setSelectedModel] = useState("5"); // Initial state

  const handleChangeModel = (event) => {
    setSelectedModel(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsIpad(window.innerWidth <= 1024);
    };

    // Initial check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Tab.Container
      className="containerMain"
      p={20}
      defaultActiveKey="chat-1"
      activeKey={state.activeKey}
      onSelect={onSelect}
    >
      <Nav variant="pills" id="navContainer" style={{ height: "10vh" }}>
        {isIpad ? (
          <img
            src={require("./logo.svg").default}
            alt="mySvgImage"
            style={{ height: "60%", marginLeft:'4%' }}
            onClick={() => {
              navigate("/");
            }}
          />
        ) : (
          <Image
            src={theme ? require("./logo-1.svg").default : require("./logo-1.svg").default}
            style={{
              marginLeft: "5%",
              position: "absolute",
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
        )}

        <Nav.Item>
          <Nav.Link eventKey={"chat-1"} style={{ textTransform: "capitalize" }}>
            Visualize
          </Nav.Link>
          <Nav.Link
            eventKey={"gallery"}
            style={{ textTransform: "capitalize" }}
          >
            Gallery
          </Nav.Link>
          <Nav.Link
            eventKey={"dashboard"}
            style={{ textTransform: "capitalize" }}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            eventKey={"highlight"}
            style={{ textTransform: "capitalize" }}
          >
            Highlight
          </Nav.Link>
          {/* {Cookies.get("user") === "admin" ? ( */}
          {/* ////select model ở đây */}
          <Nav.Link>
            <Form.Group className="d-flex ">
              <div className=" "></div>
              <div className=" " >
                <Form.Select
                  id="selectModel"
                  className="selectModel"
                  value={selectedModel}
                  onChange={handleChangeModel}
                >
                  {/* <option value="0">Default Model</option> */}
                  {/* <option value="1">Mistral </option>
                    <option value="2">CodeFuse</option>
                    <option value="3">DeepSeek</option>
                    <option value="4">Phind</option> */}
                  <option value="1">Custom Model</option>
                  <option value="2">Custom Model</option>
                  <option value="3">Custom Model</option>
                  <option value="4">Custom Model</option>
                  <option value="5">Custom Model</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Nav.Link>
          {/* // ) : null} */}
        </Nav.Item>

        <div
          className={
            state.responsiveNav ? "icon-header reponsive" : "icon-header"
          }
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            position: "absolute",
            right: "2%",
          }}
        >
          <button
            id="btn-language"
            style={{
              marginRight: "4rem",
              padding: "8px",
              background: "none",
              color: "white",
              border: "1px solid white",
              borderRadius: "10px",
            }}
          >
            EN
          </button>

          <button
            onClick={() => handleTheme()}
            style={{ background: "none", border: "none" }}
          >
            {theme ? (
              <BsSun size={35} />
            ) : (
              <BsFillCloudMoonFill size={35} color="white" />
            )}
          </button>
          <Dropdown style={{ height: "35px" }}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                background: "none",
                height: "45px",
                border: "none",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: "0 50px",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    height: "100%",
                    marginRight: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {Cookies.get("user")}
                </span>
                <LuUserCircle2 size={35} />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              <Dropdown.Item eventKey={"profile"}>
                <ImProfile size={25} style={{ marginRight: "6%" }} />
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logOut}>
                {" "}
                <IoIosLogOut size={25} style={{ marginRight: "6%" }} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <MdOutlineMenu
          size={35}
          className={state.responsiveNav ? "iconMenu reponsive" : "iconMenu"}
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              responsiveNav: !prevState.responsiveNav,
            }));
          }}
        />
      </Nav>

      <Tab.Content style={{ height: "88vh", width: "100%" }}>
        <Tab.Pane eventKey={"chat-1"} style={{ height: "100%", width: "100%" }}>
          <Chat
            chatRef={chatRef}
            highlight={state.chartHighLight}
            setHighLight={setHighLight}
            loadPDF={loadPdfFromS3}
            loadCSV={loadCsvFromS3}
            loadImg={loadImgFromS3}
            csv={state.csvData}
            pdf={state.pdfUrl}
            img={state.imgUrl}
            disabled={!state.isData}
            moveChartToGallery={moveChartToGallery}
            addTab={addTab}
            model={selectedModel}
            chatTabs={state.chatTabs}
            setChatTab={setChatTab}
            dashboard={state.chartDashboards}
            gallery={state.chartComponents}
            setDashBoard={setDashBoard}
            setGallery={setGallery}
            logout={logOut}
            moveChartToChat={moveChartToChat}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={"gallery"}>
          <Gallery
            savehistory={() => chatRef.current()}
            chartComponents={state.chartComponents}
            moveChartToDashboard={moveChartToDashboard}
            moveChartToChat={moveChartToChat}
            removeChartFromGallery={removeChartFromGallery}
            deleteAWSClound={deleteAWSClound}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={"dashboard"}>
          <Dashboard_v2
            savehistory={() => chatRef.current()}
            items={state.chartDashboards}
            moveChartToChat={moveChartToChat}
            moveChartToGallery={moveChartToGallery}
            removeChartFromDashboard={removeChartFromDashboard}
            deleteAWSClound={deleteAWSClound}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={"highlight"}>
          <HighLight1 items={state.chartHighLight} keys={tab} />
        </Tab.Pane>
        <Tab.Pane eventKey={"profile"}>
          <ProfileUser />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}
