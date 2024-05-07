import React, { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Alert, CloseButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaCaretRight } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
// import { toast, ToastContainer } from "react-toastify";
import Plot from "react-plotly.js";
const CardforChatbot = (props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // const [lastClickTime, setLastClickTime] = useState(0);
  const lastClickTimeRef = useRef(0);
  const [showRightTooltip, setShowRightTooltip] = useState(false);
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
    setShowRightTooltip(false);
  };

  const moveToGallery = () => {
    props.moveChartToGallery();
    // toast.success("Move to Gallery Success", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   autoClose: 2000,
    //   closeOnClick: "false",
    // });
    closeAlert();
  };
  const moveToEdit = () => {
    props.edit();
    closeAlert();
  };
  if (!props.chart) {
    return null;
  }
  return (
    <>
      <Card
        id={`card-${props.id}`}
        bg="#ffffff"
        p="0"
        borderRadius="10px"
        border="solid 1px"
        h="100%"
        w="100%"
        // onClick={() => setIsAlertOpen(true)}
        onClick={toggleAlert}
        cursor="pointer"
        overflow={"hidden"}
        position={"relative"}
      >
        <CardBody height="100%" width="100%" position={"absolute"}>
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
        </CardBody>
      </Card>
      {isAlertOpen && (
        <Alert
          className="Card"
          backdropFilter="blur(5px)"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          height="100vh"
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
            bg="#ffffff"
            p="20px"
            borderRadius="10px"
            height="90vh"
            width="90%"
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
            <CardBody h="500%" position="relative">
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
            </CardBody>
            <CardFooter
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                backgroundColor="#ffffff"
                color="black"
                border="none"
                padding="0"
                onClick={moveToEdit}
                _hover={{ backgroundColor: "#fff", color: "red" }}
              >
                Edit
              </Button>

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
                    padding="0"
                    onClick={moveToGallery}
                    _hover={{ backgroundColor: "#fff", color: "blue" }}
                    h="100%"
                  >
                    <FaCaretRight style={{ fontSize: "45px" }} />
                    {showRightTooltip && (
                      <span className="tooltip-text">Move to Gallery</span>
                    )}
                  </Button>
                </div>
              </Tooltip>
            </CardFooter>
          </Card>
        </Alert>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default CardforChatbot;
