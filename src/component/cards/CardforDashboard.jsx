import React, { Component, useState, useRef } from "react";
import {
  Alert,
  CardFooter,
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { toast } from "react-toastify";
import Plot from "react-plotly.js";

function CardforDashboard(props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showLeftTooltip, setShowLeftTooltip] = useState(false);
  const [showRightTooltip, setShowRightTooltip] = useState(false);
  const lastClickTimeRef = useRef(0);

  const toggleAlert = () => {
    const currentTime = new Date().getTime();
    const timeThreshold = 500; // Adjust the threshold as needed (in milliseconds)

    if (currentTime - lastClickTimeRef.current <= timeThreshold) {
      // Second click in a double click
      setIsAlertOpen(false);
    } else {
      // First click, set a timeout to check for a second click
      setTimeout(() => {
        if (lastClickTimeRef.current === currentTime) {
          // No second click within the timeThreshold, open the Alert
          setIsAlertOpen(true);
        }
      }, timeThreshold);
    }

    lastClickTimeRef.current = currentTime;
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    setShowLeftTooltip(false);
    setShowRightTooltip(false);
  };

  const moveToChat = () => {
    props.moveChartToChat();
    props.removeChartFromDashboard();
    // toast.success("Move to Chat Success", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 2000,
    //   closeOnClick: false,
    // });
    closeAlert();
  };

  const moveToGallery = () => {
    props.moveChartToGallery();
    props.removeChartFromDashboard();
    // toast.success("Move to Gallery Success", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 1000,
    //   closeOnClick: false,
    // });
    closeAlert();
  };

  const removeChart = () => {
    props.removeChartFromDashboard();
    props.deleteAWSClound();
    // toast.success("Chart removed from Dashboard", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 2000,
    //   closeOnClick: false,
    // });
    closeAlert();
  };
  return (
    <>
      <Card
        id={`card-dashboard-${props.id}`}
        bg="#ffffff"
        p="0"
        borderRadius="10px"
        // border="solid 1px"
        h="100%"
        w="100%"
        onClick={() => toggleAlert()}
        cursor="pointer"
        overflow={"hidden"}
      >
        <Plot
          divId={`chart-${props.id}`}
          data={props.chart.data}
          layout={{
            ...props.chart.layout,
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

      <Modal
        isCentered
        isOpen={isAlertOpen}
        motionPreset="slideInBottom"
        variant={"red"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            className="Card"
            style={{
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: "100vh",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Card
              id={`alert-dashboard-${props.id}`}
              bg="#fff"
              p="20px"
              height="90vh"
              width="80%"
              display="flex"
              flexDirection="column"
              borderRadius={"10px"}
            >
              <CardHeader className="Cardheader">
                <CloseButton
                  ml="auto"
                  backgroundColor="#ffffff"
                  color="black"
                  border="none"
                  onClick={closeAlert}
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
                  isOpen={showLeftTooltip}
                  onClose={() => setShowLeftTooltip(false)}
                  onOpen={() => setShowLeftTooltip(true)}
                >
                  <div
                    className="tooltip-container"
                    onMouseEnter={() => setShowLeftTooltip(true)}
                    onMouseLeave={() => setShowLeftTooltip(false)}
                  >
                    <Button
                      backgroundColor="#ffffff"
                      color="black"
                      border="none"
                      onClick={() => moveToGallery()}
                      _hover={{ backgroundColor: "#fff", color: "blue" }}
                      h="100%"
                      zIndex={1}
                    >
                      <FaCaretLeft style={{ fontSize: "45px" }} />
                      {showLeftTooltip && (
                        <span className="tooltip-text">Move to Gallery</span>
                      )}
                    </Button>
                  </div>
                </Tooltip>
                <div
                  style={{
                    width: "90%",
                    height: "95%",
                    position: "relative",
                  }}
                >
                  <Plot
                    divId={`chart-${props.id}`}
                    data={props.chart.data}
                    layout={{
                      ...props.chart.layout,
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
                  isOpen={showRightTooltip}
                  onClose={() => setShowRightTooltip(false)}
                  onOpen={() => setShowRightTooltip(true)}
                >
                  <div
                    className="tooltip-container"
                    onMouseEnter={() => setShowRightTooltip(true)}
                    onMouseLeave={() => setShowRightTooltip(false)}
                  >
                    <Button
                      backgroundColor="#ffffff"
                      color="black"
                      border="none"
                      onClick={() => moveToChat()}
                      _hover={{ backgroundColor: "#fff", color: "blue" }}
                      h="100%"
                      zIndex={1}
                    >
                      <FaCaretRight style={{ fontSize: "45px" }} />
                      {showRightTooltip && (
                        <span className="tooltip-text">Move to Chat</span>
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
                  onClick={() => removeChart()}
                  _hover={{ backgroundColor: "#fff", color: "red" }}
                  h="100%"
                >
                  Remove Chart
                </Button>
              </CardFooter>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default CardforDashboard;
