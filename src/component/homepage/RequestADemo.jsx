import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FcDataSheet, FcOvertime } from "react-icons/fc";
import { IoBusinessSharp } from "react-icons/io5";
import { RiTimerFlashFill } from "react-icons/ri";
import { requestADemo } from "../../services/user";
import { Oval } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

export default function RequestADemo() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestDemo = async () => {
    setLoading(true);
    await requestADemo(fullName, email, dateOfBirth, gender, jobTitle)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Request a demo success", {
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
          setDateOfBirth("");
          setFullName("");
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

      <div className="requestDemo" style={{ paddingTop: "100px", background:'#33363f'}}>
        <Form
        className="requestForm"
          style={{
            width: "30%",
            background: "#4f4f4f",
            padding: "2% 4%",
            marginLeft: "15%",
            borderRadius: "1rem",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Full name</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Date of birth</Form.Label>
            <Form.Control
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              placeholder="Date of birth"
            />
          </Form.Group>
          <div>
            <Form.Label style={{ color: "white" }}>Gender</Form.Label>
            <br />
            <Form.Check
              onSelect={(e) => {
                setGender(e.target.value);
              }}
              inline
              label="Female"
              name="gender"
              type="radio"
              value={"Female"}
            />
            <Form.Check
              onSelect={(e) => {
                setGender(e.target.value);
              }}
              inline
              label="Male"
              name="gender"
              type="radio"
              value={"Male"}
            />
          </div>
          <Form.Group>
            <Form.Label style={{ color: "white" }}>Job title</Form.Label>
            <br />
            <Form.Select
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="IT">IT</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Web Developer">Web Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Digital marketing">Digital marketing</option>
              <option value="Cyber security">Cyber security</option>
              <option value="Dentist">Dentist</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Investment banker">Investment banker</option>
              <option value="Financial">Financial</option>
            </Form.Select>
          </Form.Group>
          <Button
            style={{
              marginTop: "6%",
              background: "#33363F",
              textTransform: "capitalize",
              fontWeight: "bold",
              border: "none",
              padding: "2%",
            }}
            onClick={() => handleRequestDemo()}
          >
            Request a demo
          </Button>
        </Form>
        <div style={{ padding: "5%" }}>
          <div style={{ marginBottom: "5rem" }}>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                textShadow: "4px 4px 4px black",
              }}
            >
              Request A Demo
            </h1>
            <p style={{ fontSize: "22px" }}>
              Experience the Future of Data Analysis. Request a Datalace Demo
              Today.
            </p>
          </div>
          <p>
            <RiTimerFlashFill size={30} color="yellow" /> AI-powered insights.
            Faster, bolder decisions.
          </p>
          <p>
            <FcDataSheet size={30} /> ODitch the spreadsheets, thrive with data.
          </p>
          <p>
            <FcOvertime size={30} /> Your 24/7 data whisperer. Grow smarter,
            faster.
          </p>
          <p>
            <IoBusinessSharp size={30} /> Grow your business, AI makes it
            simple.
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
