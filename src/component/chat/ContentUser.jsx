import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CardforChatbot from "../cards/CardforChatbot";

function ContentUser(props) {
  return (
    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
      <div className="m-2">
        {typeof props.user === "string" ? (
          <>
            <p className="small p-2 me-3 mb-1 text-white rounded-3" style={{ background: '#4b79c6' }}>
              {props.user}
            </p>
          </>
        ) : (
          <div
            style={{
              height: "400px",
              width: "700px",
              background: "#ffffff",
            }}
          >
            <CardforChatbot
              moveChartToGallery={() =>
                props.moveChartToGallery(props.user)
              }
              chart={props.user}
            />
          </div>
        )}
        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
          {props.time}
        </p>
      </div>
      <FontAwesomeIcon
        icon={faUser}
        style={{
          color: "#d8dee9",
          width: "30px",
          height: "100%",
        }}
      />
    </div>
  );
}

export default ContentUser;