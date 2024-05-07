import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Footer from "./Footer";
import VideoBackground from "./VideoBackground";
import Viz from "./Image/chatbot.jpg";
import Dashboard from "./Image/dashboard2.jpg";
import Gallery from "./Image/gallery2.jpg";

import chartImage from "./Image/ChartImage.jpg";
import dataImage from "./Image/DataImage.jpg";
import QAImage from "./Image/QAImage.jpg";
function OurProcess() {
  return (
    <>
      {/* <div
        style={{
          marginTop: "150px",
          textAlign: "center",
          width: "100%",
          marginBottom: "5%",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            textShadow: "0px 5px 4px rgb(0,0,0,0.4)",
          }}
        >
          Our Process
        </h1>
        <p style={{ fontSize: "20px" }}>The icon represents each step</p>
        <Row style={{ width: "100%" }}>
          <Col>
            <img src={step1} style={{ width: "60%" }} />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h1>Title</h1>
          </Col>
        </Row>
        <Image style={{ width: "50%" }} src={group27} />
        <Row style={{ width: "100%" }}>
          <Col className="d-flex justify-content-center align-items-center">
            <h1>Title</h1>
          </Col>
          <Col>
            <img src={step2} style={{ width: "60%" }} />
          </Col>
        </Row>
        <Image style={{ width: "50%" }} src={group28} />
        <Row style={{ width: "100%" }}>
          <Col>
            <img src={step3} style={{ width: "60%" }} />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
          <h1>Title</h1>
          </Col>
        </Row>
        <Image style={{ width: "50%" }} src={group27} />
        <Row style={{ width: "100%" }}>
          <Col className="d-flex justify-content-center align-items-center">
          <h1>Title</h1>
          </Col>
          <Col>
            <img src={step4} style={{ width: "60%" }} />
          </Col>
        </Row>
      </div> */}
      <div
        className="container-fluid w-100 mt-5 "
        style={{ background: "#33363F" }}
      >
      <Row className="CustomRow gradient-background" >
          <Col>
            <VideoBackground />
          </Col>
        </Row>
        <Row className="homepageRow">
          {/* <h1
            style={{ margin: "1% 0 2% 0", textAlign: "center", color: "white" }}
          >
            FOCB
          </h1> */}
          <p style={{height:"5vh"}}></p>
          <Col
            xs={12}
            md={4}
            className="min-height-md max-height d-flex justify-content-center align-items-center"
          >
            <Card className="h-100 w-100 text-center d-flex flex-column ">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-start">
                <Card.Title>
                  <h2 class="display-5" style={{color:"white"}}>
                  A Powerful Tool for <strong style={{color:"#67d3df", fontWeight:"900"}}>Data Exploration</strong> 
                  </h2>
                </Card.Title>
                {/* <Card.Text>
                  <p class="text-secondary">
                    {" "}
                    Data visualization is a powerful tool for understanding and
                    communicating complex information. However, creating
                    effective visualizations can be a challenging task, often
                    requiring specialized skills and tools. This is where
                    chatbots can help.
                  </p>
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={8}
            className="imageWrap min-height-md d-flex justify-content-center align-items-center"
          >
            <img className="rounded-image " src={Viz} />
          </Col>
        </Row>
        <Row className="homepageRow">
          <Col
            xs={12}
            md={{ span: 4, order: "last" }}
            className="min-height-md max-height d-flex justify-content-center align-items-center"
          >
            <Card className="h-100 w-100 text-center d-flex flex-column ">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-start">
                <Card.Title>
                  <h2 class="display-5"style={{color:"white"}}>
                      Store<strong style={{color:"#67d3df", fontWeight:"900"}}> Your Visualizations</strong> in the <strong style={{color:"#67d3df", fontWeight:"900"}}> Gallery </strong>
                  </h2>
                </Card.Title>
                {/* <Card.Text>
                  <p class="text-secondary">
                    {" "}
                    Chatbots can seamlessly integrate data visualization into
                    your workflow, enabling you to effortlessly generate and
                    temporarily store visualizations for later reference. With
                    just a few simple commands, you can create charts, graphs,
                    and other visual representations of your data, and
                    conveniently save them in the chatbot's gallery for easy
                    retrieval.
                  </p>
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={8}
            className="imageWrap min-height-md  d-flex justify-content-center align-items-center"
          >
            <img className="rounded-image" src={Gallery}  />
          </Col>
        </Row>
        <Row className="homepageRow">
          <Col
            xs={12}
            md={4}
            className="min-height-md max-height d-flex justify-content-center align-items-center">
            <Card className="h-100 w-100 text-center d-flex flex-column ">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-start">
                <Card.Title>
                  <h2 class="display-5" style={{color:"white"}}>
                      Seamlessly <strong style={{color:"#67d3df", fontWeight:"900"}}>Move</strong> from <strong style={{color:"#67d3df", fontWeight:"900"}}>Visualizations to Dashboards</strong>
                  </h2>
                </Card.Title>
                {/* <Card.Text>
                  <p class="text-secondary">
                    {" "}
                    Chatbots seamlessly integrate data visualization into your
                    workflow, enabling you to effortlessly generate
                    visualizations and seamlessly transition to dashboards for a
                    comprehensive overview of your data. This integrated
                    approach allows you to explore specific data points in
                    detail through visualizations and then quickly gain a
                    broader perspective by switching to dashboards.
                  </p>
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={8}
            className="imageWrap min-height-md d-flex justify-content-center align-items-center"
          >
            <img className="rounded-image" src={Dashboard} />
          </Col>
        </Row>
        <div
          className="howItWork"
          style={{ cursor: "pointer" }}
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "2%",
              fontWeight: "bold",
            }}
          >
            HOW IT WORK
          </h1>

          <Container fluid className="col-padding">
            <Row style={{ padding: "0 5%" }}>
              <Col md={4} className="p-2">
                <Card
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={dataImage}
                    style={{ width: "70%"}}
                  />
                  <Card.Body>
                    <Card.Text
                      style={{
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      1. Upload your data
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="p-2">
                <Card
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={chartImage}
                    style={{ width: "70%" }}
                  />
                  <Card.Body>
                    <Card.Text
                      style={{
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      2. Visualize everything you want from data you uploaded
                      before
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="p-2">
                <Card
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={QAImage}
                    style={{ width: "70%" }}
                  />
                  <Card.Body>
                    <Card.Text
                      style={{
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      3. Q&A about information related to file content such as
                      quantity and calculation
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="notify">
          <h1>Our news on the way</h1>
          <p>Sign up to be the first to know what's new in our product</p>
          <form>
            <input placeholder="Enter your email" type="text"/>
            <button>Notify me</button>
          </form>
        </div>
        <div style={{height:"50px", padding:"none"}} ></div>
      </div>
      <Footer/>
    </>
  );
}
export default OurProcess;
