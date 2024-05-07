import React from "react";
import { FaUpload } from "react-icons/fa";
import { FcPieChart } from "react-icons/fc";
import { SiAnswer } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";

function Instruction(props) {
  return (
    <>
      <div style={{ height: "130.4px" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "2em",
        }}
      >
        <h1 className="TitleInstruction">
          {" "}
          <strong>Datalace</strong>
        </h1>
        <h2 className="instruction">
          Your data, your partner: Insights at Your Fingertips
        </h2>
      </div>
      <div
        style={{
          width: "100%",
          marginleft: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="bgInstruction"
          style={{
            width: "65%",
            background: "#484d5b",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("press nè");
            props.fileUploadAction();
          }}
        >
          <h1 className="TitleInstruction" style={{ fontSize: "1.75rem" }}>
            <span style={{ paddingRight: "0.2em" }}>
              <FaUpload size="0.75em" />
            </span>{" "}
            Upload data
          </h1>
          <p className="instruction">
            You must upload your data before doing anything else on Datalace.
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginleft: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "65%",
            paddingTop: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            className="bgInstruction"
            style={{
              width: "32.33%",
              background: "#484d5b",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <h1 className="TitleInstruction" style={{ fontSize: "1.25rem" }}>
              <span style={{ paddingRight: "0.2em" }}>
                <SiAnswer size="0.75em" />
              </span>
              Q&A base on your data
            </h1>
            <p className="instruction">
              Ask, I answer. Data fuels my replies, unleashing knowledge through
              conversation. Let's chat!
            </p>
          </div>

          <div
            className="bgInstruction"
            style={{
              width: "32.33%",
              background: "#484d5b",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <h1 className="TitleInstruction" style={{ fontSize: "1.25rem" }}>
              <span style={{ paddingRight: "0.2em" }}>
                <FcPieChart size="1em" />
              </span>
              Visualize{" "}
            </h1>
            <p className="instruction">
              See beyond words, unlock insights: visualize your chat's flow and
              delve deeper into understanding.
            </p>
          </div>

          <div
            className="bgInstruction"
            style={{
              width: "32.33%",
              background: "#484d5b",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <h1 className="TitleInstruction" style={{ fontSize: "1.25rem" }}>
              <span style={{ paddingRight: "0.2em" }}>
                <TbReportAnalytics size="1em" />
              </span>
              Analyze data
            </h1>
            <p className="instruction">
              No tech jargon required! Uncover hidden trends and insights in
              your uploaded data - it's like having a friendly data detective at
              your fingertips!
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "50px" }}></div>
    </>
  );
}

export default Instruction;
