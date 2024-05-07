import React, { Component } from "react";
import { Alert, CloseButton } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import Plot from "react-plotly.js";
export default class CardforGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertOpen: false,
      showLeftTooltip: false,
      showRightTooltip: false,
      lastClickTime: 0,
    };
  }

  // componentDidMount(prevProps) {
  //   // Sau khi Component được render

  //     // Kiểm tra xem this.props.chartComponent có thay đổi so với prevProps

  //       console.log(this.props.chart.props.divId)
  //       Plotly.Plots.resize(this.props.chart.props.divId);
  // }

  toggleAlert = () => {
    const currentTime = new Date().getTime();
    const timeThreshold = 500; // Adjust the threshold as needed (in milliseconds)

    if (currentTime - this.state.lastClickTime <= timeThreshold) {
      // Second click in a double click
      this.setState({ isAlertOpen: false });
      // console.log("ko mở")
    } else {
      // First click, set a timeout to check for a second click
      setTimeout(() => {
        if (this.state.lastClickTime === currentTime) {
          // console.log("mở")
          // No second click within the timeThreshold, open the Alert
          this.setState({ isAlertOpen: true });
        }
      }, timeThreshold);
    }

    this.setState({ lastClickTime: currentTime });
  };

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
    this.setState({ showLeftTooltip: false });
    this.setState({ showRightTooltip: false });
  };

  moveToChat = () => {
    this.props.moveChartToChat();
    this.props.removeChartFromGallery();
    // toast.success("Move to Chat Success", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 2000,
    //   closeOnClick: "false",
    // });
    this.closeAlert();
  };

  moveToDashboard = () => {
    this.props.moveChartToDashboard();
    this.props.removeChartFromGallery();
    // toast.success("Move to Dashboard Success", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 1000,
    //   closeOnClick: "false",
    // });
    this.closeAlert();
  };
  removeChart = () => {
    this.props.removeChartFromGallery();
    this.props.deleteAWSClound();
    // toast.success("Chart removed from Gallery", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 2000,
    //   closeOnClick: "false",
    // });
    this.closeAlert();
  };

  render() {
    return (
      <>
        <Card
          id={`card-gallery-${this.props.id}`}
          bg="#ffffff"
          p="0"
          borderRadius="10px"
          // border="solid 1px"
          h="100%"
          w="100%"
          onClick={this.toggleAlert}
          cursor="pointer"
          overflow={"hidden"}
          position={"relative"}
        >
          <Plot
            divId={`chart-${this.props.id}`}
            data={this.props.chart.data}
            layout={{
              ...this.props.chart.layout,
              autosize: true,
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              margin: "0px",
            }}
            useResizeHandler={true}
          />
        </Card>
        {this.state.isAlertOpen && (
          <Alert
            className="Card"
            backdropFilter="blur(5px)"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            height="100vh"
            width="100%"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="9999"
          >
            <Card
              id={`alert-gallery-${this.props.id}`}
              bg="#ffffff"
              p="20px"
              borderRadius="10px"
              height="90vh"
              width="80%"
              display="flex"
              flexDirection="column"
            >
              <CardHeader className="Cardheader">
                <CloseButton
                  ml="auto"
                  backgroundColor="#ffffff"
                  color="black"
                  border="none"
                  onClick={this.closeAlert}
                />
              </CardHeader>
              <CardBody
                flex="1"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Tooltip
                  hasArrow
                  isOpen={this.state.showLeftTooltip}
                  onClose={() => this.setState({ showLeftTooltip: false })}
                  onOpen={() => this.setState({ showLeftTooltip: true })}
                >
                  <div
                    className="tooltip-container"
                    onMouseEnter={() =>
                      this.setState({ showLeftTooltip: true })
                    }
                    onMouseLeave={() =>
                      this.setState({ showLeftTooltip: false })
                    }
                  >
                    <Button
                      backgroundColor="#ffffff"
                      color="black"
                      border="none"
                      onClick={this.moveToChat}
                      _hover={{ backgroundColor: "#fff", color: "blue" }}
                      h="100%"
                      zIndex={1}
                    >
                      <FaCaretLeft style={{ fontSize: "45px" }} />
                      {this.state.showLeftTooltip && (
                        <span className="tooltip-text">Move to Chat</span>
                      )}
                    </Button>
                  </div>
                </Tooltip>
                <div
                  style={{ width: "90%", height: "95%", position: "relative" }}
                >
                  <Plot
                    divId={`chart-${this.props.id}`}
                    data={this.props.chart.data}
                    layout={{
                      ...this.props.chart.layout,
                      autosize: true,
                    }}
                    config={{ responsive: true, displaylogo: false }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      margin: "0px",
                    }}
                    useResizeHandler={true}
                  />
                </div>
                <Tooltip
                  label="Hover me"
                  isOpen={this.state.showRightTooltip}
                  onClose={() => this.setState({ showRightTooltip: false })}
                  onOpen={() => this.setState({ showRightTooltip: true })}
                >
                  <div
                    className="tooltip-container"
                    onMouseEnter={() =>
                      this.setState({ showRightTooltip: true })
                    }
                    onMouseLeave={() =>
                      this.setState({ showRightTooltip: false })
                    }
                  >
                    <Button
                      backgroundColor="#ffffff"
                      color="black"
                      border="none"
                      onClick={this.moveToDashboard}
                      _hover={{ backgroundColor: "#fff", color: "blue" }}
                      h="100%"
                      zIndex={1}
                    >
                      <FaCaretRight style={{ fontSize: "45px" }} />
                      {this.state.showRightTooltip && (
                        <span className="tooltip-text">Move to Dashboard</span>
                      )}
                    </Button>
                  </div>
                </Tooltip>
              </CardBody>
              <CardFooter>
                <Button
                  backgroundColor="#ffffff"
                  color="black"
                  border="none"
                  onClick={this.removeChart}
                  _hover={{ backgroundColor: "#fff", color: "red" }}
                  h="100%"
                >
                  Remove Chart
                </Button>
              </CardFooter>
            </Card>
          </Alert>
        )}

        <ToastContainer />
      </>
    );
  }
}
