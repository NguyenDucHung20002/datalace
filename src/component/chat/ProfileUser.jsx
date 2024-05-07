import React, { useEffect, useRef, useState } from "react";
import { Container, Image, Row, Col, Form, Button } from "react-bootstrap";
import background from "./background.png";
import avatar from "./../../logoAI.png";
import Cookies from "js-cookie";
import { getUser } from "../../services/user";
import moment from "moment";
import { FaCamera } from "react-icons/fa";
function ProfileUser() {
  const [user, setUser] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const inputFileReference = useRef(null);
  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    // getUser(Cookies.get("accessToken"))
    //   .then((res) => {
    //     setUser(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  const fileUploadAction = () => {
    inputFileReference.current.click();
  };
  const uploadImage = async () => {
    const selectedFile = inputFileReference.current.files[0];
    const url = URL.createObjectURL(selectedFile);
    await setUrlImage(url);
  };

  return (
    <>
      <div style={{ position: "relative", height: "30vh", width: "100vw" }}>
        <Image src={background} style={{ height: "100%", width: "100%" }} />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "10%",
            width: "80%",
            height: "60vh",
            borderRadius: "12px",
          }}
        >
          <Row>
            <Col
              sm={3}
              style={{
                background: "#FEFEFE",
                height: "58vh",
                borderRadius: "12px",
                position: "relative",
              }}
              className="colImage"
            >
              <Image
                src={urlImage === "" ? avatar : urlImage}
                style={{
                  height: "10em",
                  width: "10em",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                roundedCircle
              />
              <Button
                color="black"
                style={{
                  cursor: "pointer",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "2rem",
                  position: "absolute",
                  bottom: "63%",
                  left: "60%",
                  border: "3px solid white",
                }}
                onClick={() => fileUploadAction()}
                onChange={() => uploadImage()}
              >
                <FaCamera></FaCamera>
                <input
                  hidden
                  ref={inputFileReference}
                  type="file"
                  style={{ background: "red" }}
                />
              </Button>
              <div
                style={{
                  fontSize: "20px",
                  color: "black",
                  zIndex: "100",
                  top: "34%",
                  left: "21%",
                  position: "absolute",
                  textAlign: "center",
                  marginTop: "8%",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                    width: "12vw",
                    whiteSpace: "break-spaces",
                    marginBottom: "0px",
                  }}
                >
                  {Cookies.get("user")}
                </p>
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "1.2rem",
                    width: "12vw",
                    whiteSpace: "break-spaces",
                    marginBottom: "0px",
                  }}
                >
                  {user.job}
                </p>
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "0.9rem",
                    width: "12vw",
                    whiteSpace: "break-spaces",
                  }}
                >
                  {" "}
                  Join date: {moment(user.created_at).format("MMMM Do YYYY")}
                </p>
              </div>
            </Col>
            <Col sm={9}>
              <div
                style={{
                  position: "absolute",
                  zIndex: "1",
                  color: "black",
                  background: "#FEFEFE",
                  height: "58vh",
                  padding: "5%",
                  borderRadius: "12px",
                }}
                className="colInfor"
              >
                <Row>
                  <Col sm={6}>
                    <div
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      Full name
                      <div className="input-container-pf">
                        <input
                          className="input-field-pf"
                          type="text"
                          placeholder="Your full name"
                          name="fullname"
                          maxLength={50}
                          value={user.fullname}
                          style={{ width: "50vw" }}
                          disabled={openUpdate ? "" : "disabled"}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      Email
                      <div className="input-container-pf">
                        <input
                          className="input-field-pf"
                          type="text"
                          placeholder="Your Email"
                          name="email"
                          maxLength={50}
                          value={user.email}
                          style={{ width: "30vw" }}
                          disabled={openUpdate ? "" : "disabled"}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      Phone number
                      <div className="input-container-pf">
                        <input
                          className="input-field-pf"
                          type="text"
                          placeholder="Your Email"
                          name="email"
                          maxLength={50}
                          value={user.phone}
                          style={{ width: "30vw" }}
                          disabled={openUpdate ? "" : "disabled"}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      Gender
                      <div className="input-container-pf">
                        <Form.Select
                          style={{
                            background: "none",
                            outline: "none",
                            border: "none",
                          }}
                          aria-label="Default select example"
                          disabled={openUpdate ? "" : "disabled"}
                        >
                          <option
                            value="Male"
                            selected={user.gender === "Male" ? "selected" : ""}
                          >
                            Male
                          </option>
                          <option
                            value="Female"
                            selected={
                              user.gender === "Female" ? "selected" : ""
                            }
                          >
                            Female
                          </option>
                        </Form.Select>
                      </div>
                    </div>
                    <div
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      Martial
                      <div className="input-container-pf">
                        <Form.Select
                          style={{
                            background: "none",
                            outline: "none",
                            border: "none",
                          }}
                          aria-label="Default select example"
                          disabled={openUpdate ? "" : "disabled"}
                        >
                          <option
                            value="Single"
                            selected={
                              user.martial === "Single" ? "selected" : ""
                            }
                          >
                            Single
                          </option>
                          <option
                            value="Married"
                            selected={
                              user.martial === "Married" ? "selected" : ""
                            }
                          >
                            Married
                          </option>
                          <option
                            value="Widowed"
                            selected={
                              user.martial === "Widowed" ? "selected" : ""
                            }
                          >
                            Widowed
                          </option>
                          <option
                            value="Divorced"
                            selected={
                              user.martial === "Divorced" ? "selected" : ""
                            }
                          >
                            Divorced
                          </option>
                        </Form.Select>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div style={{ display: "flex" }}>
                  <button
                    className="btnEditPro"
                    style={{
                      background: "#364aff",
                      height: "53px",
                      color: "white",
                      fontWeight: "bold",
                      width: "10%",
                      marginTop: "20px",
                      borderRadius: "35px",
                      border: "none",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      if (!openUpdate) {
                        setOpenUpdate(!openUpdate);
                      } else {
                        console.log("Update");
                      }
                    }}
                  >
                    {openUpdate ? "Done" : "Update"}
                  </button>
                  {openUpdate ? (
                    <button
                      className="btnEditPro"
                      style={{
                        background: "#d9d9d9",
                        height: "53px",
                        color: "black",
                        fontWeight: "bold",
                        width: "10%",
                        marginTop: "20px",
                        marginLeft: "20px",
                        borderRadius: "35px",
                        border: "none",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => {
                        setOpenUpdate(!openUpdate);
                      }}
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>

          {/* <div
            style={{
              background: "black",
              width: "1px",
              height: "100%",
              position: "absolute",
              zIndex: "100000000",
              left: "20%",
            }}
          ></div> */}
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
