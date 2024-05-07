import React from "react";
import { Card, Image } from "react-bootstrap";
import imageBlog from "./Image/ImageBlogInHome.png";
import { RiDoubleQuotesL } from "react-icons/ri";
import {RiStarSFill} from 'react-icons/ri'
import Footer from "./Footer";

const CardComment = () => {
  return (
    <div className="col-4">
      <Card
        style={{
          background: "none",
          boxShadow: "none",
          borderRadius: "0px",
          borderTop: "1px solid white",
          borderBottom: "1px solid white",
          paddingTop: "5%",
          margin: "5% 7%",
          cursor:'pointer'
        }}
      >
        <Image src={imageBlog} roundedCircle />
        <Card.Body>
          <Card.Title>
            <h1>Lorem Ipsum </h1>
          </Card.Title>
          <Card.Text style={{ textAlign: "left" }}>
            <RiDoubleQuotesL size={30} color={"rgb(255,255,255,0.25)"} />
            <br />
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <div style={{float:'right', marginTop:'20%'}}>
                <RiStarSFill color="yellow" size={25}/>
                <RiStarSFill color="yellow" size={25}/>
                <RiStarSFill color="yellow" size={25}/>
                <RiStarSFill color="yellow" size={25}/>
                <RiStarSFill size={25}/>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

function Testimonials() {
  return (
    <>
      <div
        className="container-fluid"
        style={{ marginTop: "180px", textAlign: "center" ,marginBottom:'5%'}}
      >
        <p>Lorem Ipsum is simply</p>
        <h1>Lorem Ipsum is simply dummy text</h1>
        <div
          className="row"
          style={{
            marginTop: "2%",
            width: "100%",
            display: "flex",
            padding: "0 18%",
          }}
        >
          <CardComment/>
          <CardComment/>
          <CardComment/>
          <CardComment/>
          <CardComment/>
          <CardComment/>
        </div>
      </div>
      <div style={{width:'100%', marginTop:'3%'}}>
        <Footer/>
      </div>
    </>
  );
}
export default Testimonials;
