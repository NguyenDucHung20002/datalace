import React from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./css/Blog.css";
import figure1 from "./Image/qlora(P1)/LLM.png"
import PEFT from "./Image/qlora(p2)/PEFT.png"
import RLHF3 from './Image/RLHF/RLHF03.jpg'
function CardBlog({ image, title, text, link }) {
  const navigate = useNavigate();
  return (
    <Col
      lg={4}
      md={4}
      sm={4}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <Card className="cardBlog" onClick={() => navigate(`${link}`)}>
        <Row>
          <Col xl={12}>
            <Card.Img variant="top" src={image} style={{ height: "300px",objectFit: "cover"  }} />
          </Col>
          <Col xl={12}>
            <Card.Body style={{maxHeight:'200px'}}>
              <Card.Title>{title}</Card.Title>
              <Card.Text className="blogText">{text}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
function Blogs() {
  return (
    <>
      <Container fluid className="BlogPage" style={{background:'#33363f'}}>
        <Row>
          <Col md={8}>
            
          </Col>
          <Col md={4}>
          </Col>
        </Row>
        <Row className="search">
          <Col xs={12} className="text-center">
            <h1 style={{textShadow:"rgba(0, 0, 0, 0.4) 0px 5px 4px", fontWeight:'bold'}}>Our Blog</h1>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-center align-items-center"
          >
            <InputGroup style={{ height: "50px" }}>
              <Form.Control
                aria-label="Text input with dropdown button"
                placeholder="Search"
                style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  outlineWidth: "none",
                  color: "white",
                  borderBottomLeftRadius: "30px",
                  borderTopLeftRadius: "30px",
                  fontSize: "18px",
                  border: "none",
                  height: "100%",
                  padding: "0 3%",
                }}
                className="inputSearchBlog"
              />

              <DropdownButton
                variant="outline-secondary"
                title="Filter"
                id="input-group-dropdown-2"
                align="end"
              >
                <Dropdown.Item>Topic 1</Dropdown.Item>
                <Dropdown.Item>Topic 2</Dropdown.Item>
                <Dropdown.Item>Topic 3</Dropdown.Item>
                <Dropdown.Item>Topic 4</Dropdown.Item>
              </DropdownButton>
              <button
                style={{
                  background: "rgba(255, 219, 181, 1)",
                  border: "none",
                  width: "75px",
                  borderRadius: "30px",
                }}
              >
                <BsSearch style={{ color: "black" }} />
              </button>
            </InputGroup>
          </Col>
        </Row>
        <Row style={{margin: '2% 0%'}}>
          <CardBlog
            image={
              figure1
            }
            title={`2 Parameter-efficient Fine-tuning
            (PEFT) techniques for LLM:
            LoRA and QLoRA (Part 1)`}
              text={
                "A Large Language Model (LLM) is an AI algorithm that uses neural networks to understand and generate human language."
              }
            link={"/blog-detail"}
          />
          <CardBlog
              image={
                PEFT
              }
              title={`2 Parameter-efficient Fine-tuning
              (PEFT) techniques for LLM:
              LoRA and QLoRA (Part 2)
              `}
              text={
                `As you have LoRA, you can train your model faster, but there are some models so large
                that you can not even load it if you don’t have extended resource(e.g. Llama), Don’t
                worry, QLoRA can help you lighten the model by quantization technique so that you can
                try more LLM.
                `
              }
              link={"/blog-detail-v1"}
            />
          <CardBlog
              image={
                RLHF3
              }
              title={"RLHF"}
              text={`In recent years, language models have demonstrated remarkable abilities by
                generating varied and engaging text from prompts provided by humans. However,
                defining what constitutes “good” text is inherently challenging as it is both subjective
                and dependent on context.`}
              link={"/blog-detail-v2"}
            />
        </Row>
        <Row className="mt-auto" style={{background:'#33363f'}}>
        <div className="notify">
          <h1>Our news on the way</h1>
          <p>Sign up to be the first to know what's new in our blog</p>
          <form>
            <input placeholder="Enter your email" type="text"/>
            <button>Notify me</button>
          </form>
        </div>
        <div style={{height:"50px", padding:"none"}} ></div>
          <Footer />
        </Row>
      </Container>
    </> 
  );
}

export default Blogs;
