import React, { useEffect, useState } from "react";
import "./loginPage.css";
import BackGround from "./../Image/bg-login-v3.jpg";
import FbIcon from "./../Image/FacebookIcons.png";
import GgIcon from "./../Image/GoogleIcons.png";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../services/user";
import { Oval } from "react-loader-spinner";
import { PiArrowLeftBold } from "react-icons/pi";
import ModalNotice from "../ModalNotice";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SignUp from "../SignUp/SignUp";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputEmail.trim() === "" || inputPassword.trim() === "") {
      setInputEmail("");
      setInputPassword("");
      setMessage("Please enter information!");
      setShow(!show);
    } else {
      setLoading(true);
      await signIn(inputEmail, inputPassword)
        .then((response) => {
          Cookies.set("accessToken", response.data.access_token);
          Cookies.set("user", response.data.user);
          Cookies.set("timeLogin", Date.now());
          setLoading(false);
          if (Cookies.get("accessToken")) {
            // setModalCode(true)
            navigate("/chat");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (
            error.response &&
            (error.response.status === 404 || error.response.status === 400)
          ) {
            setInputPassword("");
            setLoading(false);
            setMessage(error.response.data.detail);
            setShow(!show);
          }
        });
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log(codeResponse)
      Cookies.set("accessToken", codeResponse.access_token);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          Cookies.set("user", res.data.name);
          navigate("/chat");
        });
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIsIpad(window.innerWidth <= 1024);
    };

    // Initial check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div>
        <title>Login</title>
        <div className="loginWrap">
          <PiArrowLeftBold
            size={35}
            style={{
              cursor: "pointer",
              margin: "20px",
              zIndex: "100",
              position: "absolute",
            }}
            color={!openSignUp ? "white" : "black"}
            onClick={() => {
              navigate("/");
            }}
          />
          {isIpad ? (
            <></>
          ) : (
            <div className="leftWrap">
              <a
                href="../"
                style={{
                  height: "100%",
                  width: "50vw",
                  position: "absolute",
                  left: !isIpad ? (openSignUp ? "50vw" : "0vw") : undefined,
                  top: isIpad ? (openSignUp ? "50vh" : "0vh") : undefined,
                  transition: "ease-in-out .5s",
                }}
              >
                <img src={BackGround} style={{ objectFit: "cover" }} />
              </a>
              <SignUp openSignUp={[openSignUp, setOpenSignUp]} />
            </div>
          )}
          <div
            className="rightWrap"
            style={{
              opacity: !openSignUp ? 1 : 0,
              visibility: !openSignUp ? "visible" : "hidden",
              transition: "opacity .5s ease-in-out, visibility .5s ease-in-out",
              backgroundImage: isIpad ? `url(${BackGround})` : undefined,
              filter: isIpad ? "blur(5px)" : undefined,
              WebkitFilter: isIpad ? "blur(2px)" : undefined,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "22%",
              left: !isIpad?'50%':undefined,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems:'center',
              width:isIpad? '100vw':'50vw',
              color: !isIpad?'black':'white'
            }}
          >
            <h1>SIGN IN</h1>
            <p>Enter your details to get sign in your account</p>
            <form className="formLogin" onSubmit={handleLogin}>
              <div className="input-container">
                <i className="bi bi-person" style={{ fontSize: 30 }}></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="User name or mail address"
                  name="email"
                  onChange={(e) => setInputEmail(e.target.value)}
                  maxLength={50}
                  value={inputEmail}
                />
              </div>
              <div className="input-container">
                <i className="bi bi-key-fill" style={{ fontSize: 30 }}></i>
                <input
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  style={{ width: "82%" }}
                  type={typeInputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                  }}
                  value={inputPassword}
                />
                <i
                  className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                  style={{ fontSize: 30, marginTop: 5, marginRight: 10 }}
                  onClick={() => handleShowPassword()}
                />
              </div>
              <p
                style={{
                  color: "#fa6900",
                  fontSize: 15,
                  marginTop: "-15px",
                  marginLeft: 22,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot password?
              </p>
              <button
                className="btnSignIn"
                // onClick={() => {
                //   handleLogin();
                // }}
                type="submit"
              >
                SIGN IN
              </button>
            </form>
            <p
              style={{
                width: "50%",
                float: "left",
                paddingLeft: 22,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Don't you have an account?{" "}
              <button
                style={{
                  fontWeight: 600,
                  color: "black",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                }}
                onClick={() => {
                  // setOpenSignUp(true);
                  navigate("/request-a-demo");
                }}
              >
                Request a demo
              </button>
            </p>
            <div className="signWith">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #222 0%, #c4c4c4 82.29%)",
                }}
              />
              <span>Or sign in with</span>
              <div
                style={{
                  backgroundImage:
                    "linear-gradient( 90deg,#9d9d9d 14.58%,#222 100%)",
                }}
              />
            </div>
            <div className="socialIcon">
              <button
                style={{ border: "none", background: "none" }}
                onClick={() => login()}
              >
                <img src={GgIcon} />
              </button>

              <img src={FbIcon} />
            </div>
          </div>
        </div>
      </div>

      <ModalNotice show={show} setShow={setShow} message={message} />
    </>
  );
}
