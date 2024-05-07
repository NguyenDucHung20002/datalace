import React, { useEffect, useState } from "react";
import "./homepage.css";
import { Button, Card, Carousel, Col, Image, Row } from "react-bootstrap";
import imageAnoutUs from "./Image/ImageAboutUs.png";
import image2 from "./Image/image01.jpg";
import image3 from "./Image/image2.jpg";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import TestimonialsV2 from "./TestimonialsV2";
import figure1 from "./Image/qlora(P1)/LLM.png";
import untitled from "./Image/qlora(p2)/PEFT.png";
import RLHF3 from './Image/RLHF/RLHF03.jpg'
import background1 from "./assets/background1.mp4";
import { submitEmail } from "../../services/user";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import {
  ModalContent,
  ModalOverlay,
  Modal,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

function CardBlogInHome({ image, title, text, link }) {
  const navigate = useNavigate();

  return (
    <Card
      className="cardBlog h-100 w-100"
      style={{
        background: "none",
        border: "none",
        boxShadow: "none",
        color: "white",
        padding: "12%",
        cursor: "pointer",
      }}
      onClick={() => navigate(`${link}`)}
    >
      <Card.Img
        style={{ height: "250px", objectFit: "cover" }}
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ color: "#9B9B9B" }} className="blogText">
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function Homepage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const handleSubmitEmail = async () => {
    setLoading(true);
    await submitEmail(email, "Submit email", "")
      .then((result) => {
        if (result.status === 200) {
          toast.success("Submit email success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setEmail("");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <div className="loadingWrap">
          <Oval
            visible={loading}
            color="rgba(0, 23, 141, 1)"
            secondaryColor="rgba(9, 83, 151, 1)"
            strokeWidth={5}
            strokeWidthSecondary={5}
          ></Oval>
        </div>
      ) : null}
      <div
        className="container-fluid w-100 mt-5 "
        style={{ background: "#33363F", width:'100vw' }}
      >
        {/* <Col>
            <VideoBackground />
          </Col> */}
        <Carousel style={{marginTop:'3%'}}>
          <Carousel.Item interval={1000}>
            <Image src={image2} style={{ height: "100%", objectFit:'cover' }} />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={image3} style={{ height: "100%", objectFit:'cover' }} />
          </Carousel.Item>
        </Carousel>
        <Row style={{ width:'100%', display:'flex', justifyContent:'center'}}>
          <button
            className="btn btn-outline-light m-2"
            id="btn-demo"
            onMouseOver={(e) => {
              e.target.classList.add("animate");
            }}
            onMouseLeave={(e) => {
              e.target.classList.remove("animate");
            }}
            onClick={() => {
              onOpen();
            }}
          >
            <span>
              {" "}
              <strong>Watch our demo video</strong>
            </span>
          </button>
        </Row>
        {/* <Row style={{ padding: "0 0 7em 0 ", backgroundImage: `url(${image1})` }}> */}
        <Row style={{ padding: "0 0 7em 0 " }}>
          <TestimonialsV2 />
        </Row>
        <Row className="fromBlog">
          <Col xs={6} className="fromBlogHeader">
            <h1>News</h1>
            <h2>From Our Blog Posts</h2>
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <button
              className="align-self-end btnMoreDetail"
              onClick={() => navigate("/blogs")}
            >
              <span>View more</span>
            </button>
          </Col>
          <Col xs={12} md={3} xl={3} className="p-2">
            <CardBlogInHome
              image={figure1}
              title={`2 Parameter-efficient Fine-tuning
            (PEFT) techniques for LLM:
            LoRA and QLoRA (Part 1)`}
              text={
                "A Large Language Model (LLM) is an AI algorithm that uses neural networks to understand and generate human language."
              }
              link={"/blog-detail"}
            />
          </Col>
          <Col xs={12} md={3} xl={3} className="p-2">
            <CardBlogInHome
              image={untitled}
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 2)
              `}
              text={`As you have LoRA, you can train your model faster, but there are some models so large
                that you can not even load it if you don’t have extended resource(e.g. Llama), Don’t
                worry, QLoRA can help you lighten the model by quantization technique so that you can
                try more LLM.
                `}
              link={"/blog-detail-v1"}
            />
          </Col>
          <Col xs={12} md={3} xl={3} className="p-2">
            <CardBlogInHome
              image={RLHF3}
              title={"RLHF"}
              text={`In recent years, language models have demonstrated remarkable abilities by
                generating varied and engaging text from prompts provided by humans. However,
                defining what constitutes “good” text is inherently challenging as it is both subjective
                and dependent on context.`}
              link={"/blog-detail-v2"}
            />
          </Col>
          <Col xs={12} md={3} xl={3} className="p-2">
            <CardBlogInHome
              image={
                "https://iclstech.edu.vn/wp-content/uploads/2023/09/cong-nghe-tai-chinh.jpeg"
              }
              title={"Financial Technology Trends: Grab to Grow"}
              text={
                "Along with the development of the Industrial Revolution 4.More and more consumers are using products and services from Fintech. However, along with the development opportunities, Fintech in Vietnam is still no less difficult, challenging."
              }
              link={"/blog-detail-v3"}
            />
          </Col>
        </Row>

        <Row className="aboutUsWrap">
          <Col
            xs={12}
            md={6}
            sm={6}
            className="d-flex align-items-center justify-content-center p-0"
            style={{ height: "100%" }}
          >
            <img src={imageAnoutUs} />
          </Col>
          <Col xs={12} md={6} sm={6}>
            <div className="d-flex flex-column justify-content-center aboutus p-4 h-100 ">
              <h1 style={{ textShadow: "none" }}>
                Ditch the spreadsheets, crush the competition
              </h1>
              <p>
                Datalace, your AI data sidekick, analyzes any data, from any
                app, in seconds.
              </p>
              <p>
                Get lightning-fast insights, crystal-clear reports, and
                game-changing opportunities.
              </p>
              <p>
                Free up time, save money, and make data-driven decisions with
                confidence.
              </p>
              <p>Datalace: your AI data advantage.</p>

              <button
                type="button"
                class="btnMoreDetail align-self-center mt-auto "
                onClick={() => navigate("/about-us")}
              >
                <span>
                  {" "}
                  <strong>More details</strong>
                </span>
              </button>
            </div>
          </Col>
        </Row>

        <div id="fb-root"></div>
        <div
          className="fb-customerchat"
          attribution="install_email"
          attribution_version="biz_inbox"
          page_id="107822155714865"
        ></div>

        <div className="notify">
          <h1>Our news on the way</h1>
          <p>Sign up to be the first to know what's new in our home</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitEmail();
            }}
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="text"
            />
            <button disabled={loading}>Notify me</button>
          </form>
        </div>
        <div style={{ height: "50px", padding: "none" }}></div>
      </div>

      <Footer />

      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ModalCloseButton className="btnCloseDemo" />
          <ModalBody
            className="Card"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <video className="BackgroundVideo" autoPlay loop muted>
              <source src={background1} type="video/mp4" />
            </video>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Homepage;
