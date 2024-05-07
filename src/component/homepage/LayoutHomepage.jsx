import React, { useState } from "react";
import logo from "./../../logo-1.svg";
import "./homepage.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { IoIosLogOut } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";

const MenuItemDropDown = ({ topic, listTitleBlog }) => {
  const navigate = useNavigate();

  return (
    <div className="menuTopic" style={{ width: "30%", margin: "5% 0" }}>
      <p style={{ fontWeight: "bold", textAlign: "center" }}>{topic}</p>
      <div className="menuDropTitle">
        {listTitleBlog?.map((item, index) => (
          <p
            key={index}
            onClick={() => {
              navigate(`${item.link}`);
            }}
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
};

function LayoutHomepage() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [hoverGetStarted, setHoverGetStarted] = useState(false);

  const logOut = () => {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      Cookies.remove(cookieName);
    }
    navigate("/login");
  };

  return (
    <>
      <>
        <Navbar
          expand="sm"
          className="bg-black w-100 homeNavBar  navbar-fixed-top "
        >
          <Container fluid>
            <Navbar.Brand href="../">
              <img style={{ width: 80, paddingLeft: 20 }} src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="custom-toggler"
            />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="custom-nav">
                <a
                  onClick={() => {
                    navigate("");
                  }}
                >
                  HOME
                </a>
                <a
                  onClick={() => {
                    navigate("product");
                  }}
                >
                  PRODUCT
                </a>
                <a onClick={() => navigate("about-us")}>ABOUT US</a>

                {/* <div className="menuDropDown">
                  <a className="btnBlog" onClick={() => navigate("blogs")}>
                    BLOG
                  </a>

                  <div className="menuDropDown-content">
                    <MenuItemDropDown
                      topic={"Data"}
                      listTitleBlog={[
                        {
                          title: `2 Parameter-efficient Fine-tuning
                          (PEFT) techniques for LLM:
                          LoRA and QLoRA (Part 1)`,
                          link: "/blog-detail",
                        },
                      ]}
                    />
                    <MenuItemDropDown
                      topic={"Fintech"}
                      listTitleBlog={[
                        {
                          title: "Applications of Fintech",
                          link: "/blog-detail-v2",
                        },
                      ]}
                    />
                    <MenuItemDropDown
                      topic={"Technology"}
                      listTitleBlog={[
                        {
                          title: "Financial Technology Trends: Grab to Grow",
                          link: "/blog-detail-v3",
                        },
                      ]}
                    />
                  </div>
                </div> */}
                <a
                  onClick={() => {
                    navigate("contact-us");
                  }}
                >
                  CONTACT US
                </a>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="custom-nav align-items-baseline">
                {Cookies.get("user") ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        background: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "none",
                      }}
                      id="dropdown-basic-1"
                    >
                      {Cookies.get("user")}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {Cookies.get("user") === "admin" ? (
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/add-new-blog");
                          }}
                        >
                          <FaRegNewspaper
                            color="black"
                            size={23}
                            style={{ marginRight: "5%" }}
                          />
                          New Post
                        </Dropdown.Item>
                      ) : null}
                      <Dropdown.Item
                        onClick={() => {
                          logOut();
                        }}
                      >
                        <IoIosLogOut
                          color="black"
                          size={25}
                          style={{ marginRight: "5%" }}
                        />
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <NavLink
                    // href="../login"
                    className="btn btn-outline-light m-2"
                    id="btn-logout"
                    onClick={() => {
                      navigate("login");
                    }}
                  >
                    SIGN IN
                  </NavLink>
                )}
                {Cookies.get("user") ? (
                  <NavLink
                  style={{
                    border: "1px solid rgba(103, 211, 223, 1)",
                    color: "rgba(103, 211, 223, 1)",
                    borderRadius: "5px",
                    position: "relative",
                    transition: "all ease-in-out 0.2s",
                  }}
                  className="btn btn-outline-light m-2 bubbly-button"
                  id="btn-logout"
                  onMouseOver={(e) => {
                    e.target.classList.add("animate");
                  }}
                  onMouseLeave={(e) => {
                    e.target.classList.remove("animate");
                  }}
                  onClick={() => {
                    navigate("/chat");
                  }}
                >
                  START NOW
                  <span
                    style={{
                      marginBottom: "0.1rem",
                      marginLeft: "0.5rem",
                      marginRight: "none",
                    }}
                  >
                    {" "}
                    <SlArrowRight size={"13px"} marginRight="none" />
                  </span>
                </NavLink>
                ) : (
                  <NavLink
                    style={{
                      border: "1px solid rgba(103, 211, 223, 1)",
                      color: "rgba(103, 211, 223, 1)",
                      borderRadius: "5px",
                      position: "relative",
                      transition: "all ease-in-out 0.2s",
                    }}
                    className="btn btn-outline-light m-2 bubbly-button"
                    id="btn-logout"
                    onMouseOver={(e) => {
                      e.target.classList.add("animate");
                    }}
                    onMouseLeave={(e) => {
                      e.target.classList.remove("animate");
                    }}
                    onClick={() => {
                      navigate("/request-a-demo");
                    }}
                  >
                    REQUEST A DEMO
                    <span
                      style={{
                        marginBottom: "0.1rem",
                        marginLeft: "0.5rem",
                        marginRight: "none",
                      }}
                    >
                      {" "}
                      <SlArrowRight size={"13px"} marginRight="none" />
                    </span>
                  </NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>

      <Outlet></Outlet>
      {location != "/learn-more" ? (
        <button
          className="btnLearnMore"
          style={{
            display: "flex",
            position: "fixed",
            width: "150px",
            height: "45px",
            bottom: "20px",
            right: "20px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "2px 2px 3px #000 0.3",
            zIndex: "1000!important",
            background: "grey",
            borderRadius: "20px",
            opacity: "80%",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => navigate("learn-more")}
        >
          Learn more
        </button>
      ) : (
        <></>
      )}
      {/* {location != "/" ? (
        <PiArrowLeftBold
          className="btnBack"
          size={35}
          style={{
            cursor: "pointer",
            margin: "20px",
            zIndex: "100000",
            position: "absolute",
            position: "fixed",
            top: "106.4px",
            left: "3%",
          }}
          color="white"
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <></>
      )} */}
    </>
  );
}
export default LayoutHomepage;
