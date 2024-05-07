import React, { Component, useState, useRef, useEffect } from "react";

import { Card, CardHeader, CardBody } from "@chakra-ui/react";

import Plot from "react-plotly.js";

function CardforHighlight(props) {
  if (props.name !== "highlight") {
    // If props.name is not "highlight", return null or an empty fragment
    return null; // or <></>
  }

  return (
    <>
      <Card
        id={`card-dashboard-${props.id}`}
        bg="#ffffff"
        p="0"
        borderRadius="10px"
        // border="solid 1px"
        h="50vh"
        w="100%"
        overflow={"hidden"}
      >
        <Plot
          divId={`chart-${props.id}`}
          data={props.chart.data}
          layout={{
            ...props.chart.layout,
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
    </>
  );
}
export default CardforHighlight;
