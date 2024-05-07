import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import CardforGallery from "../cards/CardforGallery";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addLayout } from "../../store/reducers/DashboardLayout";

const Gallery = (props) => {
  const dispatch = useDispatch();

  const chunkSize = 4;
  const { chartComponents } = props;
  const carouselItems = [];

  if (chartComponents.length === 0) {
    carouselItems.push(
      <Carousel.Item key="no-charts">
        <div
          style={{
            height: "87vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "lightgray",
          }}
        >
          No charts available!
        </div>
      </Carousel.Item>
    );
  } else {
    for (let i = 0; i < chartComponents.length; i += chunkSize) {
      const chunk = chartComponents.slice(
        i,
        Math.min(i + chunkSize, chartComponents.length)
      );
      const carouselItem = (
        <Carousel.Item key={i}>
          <Grid
            h="89vh"
            w="100%"
            paddingLeft="20px"
            paddingRight="20px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={10}
          >
            {chunk.map((ChartComponent, index) => (
              <GridItem
                key={index}
                rowSpan={1}
                colSpan={1}
                style={{ position: "relative" }}
              >
                <CardforGallery
                  id={index}
                  chart={ChartComponent[0]}
                  moveChartToDashboard={() => {
                    props.savehistory();
                    dispatch(addLayout({ data: ChartComponent[1] }));
                    props.moveChartToDashboard(
                      ChartComponent[0],
                      ChartComponent[1]
                    );
                  }}
                  moveChartToChat={() => {
                    props.savehistory();
                    props.moveChartToChat(ChartComponent[0], ChartComponent[1]);
                  }}
                  removeChartFromGallery={() =>
                    props.removeChartFromGallery(
                      ChartComponent[0],
                      ChartComponent[1]
                    )
                  }
                  deleteAWSClound={() =>
                    props.deleteAWSClound(ChartComponent[1])
                  }
                />
              </GridItem>
            ))}
          </Grid>
        </Carousel.Item>
      );

      carouselItems.push(carouselItem);
    }
  }
  return (
    <Carousel
      style={{
        Height: "89vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: "2%",
      }}
      controls={true}
      indicators={false}
      interval={null}
      keyboard={true}
      prevIcon={
        <AiOutlineLeft
          size={18}
          color="black"
          style={{ position: "absolute", left: "-1px" }}
        ></AiOutlineLeft>
      }
      nextIcon={
        <AiOutlineRight
          size={18}
          color="black"
          style={{ position: "absolute", right: "-1px" }}
        />
      }
    >
      {carouselItems}
    </Carousel>
  );
};

export default Gallery;
