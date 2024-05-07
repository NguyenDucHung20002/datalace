import React from "react";
import { Card, Carousel, Col, Container, Row, Image } from "react-bootstrap";
import { FaBookAtlas, FaBusinessTime } from "react-icons/fa6";
import { CgShapeRhombus } from "react-icons/cg";
import image1 from "./Image/about01.jpg";
import image2 from "./Image/about02.jpg";
import image3 from "./Image/about03.jpg";
import step4 from "./Image/step4-process.png";
import step3 from "./Image/step3-process.png";
import Footer from "./Footer";
import { IoBusinessSharp } from "react-icons/io5";
import { TbBarrierBlockOff, TbPigMoney, TbScanEye } from "react-icons/tb";
import { VscSymbolField } from "react-icons/vsc";
import { BsDatabaseFillGear, BsDatabaseFillUp } from "react-icons/bs";
import {
  RiLightbulbFlashFill,
  RiTimerFlashFill,
  RiUserSmileLine,
} from "react-icons/ri";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import "./AboutUs.css";
function AboutUs() {
  return (
    <div
      style={{
        background: "#33363f",
        color: "white",
        width: "100% !important",
        paddingTop: "120px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2% 5% 5%",
        }}
      >
        <h1 className="ourMission">Our Mission</h1>
        <span className="ourMissionIcon">
          <CgShapeRhombus size={30} color="#67D3DF" />
        </span>
        <h2 style={{ textShadow: "black 0px 5px 5px", fontWeight: "bold" }}>
          Empowering every small business to thrive with the power of
          data-driven decisions.
        </h2>
        <p style={{ width: "90%", textAlign: "center" }}>
          We believe data can be the great equalizer, democratizing success and
          leveling the playing field for small businesses. Through AI-powered
          insights and accessible tools, we want to make data-driven
          decision-making a reality for all, removing technical barriers and
          financial constraints.
        </p>
        <Container style={{ margin: "0% 4% 0% 4%" }}>
          <Row md={12} lg={12}>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <IoBusinessSharp size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Unleash the hidden potential of every small business
                  </Card.Title>
                  <Card.Text>
                    By revealing the valuable insights within their data.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <TbScanEye size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Fuel confidence and clarity
                  </Card.Title>
                  <Card.Text>
                    Guiding entrepreneurs towards informed decisions with
                    AI-powered analysis.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <TbBarrierBlockOff size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Break down technical barriers
                  </Card.Title>
                  <Card.Text>
                    Making data insights accessible and understandable,
                    regardless of expertise.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row md={12} lg={12}>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <VscSymbolField size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Level the playing field
                  </Card.Title>
                  <Card.Text>
                    Bridging the gap between small businesses and larger
                    competitors, empowering them to compete and win.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <BsDatabaseFillUp size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Foster a culture of data-driven collaboration
                  </Card.Title>
                  <Card.Text>
                    Where every team member, from owner to employee, can
                    participate in making informed decisions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} lg={4}>
              <Card className="aboutusCard">
                <Card.Body>
                  <RiLightbulbFlashFill size={60} />
                  <Card.Title style={{ fontWeight: "bold" }}>
                    Spark innovation and drive growth
                  </Card.Title>
                  <Card.Text>
                    By providing the tools and knowledge to unlock new
                    opportunities and navigate the ever-changing market.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Container style={{ textAlign: "center", marginBottom:'6%' }}>
        <h1 className="ourMission">
          Empowering Every Business to Unlock the Power of Data with Datalace
        </h1>
        <span className="ourMissionIcon">
          <CgShapeRhombus size={30} color="#67D3DF" />
        </span>
        <h2 style={{ textShadow: "black 0px 5px 5px", fontWeight: "bold", margin:'1% 0%' }}>
          Datalace provides cutting-edge AI data analytics solutions to help
          businesses of all sizes optimize operations and save costs.
        </h2>
        <Row>
          <Col lg={4} md={4}>
            <Image src={image1} style={{ width: "100%", opacity: "0.5" }} />
          </Col>
          <Col lg={4} md={4}>
            <Image src={image2} style={{ width: "100%", opacity: "0.5" }} />
          </Col>
          <Col lg={4} md={4}>
            <Image src={image3} style={{ width: "100%", opacity: "0.5" }} />
          </Col>
        </Row>
      </Container>
      <div style={{ background: "#42454f" }}>
        <Container>
          <Row lg={12} md={12}>
            <Col lg={6} md={6}>
              <Image src={step4} style={{ width: "80%", height: "80%" }} />
            </Col>
            <Col style={{ paddingTop: "2%" }} lg={6} md={6}>
              <h2 style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Spreadsheets got you lost? Datalace charts your course to
                success.
              </h2>
              <ul className="ulAboutUs">
                <li>
                  <strong>
                    AI-powered insights. Faster, bolder decisions.
                  </strong>
                </li>
                <li>
                  <strong>ODitch the spreadsheets, thrive with data.</strong>
                </li>
                <li>
                  <strong>Everyone empowered, data-driven business.</strong>
                </li>
                <li>
                  <strong>
                    Your 24/7 data whisperer. Grow smarter, faster.
                  </strong>
                </li>
                <li>
                  <strong> Grow your business, AI makes it simple.</strong>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ textAlign: "center", margin: "5%" }}>
        <h1 className="ourMission">Features</h1>
        <span className="ourMissionIcon">
          <CgShapeRhombus size={30} color="#67D3DF" />
        </span>
        <h2
          style={{
            textShadow: "black 0px 5px 5px",
            fontWeight: "bold",
            margin: "1%",
          }}
        >
          Datalace isn't just about fancy features. It's built with your small
          business in mind
        </h2>
        <Container style={{ marginTop: "2%" }}>
          <Row
            lg={12}
            md={12}
            style={{ marginLeft: "5%", marginRight: "5%", height: "20%" }}
          >
            <Col id="cardFeature">
              <p>
                {" "}
                <span
                  style={{
                    color: "#67D3DF",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    paddingBottom: "2em",
                  }}
                >
                  <TbPigMoney size={50} />
                  <br />
                  Affordable
                </span>
                <br />
                Skip the consultants, unleash insights. Datalace: affordable
                data power.
              </p>
            </Col>
            <Col id="cardFeature">
              <p>
                <span
                  style={{
                    color: "#67D3DF",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    paddingBottom: "2em",
                  }}
                >
                  <RiUserSmileLine size={50} />
                  <br />
                  Easy to use{" "}
                </span>
                <br />
                No tech degree? No problem. Datalace speaks your language.
              </p>
            </Col>
            <Col id="cardFeature">
              <p>
                <span
                  style={{
                    color: "#67D3DF",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    paddingBottom: "2em",
                  }}
                >
                  <FaBookAtlas size={50} />
                  <br />
                  Always learning
                </span>
                <br />
                Datalace grows with you. Your data, its superpower.
              </p>
            </Col>
          </Row>
        </Container>
        <h2
          style={{
            textShadow: "black 0px 5px 5px",
            fontWeight: "bold",
            margin: "3% 0% 1%",
          }}
        >
          Here's how Datalace works its magic
        </h2>
        <Container>
          <Row lg={12} md={12}>
            <Col className="cardWorks">
              <PiPlugsConnectedFill size={50} />
              <p style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Connect any app, analyze any data
              </p>
              <p>
                Datalace seamlessly integrates with your existing tools and
                platforms, pulling in your data automatically
              </p>
            </Col>
            <Col className="cardWorks">
              <BsDatabaseFillGear size={50} />
              <p style={{ color: "#67D3DF", fontWeight: "bold" }}>
                AI does the heavy lifting
              </p>
              <p>
                Our cutting-edge algorithms analyze your data, uncovering hidden
                patterns and trends that traditional methods might miss.
              </p>
            </Col>
            <Col className="cardWorks">
              <MdOutlineContentPasteSearch size={50} />
              <p style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Crystal-clear insights, delivered
              </p>
              <p>
                Get reports and visualizations that are easy to understand, even
                for those with no data science background.
              </p>
            </Col>
            <Col className="cardWorks">
              <RiTimerFlashFill size={50} />
              <p style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Decisions in minutes, not months
              </p>
              <p>
                No more waiting for reports or relying on gut instinct. Make
                data-driven decisions with confidence, every time.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ background: "#42454f" }}>
        <Container style={{ width: "100%", background: "#42454f" }}>
          <Row lg={12} md={12}>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              lg={6}
              md={6}
            >
              <h5 style={{ color: "#67D3DF", fontWeight: "bold" }}>
                Datalace is more than just an app, it's a game-changer for
                small. It's your secret weapon to:
              </h5>
              <ul className="ulAboutUs">
                <li>
                  <strong>Boost your bottom line</strong>
                </li>
                <li>
                  <strong>Outsmart the competition</strong>
                </li>
                <li>
                  <strong>Empower your team</strong>
                </li>
              </ul>
            </Col>
            <Col lg={6} md={6}>
              <Image src={step3} style={{ height: "90%", width: "90%" }} />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <div className="notify">
          <h1>Our news on the way</h1>
          <p>Sign up to be the first to know what's new in our information</p>
          <form>
            <input placeholder="Enter your email" type="text" />
            <button>Notify me</button>
          </form>
        </div>
        <div style={{ height: "50px", padding: "none" }}></div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
