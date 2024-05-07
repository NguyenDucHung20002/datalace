
import React, { useState } from "react";
import bg from "./Image/bg.jpg";
import { Form, ToastContainer } from "react-bootstrap";
import { submitEmail } from "../../services/user";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

function LearnMore() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${bg})`,
          backgroundSize:'cover'
        }}
      >
        <div style={{ position: "absolute", top: "35%", left: "23%" }}>
          <h1>Our news on the way</h1>
          <p>Sign up to be the first to know what's new in our product.</p>
          <Form style={{ marginTop: "10%" }} id="registerform" onSubmit={(e)=>{e.preventDefault()}}>
            <Form.Control
              style={{
                borderRadius: "20px",
                background: "none",
                color: "white",
                height: "40px",
              }}
              placeholderTextColor="white"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="sumit"
              style={{
                marginTop: "5vh",
                width: "100%",
                background: "#364aff",
                height: "40px",
                color: "white",
                fontWeight: "bold",
                marginTop: "10px",
                borderRadius: "35px",
                border: "none",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => handleSubmitEmail()}
            >
              SEND
            </button>
          </Form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default LearnMore;
