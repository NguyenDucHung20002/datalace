import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { Grid, GridItem } from "@chakra-ui/react";
import { MDBRow } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import Linkify from "react-linkify";
const Plot = createPlotlyComponent(Plotly);

function Predict(props) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={{height: "100%"}}>
      <Carousel showThumbs={false} className="predict_car" infiniteLoop={true}>
        {props.datas.map((jsonData, index) => (
          <div key={index}>
            <Grid
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(1, 1fr)"
            >
              <GridItem colSpan={2} rowSpan={1} paddingLeft="30px">
                <MDBRow>
                  <Plot
                    divId={`plotChartPredict-${index}`}
                    data={jsonData.data}
                    layout={{
                      ...jsonData.layout,
                      autosize: false,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    onInitialized={() => {
                      Plotly.Plots.resize(`plotChartPredict-${index}`);
                    }}
                  />
                </MDBRow>
              </GridItem>
              <GridItem
                colSpan={1}
                rowSpan={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: "30px",
                }}
              >
                <div
                  style={{
                    overflowY: showMore ? "auto" : "hidden",
                    height: "60vh",
                    whiteSpace: "pre-line",
                    paddingInline: "10px",
                    textAlign: "left",
                  }}
                >
                  <Linkify>
                    {showMore
                      ? jsonData.comment
                      : jsonData.comment.slice(0, 1000)}
                  </Linkify>
                </div>
                {jsonData.comment.length > 200 && (
                  <Button onClick={toggleShowMore} variant="link">
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                )}
              </GridItem>
            </Grid>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Predict;
