import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Footer from "./Footer";
import { contact, submitEmail } from "../../services/user.js";
import ModalNotice from "./ModalNotice.jsx";
import { Oval } from "react-loader-spinner";
import "./homepage.css";
import { ToastContainer, toast } from "react-toastify";
function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [notify, setNotify] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMess = (e) => {
    e.preventDefault();
    setLoading(true);
    submitEmail(email, "Contact Us", message)
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
          setMessage("");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // contact(email, message)
    //   .then((response) => {
    //     setLoading(false)
    //     setEmail('')
    //     setMessage('')
    //     setNotify(response.data.message)
    //     setShow(true)
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 500) {
    //       setLoading(false)
    //       setEmail('')
    //       setMessage('')
    //       setNotify(error.response.data.detail)
    //       setShow(true)
    //     }
    //     else {
    //       setLoading(false)
    //       console.error('Error sending data:', error);
    //     }
    //   });
  };
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
        style={{
          background: "#33363f",
          width: "100vw",
          paddingTop: "150px",
          color:'white'
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            textShadow: "rgba(0, 0, 0, 0.4) 0px 5px 4px",
            color: "#67D3DF",
            textAlign: "center",
          }}
        >
          Contact Us
        </div>
        <Row style={{ width: "100%", marginTop: "10vh" }}>
          <Col
            sm={6}
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form style={{ width: "80%" }} onSubmit={sendMess}>
              <Form.Control
                className="email"
                style={{
                  margin: "10px",
                  borderRadius: "20px",
                  background: "none",
                  color: "white",
                }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control
                className="email"
                style={{
                  margin: "10px",
                  borderRadius: "20px",
                  background: "none",
                  height: "100px",
                  color: "white",
                }}
                placeholder="What sevices are you looking for?"
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="sumit"
                style={{
                  marginTop: "5vh",
                  width: "100%",
                  margin: "10px",
                  background: "#364aff",
                  height: "40px",
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "20px",
                  borderRadius: "35px",
                  border: "none",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                SEND
              </button>
            </Form>
          </Col>
          <Col sm={6} style={{ width: "40%" }}>
            <h1>QUESTIONS OR COMMNENTS</h1>
            <p style={{ fontStyle: "italic", fontWeight: "lighter" }}>
              Let us know more about your project. We can customize our services
              into a package that fits your specific needs. Tell us more about
              your ideas, and we'll get back to you soon with some answers.
            </p>
          </Col>
        </Row>
        <div style={{ width: "100%", position: "absolute", bottom: "0" }}>
          <Footer />
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default ContactUs;
