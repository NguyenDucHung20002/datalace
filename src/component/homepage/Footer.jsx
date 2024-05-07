import React, {useState } from "react";
import FaceIcon from "./Image/FacebookIcons.png";
import GoogleIcon from "./Image/GoogleIcons.png";
import LinkinIcon from "./Image/iconLinkin.png";
import TiktokIcon from "./Image/iconTiktok.png";
import { Col, Image, Row } from "react-bootstrap";
import logo from "./../../logo-1.svg";
import "./homepage.css";
import { ToastContainer, toast } from "react-toastify";
import { submitEmail } from "../../services/user";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmitEmail = async () => {
    setLoading(true)
    await submitEmail(email, "Submit email","")
      .then((result) => {
        if(result.status===200){
          toast.success('Submit email success', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setEmail("")
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <footer className="container-fluid h-10">
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Col lg={4} md={4} id="footer-logo">
          <img src={logo} />
          <p className="text-light">
          68 Circular Rd, Singapore 049422
          </p>
        </Col>

        <Col lg={4} md={4}>
          <Row>
            <Col md={6} id="footer-content">
              <Row>
              
                <Col xs={12}>
                <p
                className="text-light"
                style={{ fontSize: "2.2vw", fontWeight: "bold" }}
              >
                Company
              </p>
                </Col>
                <Col xs={12} style={{padding:"0"}}>
                <a style={{cursor:'pointer'}} onClick={()=>navigate('/privacy-policy')}>Privacy Policy</a>
                </Col>
                <Col xs={12} style={{padding:"0"}}>
                <a href="">Terms of service</a>
                </Col>
              </Row>
              
           
            </Col>
            <Col md={6} id="footer-content">
              <p
                className="text-light"
                style={{ fontSize: "2.2vw", fontWeight: "bold" }}
              >
                Contact
              </p>
              <a href="" data-bs-toggle="modal" data-bs-target="#modal-contact">
                Support
              </a>
              <div style={{ marginTop: "2%" }}>
                <Image
                  style={{ marginRight: "10px", width: "20px" }}
                  src={FaceIcon}
                />
                <Image
                  style={{ marginRight: "10px", width: "20px" }}
                  src={GoogleIcon}
                />
                <Image
                  style={{ marginRight: "10px", width: "20px" }}
                  src={LinkinIcon}
                />
                <Image style={{ width: "20px" }} src={TiktokIcon} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={4}>
        <p style={{fontSize: "1rem", marginLeft:'5%', color:"grey", marginTop:"2%", marginBottom:"0%"}}>Don't miss our new update</p>
          <form className="form" style={{display:'flex', flexDirection:'row', fontSize: "1rem", marginLeft:'5%'}} onSubmit={(e)=>{e.preventDefault()}}>
            <input
              id="subcribe-form-footer"
              style={{ padding:"3%", background:"#4c4c4c",width:"60%", border: "none", borderRadius:"5px", marginRight:"3%"  }}
              placeholder="Enter your email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              id="btn-subcribe-form-footer"
              style={{
                fontSize: "15px",
                background: "#67d3df",
                border:'none',
                color:'white',
                borderRadius:'5px',
                width:'fit-content',
                paddingLeft:"5%",
                paddingRight:"5%",
              }}
              disabled={loading}
              onClick={ () =>{
              handleSubmitEmail()}}
            >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </footer>
    <ToastContainer position="top-right"/>
    </>
  );
}
export default Footer;
