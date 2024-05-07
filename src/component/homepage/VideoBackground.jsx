import React from "react";
import "./homepage.css";

import background1 from "./assets/background1.mp4";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoBackground = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center mt-2 mt-lg-5 p-lg-4">
        <Col className="d-flex justify-content-center align-items-center">
          <h1
            className="title-top text-center text-light display-1 responsive-text"
            style={{ fontWeight: "900", fontSize: "4.5em" }}
          >
            Data-Driven Decisions, Made Easy
            <br />
            <span>Your AI Insight Partner</span>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center ">
        <Col className="text-center customButton">
          <button class="btn-21" onClick={() => navigate("/chat")}>
            <span>Get Started</span>
          </button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center m-1 m-sm-3 m-md-3 p-md-4">
        <Col className="d-flex justify-content-center">
          <video className="VideoBackgroundProduct" autoPlay loop muted>
            <source src={background1} type="video/mp4" />
          </video>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoBackground;
