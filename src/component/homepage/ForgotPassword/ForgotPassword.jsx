import React, { useContext, useEffect, useState } from "react";
import "./../SignUp/SignUp.css";
import Logo from "../../../Datalace-02.png";
import BackgroundSignUp from "./../Image/bg-FP.png";
import { checkEmailValid } from "../../../services/user";
import ModalNotice from "../ModalNotice";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Home";
import { Form, Modal } from "react-bootstrap";
export default function ForgotPassword() {
  const [inputFullName, setFullName] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [confirmPW, setConfirmPW] = useState("");
  const [modalCode, setModalCode] = useState(false)
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  
  const navigate = useNavigate();
  const user = useContext(userContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  };

  const handlePW = async () => {
    const userName = inputUserName.trim();
    const password = inputPassword.trim();
    if (userName.trim() === "" || password.trim() === "") {
      setMessage("Please enter information!");
      setShow(!show);
    } else {
      if (localStorage.getItem(userName) == null) {
        setShow(!show);
        setMessage("Username dosen't exist! Please try again.");
      } else if (confirmPW === inputPassword) {
        const dt = localStorage.getItem(userName);
        const dt1 = JSON.parse(dt);
        let data = JSON.stringify({
          full_name: dt1.full_name,
          email: dt1.email,
          user_name: userName,
          password: password,
        });

        localStorage.setItem(userName, data);
        await setShow(!show);
        await setMessage("Success");

        user.setUser(userName);

        setInputEmail("");
        setConfirmPW("");
        setInputPassword("");
        setInputUserName("");
        setFullName("");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setShow(!show);
        setMessage("Password are not the same! Please try again.");
      }
    }
  };

  const CheckEmailExits = async () => {
    if (
      localStorage.getItem(inputEmail) != null ||
      localStorage.getItem(inputUserName) != null
    ) {
      setShow(!show);
      setMessage("Username or password already exist! Please try again.");
      // console.log("Hello");
    }
  };

  return (
    <>
      <div style={{height:'100vh'}}>
        <title>Document</title>
        <div className="signUp">
          <div className="imageWrap1">
            <img id="imageLogo1" src={Logo} />
          </div>
          <div className="contentWrap">
            <div className="left-content">
              <img style={{width:'75%'}} id="bg-signup" src={BackgroundSignUp} />
            </div>
            <div className="right-content">
              <h1>Forgot Password</h1>
              <form className="fromSignup" action="post">
                {/* <div className="input-container">
                    <i
                      className="bi bi-person-bounding-box"
                      style={{ fontSize: 30 }}
                    ></i>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Full name"
                      name="fullName"
                      onChange={(e) => setFullName(e.target.value)}
                      maxLength={50}
                    />
                  </div> */}
                <div className="input-container">
                  <i className="bi bi-person" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="User name"
                    name="userName"
                    onChange={(e) => setInputUserName(e.target.value)}
                    maxLength={50}
                  />
                </div>
                {/* <div className="input-container">
                    <i className="bi bi-envelope" style={{ fontSize: 30 }}></i>
                    <input
                      className="input-field"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setInputEmail(e.target.value)}
                      maxLength={50}
                    />
                  </div> */}
                <div className="input-container">
                  <i className="bi bi-key-fill" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    placeholder="New Password"
                    name="password"
                    style={{ width: "88%" }}
                    type={typeInputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <i
                      className="bi bi-eye"
                      style={{ fontSize: 30 }}
                      onClick={() => handleShowPassword()}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash"
                      style={{ fontSize: 30 }}
                      onClick={() => handleShowPassword()}
                    ></i>
                  )}
                </div>

                <div className="input-container">
                  <i className="bi bi-key-fill" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    placeholder="Confirm password"
                    name="password"
                    style={{ width: "88%" }}
                    type={typeInputPassword}
                    onChange={(e) => setConfirmPW(e.target.value)}
                  />
                  {showPassword ? (
                    <i
                      className="bi bi-eye"
                      style={{ fontSize: 30 }}
                      onClick={() => handleShowPassword()}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash"
                      style={{ fontSize: 30 }}
                      onClick={() => handleShowPassword()}
                    ></i>
                  )}
                </div>
              </form>
              {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 18,
                    marginTop: "-10px",
                  }}
                >
                  <img
                   onClick={()=>{
                    if(iconCheck===IconCheck0){
                      setIconCheck(IconCheck1)
                      setBtnDisable(!btnDisabled)
                    }else{
                      setIconCheck(IconCheck0)
                      setBtnDisable(!btnDisabled)
                    }
                   }}
                    style={{ width: 20, height: 20, cursor: "pointer", marginTop: 3, marginRight: 3 }}
                    id="iconCheck"
                    src={iconCheck}
                  />
                  <p style={{ fontStyle: "italic" }}>
                    I’ve read and agree with <span style={{ fontWeight: "bold" }}>
                      Terms of Servies
                    </span> and our <span style={{ fontWeight: "bold" }}>Privacy Policy</span>
                  </p>
                </div> */}
              <button className="btnSignUp" onClick={() => handlePW()}>
                Done
              </button>
              {/* <p style={{ fontSize: 18 }}>
                  Already have an account? <a
                    href="../login"
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Sign in
                  </a>
                </p> */}
            </div>
          </div>
        </div>
      </div>

      <ModalNotice show={show} setShow={setShow} message={message} />
      <Modal show={modalCode} centered>
        <Modal.Header style={{ background: "#00178d", border: "none" ,height:'15px'}}>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => {
              setModalCode(!modalCode);
            }}
          />
          </Modal.Header>


        <Modal.Body
          style={{
            backgroundImage:
              "linear-gradient(180deg, #00178D 27.35%, #095397 103.4%, #095397 103.41%)",
              textAlign:'center'
          }}
        >
          <h2>Verify Account</h2>
          <p>Enter the otp sent to your number</p>
          <form>
            <div className="d-flex justify-content-between pt-4 pb-5">
              <input type="text" maxLength={1} className="inputCode"/>
              <input type="text" maxLength={1} className="inputCode"/>
              <input type="text" maxLength={1} className="inputCode"/>
              <input type="text" maxLength={1} className="inputCode"/>
            </div>
            <button className="btnSubmit">SUBMIT</button>
          </form>

        </Modal.Body>
      </Modal>
    </>
  );
}
