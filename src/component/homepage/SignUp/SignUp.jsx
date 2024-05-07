import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import IconCheck0 from "./../Image/Property 1=no.png";
import IconCheck1 from "./../Image/Property 1=yes.png";
import { signUp, checkEmailValid } from "../../../services/user";
import ModalNotice from "../ModalNotice";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const [openSignUp, setOpenSignUp] = props.openSignUp;

  const [inputFullName, setFullName] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [iconCheck, setIconCheck] = useState(IconCheck0);
  const [confirmPW, setConfirmPW] = useState("");
  const [btnDisabled, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  };

  const handleSignUp = async () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    const fullName = inputFullName.trim();
    const userName = inputUserName.trim();
    const email = inputEmail.trim();
    const password = inputPassword.trim();

    if (fullName === "" || userName === "" || email === "" || password === "") {
      setMessage("Please enter information!");
      setShow(!show);
      setConfirmPW("");
      setInputPassword("");

      setInputEmail("");
      setInputUserName("");
      setFullName("");
      setIconCheck(IconCheck0);
      setBtnDisable(!btnDisabled);
    } else {
      if (!checkEmailValid(email)) {
        setMessage("Please enter a valid email address .\nExample@gmail.com");
        setShow(!show);
        setInputEmail("");
        setConfirmPW("");
        setInputPassword("");

        setInputUserName("");
        setFullName("");
        setIconCheck(IconCheck0);
        setBtnDisable(!btnDisabled);
      } else if (userName.includes(" ")) {
        setMessage("Username cannot contain spaces!");
        setShow(!show);
        setInputEmail("");
        setConfirmPW("");
        setInputPassword("");
        setInputUserName("");
        setFullName("");
        setIconCheck(IconCheck0);
        setBtnDisable(!btnDisabled);
      } else if (!passwordRegex.test(password)) {
        setMessage(
          "Password must contain at least 1 uppercase letter, 1 special character, and 1 digit and at least 8 characters"
        );
        setShow(!show);
        setConfirmPW("");
        setInputPassword("");
        setIconCheck(IconCheck0);
        setBtnDisable(!btnDisabled);
      } else if (confirmPW !== inputPassword) {
        setShow(!show);
        setMessage("Password are not the same! Please try again.");
        setConfirmPW("");
        setInputPassword("");
        setIconCheck(IconCheck0);
        setBtnDisable(!btnDisabled);
      } else {
        // setLoading(true);
        // userInf.setUserInf({'userName': userName, 'password': password, 'email':email, 'fullName': fullName })
        // navigate('/signup/update-information')

        await signUp(fullName, userName, email, password)
          .then((response) => {
            setLoading(false);
            setInputEmail("");
            setConfirmPW("");
            setInputPassword("");
            setInputUserName("");
            setFullName("");
            setIconCheck(IconCheck0);
            setBtnDisable(!btnDisabled);
            setShow(!show);
            setMessage("Success");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
            if (error.response && error.response.status === 409) {
              setInputEmail("");
              setConfirmPW("");
              setInputPassword("");
              setInputUserName("");
              setFullName("");
              setIconCheck(IconCheck0);
              setBtnDisable(!btnDisabled);
              setShow(!show);
              setMessage(error.response.data.detail);
            }
          });
      }
    }
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
      <div >
        <title>Document</title>
        <div
          className="signUp"
          style={{
            opacity: openSignUp ? 1 : 0,
            visibility: openSignUp ? "visible" : "hidden",
            transition: "opacity .5s ease-in-out, visibility .5s ease-in-out",
          }}
        >
          <div className="contentWrap">
            <div className="left-content">
              <h1>SIGN UP</h1>
              <p>Create an account to use chatbot</p>
              <form className="fromSignup" action="post">
                <div className="input-container">
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
                    maxLength={30}
                    value={inputFullName}
                  />
                </div>
                <div className="input-container">
                  <i className="bi bi-person" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="User name"
                    name="userName"
                    onChange={(e) => setInputUserName(e.target.value)}
                    maxLength={30}
                    value={inputUserName}
                  />
                </div>
                <div className="input-container">
                  <i className="bi bi-envelope" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setInputEmail(e.target.value)}
                    maxLength={30}
                    value={inputEmail}
                  />
                </div>
                <div className="input-container">
                  <i className="bi bi-key-fill" style={{ fontSize: 30 }}></i>
                  <input
                    className="input-field"
                    placeholder="Password"
                    name="password"
                    style={{ width: "88%" }}
                    type={typeInputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    value={inputPassword}
                  />
                  {showPassword ? (
                    <i
                      className="bi bi-eye"
                      style={{ fontSize: 30, marginRight: "20px" }}
                      onClick={() => handleShowPassword()}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash"
                      style={{ fontSize: 30, marginRight: "20px" }}
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
                    value={confirmPW}
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                    style={{ fontSize: 30, marginRight: 20 }}
                    onClick={() => handleShowPassword()}
                  />
                </div>
              </form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 18,
                  marginTop: "-10px",
                }}
              >
                <img
                  onClick={() => {
                    if (iconCheck === IconCheck0) {
                      setIconCheck(IconCheck1);
                      setBtnDisable(!btnDisabled);
                    } else {
                      setIconCheck(IconCheck0);
                      setBtnDisable(!btnDisabled);
                    }
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    marginTop: 3,
                    marginRight: 3,
                  }}
                  id="iconCheck"
                  src={iconCheck}
                />
                <p style={{ fontStyle: "italic" }}>
                  I’ve read and agree with{" "}
                  <span style={{ fontWeight: "bold" }}>Terms of Servies</span>{" "}
                  and our{" "}
                  <span style={{ fontWeight: "bold" }}>Privacy Policy</span>
                </p>
              </div>
              <button
                className="btnSignUp"
                disabled={btnDisabled}
                onClick={() => handleSignUp()}
              >
                SIGN UP
              </button>
              <p style={{ fontSize: 18 }}>
                Already have an account?{" "}
                <button
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                  }}
                  onClick={() => {
                    setOpenSignUp(false);
                  }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ModalNotice show={show} setShow={setShow} message={message} />
    </>
  );
}
