import React, { useContext } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Oval } from "react-loader-spinner";
import ContentAI from "./ContentAI";
import ContentUser from "./ContentUser";
import Command from "./Command";
import Button from "react-bootstrap/Button";
import SpeechToText from "./SpeedToText.jsx";
import {
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
  Tooltip,
} from "@chakra-ui/react";
import {
  checkBucketExits,
  deleteObject,
  checkObjectExits,
  getObject,
  getObjects,
  getObjectsofMore,
  getNewHistory,
  getKeysObject,
  getNameTimeStamp,
} from "../../scripts/functionS3.js";

import { uploadLargeFile, uploadObject } from "../../scripts/uploadS3.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import ChartAI from "./ChartAI";
import { getItem } from "../../scripts/dynamodb.js";
import Side from "../side/Side";
import chatService from "../../services/chat.js";
import {
  PiUploadSimple,
  PiFileCsvLight,
  PiFilePdfLight,
  PiFileXls,
} from "react-icons/pi";
import { FaFolderOpen, FaStar } from "react-icons/fa";
import { BsFiletypeJson, BsFiletypeXls, BsFiletypeXlsx } from "react-icons/bs";
import { IoCloseSharp, IoFileTraySharp, IoSendSharp } from "react-icons/io5";
import { withRouter } from "../../scripts/withRouter.js";
import { RiFolderHistoryFill } from "react-icons/ri";
import * as XLSX from "xlsx";
import { Container, Form, Modal, Nav, Tab } from "react-bootstrap";
import { BiHistory, BiMenu, BiX } from "react-icons/bi";
import ChatPrivate from "./ChatPrivate.jsx";
import Translate from "./Translate.jsx";
import HighLight from "./HighLight.jsx";
import Predict from "./PredictChart.jsx";
import { IoIosArrowBack, IoMdArrowBack } from "react-icons/io";
import { MdHistory, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { MdOutlineInsertChart } from "react-icons/md";
import ChatModal from "./ChatModal.jsx";
import { VscFeedback } from "react-icons/vsc";
import Draggable from "react-draggable";
import { IoIosStarOutline } from "react-icons/io";
import styled from "styled-components";
import moment from "moment";
import Instruction from "./Instruction.jsx";
import "./Chat.css";
import { IoIosAdd } from "react-icons/io";
import { languageContext } from "../Home.jsx";

export class Chat extends React.Component {
  //  language = React.useContext(languageContext);
  constructor(props) {
    super(props);
    this.state = {
      commandList: ["/visualize"],
      inputValue: "",
      chatHistory: [],
      suggestionIndex: -1,
      fileUploadState: "",
      filename: "",
      filenameExcel: [],
      selectedFile: null,
      FolderData: null,
      isLoading: false,
      nextQuestion: [],
      typefile: "",
      sizes: [200, 100, "auto"],
      openFile: false,
      xlsData: [],
      openMenu: false,
      eventKeyChat: "chat",
      eventKeyChatPrivate: "",
      eventKeyHightLight: "",
      eventKeyTranslate: "",
      eventKeyPredict: "",
      chatToPrivate: [],
      jsonDataPrivate: [],
      dataHightLight: [],
      moreDatasHL: [],
      dataTranslate: [],
      dataPredict: [],
      typeMenu: "",
      selectedOption: null,
      chatPrivae: {},
      loadingHis: null,
      openChatModal: false,
      chatModalHistory: [],
      chatModalHistoryPrivate: {},
      openVoice: false,
      showFeedBack: false,
      timeStampUpload: null,
      rate: 0,
      timeHistory: [],
      Regenerate: false,
      describe: "",
      activeTab: "chat",
    };

    this.aws = {
      bucketName: "DataUpload",
    };
    this.inputFileReference = React.createRef();
    this.inputFolderReference = React.createRef();
    this.chatContainerRef = React.createRef();
    this.chatNavRef = React.createRef();
    this.latestNavLinkRef = React.createRef();
  }
  setTypeMenuCardChatbot = () => {
    this.setState({ typeMenu: "listChat", openMenu: true, activeTab: this.state.eventKeyChatPrivate });
  };
  fileUploadAction = () => {
    this.inputFileReference.current.click();
  };
  folderUploadAction = () => {
    this.inputFolderReference.current.click();
  };
  folderUploadInputChange = async (e) => {
    this.setState({ isLoading: true });
    const folder = e.target.files;
    const numFilesToUpload = Math.min(folder.length, 6);
    for (let i = 0; i < numFilesToUpload; i++) {
      await uploadLargeFile(
        this.aws.bucketName,
        `folder/${Cookies.get("user")}/${folder[i].webkitRelativePath}`,
        folder[i]
      );
    }
    await chatService
      .uploadFolder(
        folder[0].webkitRelativePath.substring(
          0,
          folder[0].webkitRelativePath.indexOf("/")
        ),
        Cookies.get("accessToken")
      )
      .then((response) => {
        this.inputFolderReference.current.value = null; //reset ref
        this.setState({
          FolderData: response.data,
          chatHistory: [["chat", "", response.data.suggestion]],
          isLoading: false,
          nextQuestion: [],
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ chatHistory: [], isLoading: false, nextQuestion: [] });
        this.inputFileReference.current.value = null;
      })
      .finally(() => {
        this.savehistory();
      });
  };

  activeChatTab = () => {
    if (this.props.chatTabs) {
      const lastTabIndex = this.props.chatTabs.length - 1;

      if (lastTabIndex >= 0) {
        const lastTab = this.props.chatTabs[lastTabIndex];
        const eventKey = `chat-${lastTab[2].title}-${lastTabIndex}`;

        this.setState({
          activeTab: eventKey,
          eventKeyChatPrivate: eventKey,
          chatToPrivate: lastTab[1],
          jsonDataPrivate: lastTab[2],
        });
      }
    }
  }

  fileUploadInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ fileUploadState: file, isLoading: true });
      const checkBucket = await checkBucketExits(this.aws.bucketName);
      if (checkBucket) {
        const storeName = file.name.substring(
          file.name.lastIndexOf("."),
          file.name.length
        );
        let objectName = "";
        this.setState({ typefile: storeName });
        switch (storeName) {
          case ".csv":
            objectName = `csv/${Cookies.get("user")}/${file.name}`;
            break;
          case ".pdf":
            objectName = `pdf/${Cookies.get("user")}/${file.name}`;
            break;
          case ".json":
            objectName = `json/${Cookies.get("user")}/${file.name}`;
            break;
          case ".xlsx":
            objectName = `xlsx/${Cookies.get("user")}/${file.name}`;
            break;
          case ".xls":
            objectName = `xlsx/${Cookies.get("user")}/${file.name}`;
            break;
        }
        // await uploadLargeFile(this.aws.bucketName, objectName, file);
        await chatService
          .upload(file, Cookies.get("accessToken"))
          .then(async (response) => {
            const file_names = response.data.file_names;
            if (file_names.length == 1) {
              if (file_names[0][0].endsWith(".pdf")) {
                this.props.loadPDF(this.aws.bucketName, objectName);
                this.setState({ filename: file_names[0][0] });
              } else {
                this.props.loadCSV(
                  this.aws.bucketName,
                  `original/${Cookies.get("user")}/${file_names[0][0]}`
                );
                this.setState({
                  filename: file_names[0][0],
                  describe: file_names[0][1],
                });
              }
              this.inputFileReference.current.value = null;
            } else {
              file_names.map((file_name, index) => {
                this.props.loadCSV(
                  this.aws.bucketName,
                  `original/${Cookies.get("user")}/${file_name[0]}`
                );
                this.setState({ filenameExcel: file_names[0] });
                this.inputFileReference.current.value = null;
              });
            }
            let dataHigh = null;
            const highlight = await chatService.highlight(
              file_names[0][0],
              true,
              Cookies.get("accessToken")
            );
            dataHigh = highlight.data.data;
            this.props.setHighLight(dataHigh);
            this.savehistory();
            if (!this.state.timeHistory.includes(Cookies.get("timeLogin"))) {
              this.state.timeHistory.push(Cookies.get("timeLogin"));
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.props.logout();
            } else {
              console.error("Error: ", error);
              this.inputFileReference.current.value = null;
            }
          });
        if (file.name.endsWith(".pdf")) {
          await this.props.loadPDF(this.aws.bucketName, objectName);
          this.setState({ filename: file.name });
        } else {
          // await chatService
          //   .clean(file.name, Cookies.get("accessToken"))
          //   .then((response) => {
          //     const file_names = response.data.file_names;
          //     if (file_names.length == 1) {
          //       this.props.loadCSV(
          //         this.aws.bucketName,
          //         `describe/${Cookies.get("user")}/${file_names[0][0]}`
          //       );
          //       this.setState({ filename: file_names[0][0], describe: file_names[0][1] });
          //       this.inputFileReference.current.value = null;
          //     } else {
          //       file_names.map((file_name, index) => {
          //         this.props.loadCSV(
          //           this.aws.bucketName,
          //           `csv/${Cookies.get("user")}/${file_name[0]}`
          //         );
          //         this.setState({ filenameExcel: file_names[0] });
          //         this.inputFileReference.current.value = null;
          //       });
          //     }
          //     this.savehistory();
          //     if (!this.state.timeHistory.includes(Cookies.get("timeLogin"))) {
          //       this.state.timeHistory.push(Cookies.get("timeLogin"));
          //     }
          //   })
          //   .catch((error) => {
          //     if (error.response && error.response.status === 401) {
          //       this.props.logout();
          //     } else {
          //       console.error("Error: ", error);
          //       this.inputFileReference.current.value = null;
          //     }
          //   });
        }

        this.setState({
          chatHistory: [],
          isLoading: false,
          nextQuestion: [],
          chatModalHistory: [],
        });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }
  };

  savehistory = async () => {
    const checkBucket = await checkBucketExits("hephaes-history");
    if (checkBucket) {
      const historyChat = this.state.chatHistory.map((history) => {
        return history.map((item) => JSON.parse(JSON.stringify(item)));
      });
      historyChat.forEach((history) => {
        if (history[0] === "viz") {
          history[2] = `${Cookies.get("user")}/${this.state.filename
            }/${history[4].title.replace(/\s/g, "_")}448096f0-12b4${history[4].timestamp
            }.json`;
        }
      });
      const dashboard = this.props.dashboard.map((item) => {
        return item.map((subItem) => JSON.parse(JSON.stringify(subItem)));
      });
      dashboard.forEach((item) => {
        item[0] = `${Cookies.get("user")}/${item[1].filename
          }/${item[1].title.replace(/\s/g, "_")}448096f0-12b4${item[1].timestamp
          }.json`;
      });
      const gallery = this.props.gallery.map((item) => {
        return item.map((subItem) => JSON.parse(JSON.stringify(subItem)));
      });
      gallery.forEach((item) => {
        item[0] = `${Cookies.get("user")}/${item[1].filename
          }/${item[1].title.replace(/\s/g, "_")}448096f0-12b4${item[1].timestamp
          }.json`;
      });
      const highlight = `highlight/${Cookies.get("user")}/${this.state.filename
        }`;
      const chartHistory = { ...this.state.chatPrivae };
      for (const key of Object.keys(chartHistory)) {
        chartHistory[key] = chartHistory[key].map((history, index) => {
          return history.map((item) => JSON.parse(JSON.stringify(item)));
        });
        chartHistory[key].forEach((history) => {
          if (history[0] === "viz") {
            history[2] = `${Cookies.get("user")}/${this.state.filename
              }/${history[4].title.replace(/\s/g, "_")}448096f0-12b4${history[4].timestamp
              }.json`;
          }
        });
      }
      const historyJson = {
        history: historyChat,
        filename: this.state.filename,
        describe: this.state.describe,
        chattab: this.props.chatTabs,
        dashboard: dashboard,
        chatprivate: chartHistory,
        chatModal: this.state.chatModalHistory,
        chatModalPrivate: this.state.chatModalHistoryPrivate,
        gallery: gallery,
        highlight: highlight,
      };
      const stringHistoryJson = JSON.stringify(historyJson);
      await uploadObject(
        "hephaes-history",
        `${Cookies.get("user")}/${Cookies.get("timeLogin")}.json`,
        stringHistoryJson
      );
      this.sessionChat();
    }
  };

  addHistory = (event) => {
    event.preventDefault();
    if (this.state.inputValue !== "") {
      const timestamp = Date.now();
      this.setState({ isLoading: true });
      this.visualize(timestamp, false);
    }
  };

  regen = (event) => {
    event.preventDefault();
    // if (this.state.inputValue !== "") {
    const timestamp = Date.now();
    this.setState(
      {
        isLoading: true,
        inputValue:
          this.state.chatHistory[this.state.chatHistory.length - 1][1],
      },
      () => {
        this.visualize(timestamp, true);
      }
    );
    // }
  };
  visualize = async (timestamp, re) => {
    if (this.state.filename === "") {
      this.setState((prevState) => ({
        chatHistory: [
          ...prevState.chatHistory,
          ["error", this.state.inputValue, "Sorry! I don't have any file"],
        ],
        inputValue: "",
        isLoading: false,
      }));
    } else {
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, ["viz", this.state.inputValue]],
        inputValue: "",
      }));
      let response = null
      if (re) {
        response = await chatService.regenerate(this.state.inputValue, this.state.filename, Cookies.get("accessToken"), timestamp, this.props.model)
      }
      else {
        response = await chatService.visualize
          (
            this.state.inputValue,
            this.state.filename,
            timestamp,
            Cookies.get("accessToken"),
            this.props.model
          )
      }
      try {
        const jsonData = JSON.parse(response.data.chart);
        this.state.chatHistory[this.state.chatHistory.length - 1].push(
          jsonData
        );
        this.state.chatHistory[this.state.chatHistory.length - 1].push(
          response.data.comment
        );
        this.state.chatHistory[this.state.chatHistory.length - 1].push({
          filename: this.state.filename,
          title: response.data.title,
          timestamp: timestamp.toString(),
        });
        this.setState({ Regenerate: false });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.setState((prevState) => ({
            chatHistory: prevState.chatHistory.slice(0, -1),
          }));
          this.props.logout();
        } else {
          console.log("LOIIII")
          console.error("Error: ", error);
          this.state.chatHistory[this.state.chatHistory.length - 1][0] =
            "error";
          this.state.chatHistory[this.state.chatHistory.length - 1].push(
            "Sorry! I can't visualize it. Please try again!!!"
          );
          this.setState({ Regenerate: true });
        }
      }
      finally {
        console.log("finally")
        this.setState({
          chatHistory: this.state.chatHistory,
          isLoading: false,
        });
        this.savehistory();
      }
      // chatService
      //   .visualize(
      //     this.state.inputValue,
      //     this.state.filename,
      //     timestamp,
      //     Cookies.get("accessToken"),
      //     this.props.model
      //   )
      //   .then(async (response) => {
      // const data = await getItem("dy-t1", {
      //   pk: { S: Cookies.get("user") },
      //   sk: {
      //     S:
      //       this.state.filename +
      //       "_" +
      //       response.data.title.replace(/\s/g, "_") +
      //       "448096f0-12b4" +
      //       timestamp.toString(),
      //   },
      // });
      // const res = await getObject(
      //   "graph-uploads-hepha",
      //   data.path.S + "/file.json"
      // );
      // const jsonData = JSON.parse(JSON.parse(res.Body));
      // const jsonData = JSON.parse(response.data.chart);
      // this.state.chatHistory[this.state.chatHistory.length - 1].push(
      //   jsonData
      // );
      // this.state.chatHistory[this.state.chatHistory.length - 1].push(
      //   response.data.comment
      // );
      // this.state.chatHistory[this.state.chatHistory.length - 1].push({
      //   filename: this.state.filename,
      //   title: response.data.title,
      //   timestamp: timestamp.toString(),
      // });
      // this.setState({ Regenerate: false });
      // })
      // .catch((error) => {
      //   if (error.response && error.response.status === 401) {
      //     this.setState((prevState) => ({
      //       chatHistory: prevState.chatHistory.slice(0, -1),
      //     }));
      //     this.props.logout();
      //   } else {
      //     console.error("Error: ", error);
      //     this.state.chatHistory[this.state.chatHistory.length - 1][0] =
      //       "error";
      //     this.state.chatHistory[this.state.chatHistory.length - 1].push(
      //       "Sorry! I can't visualize it. Please try again!!!"
      //     );
      //     this.setState({ Regenerate: true });
      //   }
      // })
      // .finally(() => {
      //   this.setState({
      //     chatHistory: this.state.chatHistory,
      //     isLoading: false,
      //   });
      //   this.savehistory();
      // });
    }
  };
  async componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.chatContainerRef.current) {
      this.chatContainerRef.current.scrollTop =
        this.chatContainerRef.current.scrollHeight;
    }
  };
  // predict = () => {
  //   const ws = new WebSocket("ws://localhost:8000/ws");
  //   chatService.predict(
  //     this.state.filename,
  //     "True",
  //     "",
  //     "",
  //     Cookies.get("accessToken")
  //   );
  //   ws.onopen = (event) => {
  //     // console.log("WebSocket connected:", event);
  //   };

  //   ws.onmessage = (event) => {
  //     if (event.data) {
  //       ws.close();
  //       getObjectsofMore(
  //         "predict-hepha",
  //         Cookies.get("user") + "/" + this.state.filename
  //       )
  //         .then((datas) => {
  //           const jsonDatas = datas.map((data) => {
  //             return JSON.parse(data.Body);
  //           });
  //           this.props.addTab(["predict", jsonDatas]);
  //         })
  //         .catch((error) => {
  //           console.error("Error: ", error);
  //         })
  //         .finally(() => {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         });
  //     }
  //   };

  //   ws.onclose = (event) => {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   };
  // };

  recomment = (event) => {
    this.setState({ inputValue: event.target.value }, () => {
      this.addHistory(event);
    });
  };

  handleInputChange = (event) => {
    const txt = event.target.value;
    this.setState({ inputValue: txt });
    const display = txt === "/" ? "block" : "none";
    const dropElement = document.getElementById("drop");
    if (dropElement) {
      dropElement.style.display = display;
    }
  };

  async componentDidMount() {
    this.props.chatRef.current = this.savehistory;
    const exit = await checkObjectExits("hephaes-history", Cookies.get("user"));
    if (exit) {
      if (!Cookies.get("logined") === "true") {
        this.setState({ reload: true });
      } else {
        this.reloadSession();
      }
      this.sessionChat();
    }
  }

  sessionChat = async () => {
    const timeHistory = await getKeysObject(
      "hephaes-history",
      Cookies.get("user")
    );
    const promises = timeHistory.map(async (time) => {
      try {
        const name = await this.getName(time);
        return {
          name,
          time,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    });
    const results = await Promise.all(promises);
    this.setState({ timeHistory: results });
  };

  reloadSession = async () => {
    this.setState({ loadingHis: true });
    try {
      const loadFile = () => {
        const filePath = `/${Cookies.get("user")}/${jsonData.filename}`;
        if (jsonData.filename.endsWith(".pdf")) {
          this.props.loadPDF(this.aws.bucketName, "pdf" + filePath);
        } else {
          this.props.loadCSV(this.aws.bucketName, "original" + filePath);
        }
      };
      let res = null;
      if (Cookies.get("logined") === "true") {
        res = await getObject(
          "hephaes-history",
          `${Cookies.get("user")}/${Cookies.get("timeLogin")}.json`
        );
      } else {
        res = await getNewHistory("hephaes-history", Cookies.get("user"));
        Cookies.set("logined", true);
      }
      const jsonData = JSON.parse(res.Body);

      const [historyChat, dashboard, gallery] = await Promise.all([
        Promise.all(
          jsonData.history.map(async (history, index) => {
            if (history[0] === "viz") {
              const objectName = history[2];
              const data = await getObject("DataGraph", objectName);
              history[2] = JSON.parse(data.Body);
            }
            return history;
          })
        ),
        Promise.all(
          jsonData.dashboard.map(async (item, index) => {
            const data = await getObject("DataGraph", item[0]);
            item[0] = JSON.parse(data.Body);
            return item;
          })
        ),
        Promise.all(
          jsonData.gallery.map(async (item, index) => {
            const data = await getObject("DataGraph", item[0]);
            item[0] = JSON.parse(data.Body);
            return item;
          })
        ),
      ]);
      const highlight = await getObjects("DataGraph", jsonData.highlight);
      await highlight.map((data, index) => {
        data = JSON.parse(data);
        return data;
      });
      this.props.setHighLight(highlight);
      this.props.setDashBoard(dashboard);
      this.props.setGallery(gallery);
      const [chatPrivate, chatTab] = await Promise.all([
        (async () => {
          const chartprivate = jsonData.chatprivate;
          if (chartprivate) {
            for (const key of Object.keys(chartprivate)) {
              await Promise.all(
                chartprivate[key].map(async (history, index) => {
                  if (history[0] === "viz") {
                    const objectName = history[2];
                    const data = await getObject("DataGraph", objectName);
                    history[2] = JSON.parse(data.Body);
                  }
                  return history;
                })
              );
            }
            return chartprivate;
          }
        })(),
        this.props.setChatTab(jsonData.chattab),
      ]);
      const storeName = jsonData.filename.substring(
        jsonData.filename.lastIndexOf("."),
        jsonData.filename.length
      );
      this.setState({ typefile: storeName });
      loadFile();
      this.setState({
        openFile: false,
        chatPrivae: chatPrivate,
        chatHistory: historyChat,
        filename: jsonData.filename,
        describe: jsonData.describe,
        loadingHis: false,
        chatModalHistory: jsonData.chatModal,
        chatModalHistoryPrivate: jsonData.chatModalPrivate,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        loadingHis: false,
      });
    }
  };

  getName = async (time) => {
    return await getNameTimeStamp(
      "hephaes-history",
      `${Cookies.get("user")}/${time}.json`
    );
  };

  updateParentValue = (newValue) => {
    this.setState({ inputValue: newValue });
  };

  handleSizeChange = (sizes) => {
    this.setState({ sizes });
  };

  handleUpLoadedFile = () => {
    this.setState({ openFile: !this.state.openFile });
  };

  handleOpenScran = (value) => {
    this.setState({ openScran: value });
  };
  handleOpenMenu = () => {
    this.setState({ openMenu: !this.state.openMenu });
  };

  setChartPrivate = (chartprivate) => {
    this.setState({ chatPrivae: chartprivate });
  };

  setChatModel = (chatHistory) => {
    this.setState({ chatModalHistory: chatHistory });
  };

  setChatModalPrivate = (key, chatHistory) => {
    this.setState((prev) => ({
      chatModalHistoryPrivate: {
        ...prev.chatModalHistoryPrivate,
        [key]: chatHistory,
      },
    }));
  };
  handleActiveTab = (value) => {
    this.setState({ activeTab: value })
  }

  render() {
    const Radio = styled.input`
      display: none;
    `;
    const Rating = styled.div`
      cursor: pointer;
    `;
    return (
      <>
        {this.state.loadingHis ? (
          <div className="loadingWrap">
            <Oval
              visible={this.state.loadingHis}
              color="rgba(0, 23, 141, 1)"
              secondaryColor="rgba(9, 83, 151, 1)"
              strokeWidth={5}
              strokeWidthSecondary={5}
            ></Oval>
          </div>
        ) : null}
        <Tab.Container
          className="container-fluid tabContainer"
          defaultActiveKey={this.state.eventKeyChat}
          activeKey={this.state.activeTab}
        >
          <div
            style={{
              width: "99.6%",
              display: "flex",
              justifyContent: "space-between",
              height: '100%'
            }}
          >
            <div
              style={{
                width: this.state.openMenu ? "20%" : "3%",
                transition: "width ease-in-out .3s",
              }}
              className={this.state.openMenu ? `menuWrap open` : 'menuWrap'}
            >
              {this.state.openMenu ? (
                <IoIosArrowBack
                  size={30}
                  style={{
                    cursor: "pointer",
                    marginTop: "20px",
                    marginLeft: "4%",
                  }}
                  onClick={() => this.handleOpenMenu()}
                />
              ) : (
                <div className="menuIcon" style={{ paddingLeft: "20%", marginTop: "20%" }}>
                  <div
                    className="menu-tooltip-btn-layout"
                    style={{ position: "absolute" }}
                  >
                    <BiMenu
                      size={'12%'}
                      style={{
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => {
                        this.handleOpenMenu();
                        this.setState({ typeMenu: "listChat" });
                      }}
                    />
                    <span className="menu-tooltip-layout">Menu chat</span>
                  </div>
                  <div
                    className="menu-tooltip-btn-layout"
                    style={{ position: "absolute", top: "32%" }}
                  >
                    <FaFolderOpen
                      size={28}
                      style={{ cursor: "pointer", marginBottom: "50%" }}
                      onClick={() => {
                        this.handleOpenMenu();
                        this.setState({ typeMenu: "listFile" });
                      }}
                    />
                    <span className="menu-tooltip-layout">List file</span>
                  </div>
                  <div
                    className="menu-tooltip-btn-layout"
                    style={{ position: "absolute", top: "25%" }}
                  >
                    <IoFileTraySharp
                      size={28}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.handleOpenMenu();
                        this.setState({ typeMenu: "listHistoryFile" });
                      }}
                    />
                    <span className="menu-tooltip-layout">Excel</span>
                  </div>
                  <div
                    className="menu-tooltip-btn-layout"
                    style={{ position: "absolute", top: "18%" }} ///icon opent history
                  >
                    <BiHistory
                      size={30}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.handleOpenMenu();
                        this.setState({ typeMenu: "listHistory" });
                      }}
                    />
                    <span className="menu-tooltip-layout">History</span>
                  </div>
                  <div
                    className="menu-tooltip-btn-layout"
                    style={{ position: "absolute", top: "39%" }}
                  >
                    {Cookies.get("user") === "admin" ? (
                      <VscFeedback
                        size={28}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({ showFeedBack: true });
                        }}
                      />
                    ) : null}
                    <span className="menu-tooltip-layout">FeedBack</span>

                    <Modal
                      show={this.state.reload}
                      onHide={() => {
                        this.setState({
                          reload: !this.state.reload,
                        });
                      }}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      className="modalSession"
                    >
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <h4>Do you want reload session?</h4>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={() => {
                            this.setState({ reload: !this.state.reload });
                            Cookies.set("logined", true);
                          }}
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => {
                            this.reloadSession();
                            this.setState({ reload: !this.state.reload });
                            Cookies.set("logined", true);
                          }}
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Draggable handle=".modal-content">
                      <Modal
                        show={this.state.showFeedBack}
                        onHide={() => {
                          this.setState({
                            showFeedBack: !this.state.showFeedBack,
                          });
                        }}
                        className="modalFeedBack"
                      >
                        <Modal.Header
                          style={{ background: "#484d5b", cursor: "move" }}
                          closeButton
                        >
                          <Modal.Title style={{ textAlign: "center" }}>
                            FeedBack
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ background: "#484d5b" }}>
                          <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Container
                            style={{
                              width: "100%",
                              textAlign: "center",
                              margin: "4% 0",
                            }}
                          >
                            {[...Array(5)].map((item, index) => {
                              const givenRating = index + 1;
                              return (
                                <label style={{ margin: "0 2%" }}>
                                  <Radio
                                    type="radio"
                                    value={givenRating}
                                    onClick={() => {
                                      this.setState({ rate: givenRating });
                                    }}
                                  />
                                  <Rating>
                                    <FaStar
                                      color={
                                        givenRating < this.state.rate ||
                                          givenRating === this.state.rate
                                          ? "yellow"
                                          : "rgb(192,192,192)"
                                      }
                                      style={{ fontSize: "30px" }}
                                    />
                                  </Rating>
                                </label>
                              );
                            })}
                          </Container>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label style={{ color: "white" }}>
                              Send
                            </Form.Label>
                            <Form.Control as="textarea" rows={3} />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{ background: "#484d5b" }}>
                          <Button
                            variant="secondary"
                            style={{ textTransform: "capitalize" }}
                            onClick={() => {
                              this.setState({
                                showFeedBack: !this.state.showFeedBack,
                              });
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            style={{ textTransform: "capitalize" }}
                            variant="primary"
                          >
                            Feedback
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Draggable>
                  </div>
                </div>
              )}
              <div hidden={!this.state.openMenu}>
                {this.state.typeMenu === "listChat" ? (
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        eventKey={"chat"}
                        className="tabInMenu"
                        onClick={() => {
                          this.setState({ activeTab: "chat" });
                        }}
                      >
                        <MdOutlineMarkUnreadChatAlt
                          size={25}
                          style={{ marginRight: "5%" }}
                        />
                        Chat
                      </Nav.Link>
                      {this.props.chatTabs &&
                        this.props.chatTabs.map((data, index) => {
                          if (data[0] === "chart") {
                            return (
                              <Nav.Link
                                key={`chat-${data[2].title}-${index}`}
                                eventKey={`chat-${data[2].title}-${index}`}
                                className="tabInMenu"
                                style={{
                                  // overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "break-spaces",
                                }}
                                onClick={(e) => {
                                  this.setState({
                                    eventKeyChatPrivate:
                                      e.target.attributes[1].nodeValue,
                                    chatToPrivate: data[1],
                                    jsonDataPrivate: data[2],
                                    activeTab: e.target.attributes[1].nodeValue,
                                  });
                                }}
                              >
                                <MdOutlineInsertChart
                                  size={23}
                                  style={{ marginRight: "5%" }}
                                />
                                {`chat-${data[2].title}`}
                              </Nav.Link>
                            );
                          } else if (data[0] === "predict") {
                            return (
                              <Nav.Link
                                key={`Predict-${index}`}
                                eventKey={`Predict-${index}`}
                                className="tabInMenu"
                                style={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                                onClick={(e) => {
                                  this.setState({
                                    eventKeyPredict:
                                      e.target.attributes[1].nodeValue,
                                    activeTab: e.target.attributes[1].nodeValue,
                                    dataPredict: data[1],
                                  });
                                }}
                              >
                                {`Predict-${index}`}
                              </Nav.Link>
                            );
                          }
                        })}
                    </Nav.Item>
                  </Nav>
                ) : this.state.typeMenu === "listHistoryFile" ? (
                  <UnorderedList spacing="10px">
                    {this.state.filenameExcel.map((fileNameExcel, index) => (
                      <Tooltip
                        label={fileNameExcel}
                        aria-label="Filename"
                        hasArrow
                        maxW="300px"
                        placement="right"
                        backgroundColor={"grey"}
                        border={"1px"}
                        borderRadius={"10px"}
                      >
                        <ListItem
                          key={fileNameExcel}
                          overflow="hidden"
                          backgroundColor={
                            this.state.selectedFile === fileNameExcel
                              ? "aqua"
                              : "grey"
                          }
                          style={{
                            fontSize: "20px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          onClick={() => {
                            this.setState({
                              filename: fileNameExcel,
                              typefile: ".csv",
                              selectedFile: fileNameExcel,
                            });
                            this.props.loadCSV(
                              this.aws.bucketName,
                              `original/${Cookies.get("user")}/${fileNameExcel}`
                            );
                          }}
                        >
                          {fileNameExcel}
                        </ListItem>
                      </Tooltip>
                    ))}
                  </UnorderedList>
                ) : this.state.typeMenu === "listFile" &&
                  this.state.FolderData !== null ? (
                  <UnorderedList spacing="10px">
                    {Object.entries(this.state.FolderData).map(
                      ([fileName, description]) =>
                        fileName.toLowerCase() !== "suggestion" ? (
                          <Tooltip
                            label={description}
                            aria-label="File Description"
                            hasArrow
                            maxW="300px"
                            placement="right"
                            backgroundColor={"grey"}
                            border={"1px"}
                            borderRadius={"10px"}
                          >
                            <ListItem
                              key={fileName}
                              backgroundColor={
                                this.state.selectedFile === fileName
                                  ? "aqua"
                                  : "grey"
                              }
                              style={{
                                fontSize: "20px",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                              overflow="hidden"
                              onClick={() => {
                                const fileExtension = fileName
                                  .split(".")
                                  .pop()
                                  .toLowerCase();
                                const fileNameWithoutExtension = fileName.slice(
                                  0,
                                  fileName.lastIndexOf(".")
                                );
                                this.setState({
                                  filename: fileName,
                                  typefile: `.${fileExtension}`,
                                  selectedFile: fileName,
                                });
                                if (fileExtension === "csv") {
                                  this.props.loadCSV(
                                    this.aws.bucketName,
                                    `original/${Cookies.get("user")}/${fileName}`
                                  );
                                } else if (fileExtension === "pdf") {
                                  this.props.loadPDF(
                                    this.aws.bucketName,
                                    `pdf/${Cookies.get("user")}/${fileName}`
                                  );
                                } else if (fileExtension === "json") {
                                  this.props.loadCSV(
                                    this.aws.bucketName,
                                    `original/${Cookies.get(
                                      "user"
                                    )}/${fileNameWithoutExtension}.csv`
                                  );
                                } else if (
                                  fileExtension === "xlsx" ||
                                  fileExtension === "xls"
                                ) {
                                  this.props.loadCSV(
                                    this.aws.bucketName,
                                    `original/${Cookies.get(
                                      "user"
                                    )}/${fileNameWithoutExtension}.csv`
                                  );
                                }
                              }}
                            >
                              {fileName.replace(/"/g, "")}
                            </ListItem>
                          </Tooltip>
                        ) : null
                    )}
                  </UnorderedList>
                ) : this.state.typeMenu === "listHistory" ? ( ///Pane list history
                  <div>
                    <div
                      className="btn-newChat"
                      style={{
                        background: "#67d3df",
                        margin: "10px",
                        padding: "17px",
                        borderRadius: "0.375rem",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "white",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        const currentTime = Date.now();
                        Cookies.set("timeLogin", currentTime);
                        this.props.setHighLight([]);
                        this.props.setDashBoard([]);
                        this.props.setGallery([]);
                        this.props.setChatTab([]);
                        this.setState(
                          {
                            openFile: false,
                            typefile: "",
                            chatPrivae: [],
                            chatHistory: [],
                            filename: "",
                            describe: "",
                            activeTab: "chat",
                            loadingHis: false,
                            chatModalHistory: [],
                            chatModalHistoryPrivate: [],
                          },
                          () => {
                            this.savehistory();
                          }
                        );
                      }}
                    >
                      <strong>New Chat</strong>{" "}
                      <span>
                        {" "}
                        <IoIosAdd size={"1.75rem"} />
                      </span>
                    </div>
                    <div
                      style={{
                        overflowY: "scroll",
                        height: "72vh",
                      }}
                      className="listHistory"
                    >
                      {this.state.timeHistory.map((result, index) => {
                        const momentObject = moment.unix(
                          Math.floor(parseInt(result.time) / 1000)
                        );
                        const formattedDateTime = momentObject.format(
                          "YYYY-MM-DD HH:mm:ss"
                        );
                        return Cookies.get("timeLogin") === result.time ? (
                          <p
                            key={index}
                            onClick={() => {
                              Cookies.set("timeLogin", result.time);
                              this.reloadSession();
                              this.setState({ activeTab: "chat" });
                            }}
                            style={{
                              background: "#40848c",
                              margin: "10px",
                              padding: "22px 17px",
                              borderRadius: "0.375rem",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              color: "black",
                              position: "relative",
                              fontSize: "13px",
                              overflowWrap: "anywhere",
                            }}
                            disabled={this.state.loadingHis}
                          >
                            <MdHistory
                              size={27}
                              style={{ marginRight: "10px" }}
                            />
                            {result.name} <br />
                            {formattedDateTime}
                            <IoCloseSharp
                              size={25}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "2%",
                                zIndex: "100",
                              }}
                              onClick={async (e) => {
                                e.stopPropagation();
                                await deleteObject(
                                  "hephaes-history",
                                  `${Cookies.get("user")}/${result.time}.json`
                                );
                                this.setState({
                                  openMenu: true,
                                  activeTab: "chat",
                                });
                                if (result.time === Cookies.get("timeLogin")) {
                                  const exit = await checkObjectExits(
                                    "hephaes-history",
                                    Cookies.get("user")
                                  );
                                  if (exit) {
                                    Cookies.set("logined", false);
                                    this.sessionChat();
                                    this.reloadSession();
                                  } else {
                                    const currentTime = Date.now();
                                    Cookies.set("timeLogin", currentTime);
                                    this.props.setHighLight([]);
                                    this.props.setDashBoard([]);
                                    this.props.setGallery([]);
                                    this.props.setChatTab([]);
                                    this.setState(
                                      {
                                        openFile: false,
                                        typefile: "",
                                        chatPrivae: [],
                                        chatHistory: [],
                                        filename: "",
                                        describe: "",
                                        loadingHis: false,
                                        chatModalHistory: [],
                                        chatModalHistoryPrivate: [],
                                        timeHistory: [],
                                      },
                                      () => {
                                        this.savehistory();
                                      }
                                    );
                                  }
                                } else {
                                  this.sessionChat();
                                }
                              }}
                            />
                          </p>
                        ) : (
                          <p
                            key={index}
                            onClick={() => {
                              Cookies.set("timeLogin", result.time);
                              this.reloadSession();
                              this.setState({ activeTab: "chat" });
                            }}
                            style={{
                              background: "#c2c6c9 ",
                              margin: "10px",
                              padding: "22px 17px",
                              borderRadius: "0.375rem",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              color: "white",
                              position: "relative",
                              fontSize: "13px",
                              overflowWrap: "anywhere",
                            }}
                          >
                            <MdHistory
                              size={27}
                              style={{ marginRight: "10px" }}
                            />
                            {result.name} <br />
                            {formattedDateTime}
                            <IoCloseSharp
                              size={25}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "2%",
                                zIndex: "100",
                              }}
                              onClick={async (e) => {
                                e.stopPropagation();
                                await deleteObject(
                                  "hephaes-history",
                                  `${Cookies.get("user")}/${result.time}.json`
                                );
                                this.setState({
                                  openMenu: true,
                                  activeTab: "chat",
                                });
                                if (result.time === Cookies.get("timeLogin")) {
                                  Cookies.set("logined", false);
                                  this.sessionChat();
                                  this.reloadSession();
                                } else {
                                  this.sessionChat();
                                }
                              }}
                            />
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div hidden></div>
                )}
              </div>
            </div>

            <Tab.Content
              style={{
                width: this.state.openMenu ? "87%" : "97%",
                transition: "width ease-in-out .3s",
                height: '100%'
              }}
              className={this.state.openMenu ? "tabContentMenu open" : "tabContentMenu"}
            >
              <Tab.Pane eventKey={this.state.eventKeyChat} style={{ height: '100%' }}>
                <MDBCard
                  id="chat4"
                  style={{ background: "none", width: "100%", height: '100%' }}
                  className=""
                >
                  <MDBCol
                    style={{
                      position: "relative",
                      display: "flex",
                      direction: "row",
                    }}
                  >
                    <div
                      ref={this.chatContainerRef}
                      className="overflow-auto"
                      style={{
                        position: "relative",
                        height: "77vh",
                        borderRadius: "30px",
                        borderTopLeftRadius: 0,
                        width: !this.state.openFile ? "100%" : "50%",
                        overflowX: "hidden",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <Instruction fileUploadAction={this.fileUploadAction} />
                      </div>
                      <MDBCardBody>
                        {this.state.chatHistory.map((history, index) => (
                          <div key={index}>
                            {history[1] && <ContentUser user={history[1]} />}
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
                                  id={`Plotly-chart-${index}`}
                                  moveChartToGallery={
                                    this.props.moveChartToGallery
                                  }
                                  savehistory={this.savehistory}
                                  jsonData={history[2]}
                                  jsonRequest={history[4]}
                                  cardId={index}
                                  moveChartToChat={this.props.moveChartToChat}
                                  activeChatTab={this.activeChatTab}
                                  openMenu={this.setTypeMenuCardChatbot}
                                />
                                <ContentAI bot={history[3]} />
                              </div>
                            )}
                          </div>
                        ))}
                        <div id="ref" style={{ height: "0.5px" }} />
                        <ChatModal
                          key={"chat-modal"}
                          chat={this.state.chatModalHistory}
                          filename={this.state.filename}
                          show={this.state.openChatModal}
                          setchat={this.setChatModel}
                          logoutmodal={this.props.logout}
                          savehistorymodal={this.savehistory}
                          title={"Original"}
                          onHide={() =>
                            this.setState({
                              openChatModal: !this.state.openChatModal,
                            })
                          }
                        />
                      </MDBCardBody>
                    </div>

                    {this.state.openFile ? (
                      <Side
                        describe={this.state.describe}
                        csv={this.props.csv}
                        pdf={this.props.pdf}
                        imgUrl={this.props.img}
                        handleOpenScran={this.handleOpenScran}
                      />
                    ) : (
                      <div hidden></div>
                    )}
                  </MDBCol>

                  <MDBCol
                    md="12"
                    lg="12"
                    xl="12"
                    className="m-2"
                    style={{
                      position: "relative",
                      height: "32px",
                      width: '99%'
                    }}
                  >
                    {this.state.typefile !== "" ? (
                      <MDBBtn
                        style={{
                          background: "#484d5b",
                          position: "absolute",
                          right: "80px",
                          bottom: "2px",
                          borderRadius: "10px",
                          border: "none",
                          textTransform: "capitalize",
                          padding: "5px 20px",
                          fontSize: "18px",
                        }}
                        onClick={this.predict}
                        className="btnPredict"
                        disabled={this.state.isLoading}
                      >
                        Predict
                      </MDBBtn>
                    ) : (
                      <button hidden></button>
                    )}
                    {this.state.typefile !== "" ? (
                      <MDBBtn
                        style={{
                          background: "#484d5b",
                          position: "absolute",
                          right: "200px",
                          bottom: "2px",
                          borderRadius: "10px",
                          border: "none",
                          textTransform: "capitalize",
                          padding: "5px 20px",
                          fontSize: "18px",
                        }}
                        onClick={() => {
                          this.setState({
                            openChatModal: !this.state.openChatModal,
                          });
                        }}
                        className="btnPredict"
                        disabled={this.state.isLoading}
                      >
                        Chat
                      </MDBBtn>
                    ) : (
                      <button hidden></button>
                    )}
                    {this.state.chatHistory.length >= 1 &&
                      // this.state.Regenerate &&
                      this.state.typefile !== "" ? (
                      <MDBBtn ///btn Regenerate
                        style={{
                          background: "#484d5b",
                          position: "absolute",
                          right: "300px",
                          bottom: "2px",
                          borderRadius: "10px",
                          border: "none",
                          textTransform: "capitalize",
                          padding: "5px 20px",
                          fontSize: "18px",
                        }}
                        onClick={this.regen}
                        className="btnPredict"
                        disabled={this.state.isLoading}
                      >
                        Regenerate
                      </MDBBtn>
                    ) : (
                      <button hidden></button>
                    )}
                    {this.state.nextQuestion &&
                      this.state.nextQuestion.map((ques, index) => (
                        <Tooltip
                          label={ques}
                          aria-label="NextQues"
                          hasArrow
                          maxW="300px"
                          placement="top"
                          backgroundColor={"grey"}
                          border={"1px"}
                          borderRadius={"10px"}
                          marginLeft={20}
                        >
                          <Button
                            key={index}
                            value={ques}
                            onClick={this.recomment}
                            variant="outline-secondary"
                            style={{
                              marginLeft: "20px",
                              background: "#54b4d3",
                              color: "white",
                              height: "28px",
                              width: "200px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              position: "absolute",
                              left: index * 220,
                            }}
                          >
                            {ques}
                          </Button>
                        </Tooltip>
                      ))}
                    {this.state.typefile !== "" ? (
                      <button
                        onClick={this.handleUpLoadedFile}
                        //variant="outline-secondary"
                        className="btn btn-info btn-file"
                        style={{
                          background: "none",
                          position: "absolute",
                          padding: 0,
                          // radius: "30px",
                          right: "36px",
                          // bottom: "0px",
                          border: "none",
                        }}
                      >
                        {this.state.typefile === ".csv" ? (
                          <PiFileCsvLight
                            size={30}
                            style={{
                              width: "30px",
                              height: "30px",
                              boxShadow: "#3b71ca",
                              color: "black",
                            }}
                          />
                        ) : this.state.typefile === ".pdf" ? (
                          <PiFilePdfLight
                            size={30}
                            style={{
                              width: "30px",
                              height: "28px",
                              boxShadow: "#3b71ca",
                              color: "black",
                            }}
                          />
                        ) : this.state.typefile === ".json" ? (
                          <BsFiletypeJson
                            size={30}
                            style={{
                              width: "30px",
                              height: "28px",
                              boxShadow: "#3b71ca",
                              color: "black",
                            }}
                          />
                        ) : this.state.typefile === ".xls" ? (
                          <BsFiletypeXls
                            size={30}
                            style={{
                              width: "30px",
                              height: "28px",
                              boxShadow: "#3b71ca",
                              color: "black",
                            }}
                          />
                        ) : this.state.typefile === ".xlsx" ? (
                          <BsFiletypeXlsx
                            size={30}
                            style={{
                              width: "30px",
                              height: "28px",
                              boxShadow: "#3b71ca",
                              color: "black",
                            }}
                          />
                        ) : (
                          <div hidden></div>
                        )}
                      </button>
                    ) : (
                      <button hidden />
                    )}
                  </MDBCol>
                  <MDBCardFooter
                    className="text-muted d-flex justify-content-start align-items-center p-3 mb-4"
                    style={{
                      borderWidth: 0,
                      background: "#fff",
                      height: "5vh",
                      borderRadius: 40,
                      shadowColor: "#3b71ca",
                      boxShadow: "-2px 2px 5px #888888",
                      margin: "0px 23px 5px 23px",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                    // onClick={() => {
                    //   this.handleOpenVoice();
                    // }}
                    >
                      <SpeechToText updateInput={this.updateParentValue} />
                    </span>
                    <form style={{ width: "100%" }} onSubmit={this.addHistory}>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${this.state.isLoading ? "d-none" : ""
                          }`}
                        id="exampleFormControlInput3"
                        value={this.state.inputValue}
                        placeholder="Type message"
                        onChange={this.handleInputChange}
                        onKeyDown={this.tabSuggest}
                        style={{ background: "none" }}
                      />
                      {this.state.isLoading && (
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
                    <Command
                      onUpdateParentValue={this.updateParentValue}
                      state={this.state.commandList}
                    />
                    <Menu>
                      <MenuButton
                        as={Button}
                        style={{
                          background: "none",
                          borderRadius: 50,
                          boxShadow: "none",
                          //marginRight: "30px",
                          border: "none",
                        }}
                      >
                        <PiUploadSimple
                          size={10}
                          style={{
                            color: "#3B71CA",
                            width: "30px",
                            height: "30px",
                            boxShadow: "#3b71ca",
                          }}
                        />
                      </MenuButton>
                      <MenuList
                        style={{ paddingBottom: "50px", color: "gray" }}
                      >
                        <MenuItem
                          as={Button}
                          onClick={this.fileUploadAction}
                          style={{
                            width: "fit-content",
                            // height: "50px",
                            cursor: "pointer",
                            background: "#33363F",
                            transition: "background-color 0.3s",
                            padding: "10px 20px",
                            boxShadow: "0px 4px 4px",
                            border: "1px solid white",
                            borderRadius: "20px",
                            marginBottom: "15px",
                          }}
                          className="uploadFile"
                        >
                          Upload File
                          <input
                            type="file"
                            accept=".csv, .json, .xls, .xlsx, .pdf"
                            hidden
                            ref={this.inputFileReference}
                            onInput={this.fileUploadInputChange}
                          />
                        </MenuItem>
                        <MenuItem
                          as={Button}
                          // onClick={this.folderUploadAction}
                          style={{
                            width: "fit-content",
                            cursor: "pointer",
                            background: "#33363F",
                            padding: "10px 20px",
                            boxShadow: "0px 4px 4px",
                            border: "1px solid white",
                            borderRadius: "20px",
                          }}
                          className="uploadFile"
                        >
                          Upload Folder
                          <input
                            type="file"
                            accept=".csv, .json, .xls, .xlsx, .pdf"
                            webkitdirectory=""
                            directory=""
                            multiple
                            hidden
                            ref={this.inputFolderReference}
                            onInput={this.folderUploadInputChange}
                          />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Button
                      onClick={this.addHistory}
                      style={{
                        background: "none",
                        borderRadius: 10,
                        boxShadow: "none",
                        border: "none",
                      }}
                      disabled={!this.state.inputValue}
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
                </MDBCard>
              </Tab.Pane>
              <Tab.Pane eventKey={this.state.eventKeyChatPrivate} style={{ height: '100%' }}>
                <ChatPrivate
                  keyChat={this.state.eventKeyChatPrivate}
                  chartToMove={this.state.chatToPrivate}
                  jsonRequest={this.state.jsonDataPrivate}
                  moveChartToGallery={this.props.moveChartToGallery}
                  historyChart={this.state.chatPrivae}
                  logout={this.props.logout}
                  setChartPrivate={this.setChartPrivate}
                  savehistory={this.savehistory}
                  chatModalHistoryPrivate={this.state.chatModalHistoryPrivate}
                  setChatModalPrivate={this.setChatModalPrivate}
                />
              </Tab.Pane>
              {/* <Tab.Pane eventKey={this.state.eventKeyTranslate}>
                <Translate datas={this.state.dataTranslate} />
              </Tab.Pane> */}
              {/* <Tab.Pane
                eventKey={this.state.eventKeyHightLight}
                style={{ height: "100vh !important" }}
              >
                <HighLight
                  datas={this.state.dataHightLight}
                  moredatas={this.state.moreDatasHL}
                />
              </Tab.Pane> */}
              <Tab.Pane
                eventKey={this.state.eventKeyPredict}
                style={{ height: "89vh" }}
              >
                <Predict datas={this.state.dataPredict} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
        <ToastContainer />
      </>
    );
  }
}

export default withRouter(Chat);
