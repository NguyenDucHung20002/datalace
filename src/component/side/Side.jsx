import React, { useContext, useEffect, useRef, useState } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import packageJson from "../../../package.json";
import { Button, Overlay } from "react-bootstrap";
import axios from "axios";
import { menuContext } from "../Home";
import Papa from "papaparse";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

const Side = (props) => {
  const [numPages, setNumPages] = useState(1);
  const [openMore, setOpenMore] = useState(false);
  const [show, setShow] = useState(false);
  const [scanData, setScanData] = useState([]);

  const target = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("TestScan004.csv");
      const parsedData = Papa.parse(response.data, { header: true }).data;
      setScanData(parsedData);
    };
    fetchData();
  }, []);

  return (
    <div
      className="overflow-auto"
      style={{
        marginLeft: "10px",
        height: "77vh",
        width: "50%",
        borderRadius: "30px",
      }}
    >
      {props.csv && props.csv.length > 0 && (
        <>
          <table className="table" style={{overflowX:'auto'}}>
            <thead>
              <tr>
                {Object.keys(props.csv[0]).map((header) => (
                  <th
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                props.csv.slice(0,10).map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(rowData).map((value, columnIndex) => (
                      <td key={columnIndex}>{""+value}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <Button
            className="btn-show-more"
            onClick={() => setOpenMore(!openMore)}
          >
            {openMore ? <span>Show less...</span> : <span>Show more...</span>}
          </Button> */}
          {/* <p>{props.describe}</p> */}
        </>
      )}
      {props.pdf && (
        <div style={{ position: "relative" }}>
          <Button
            className="btn-show-more"
            ref={target}
            style={{ position: "fixed", zIndex: "100" }}
            onClick={() => {
              setShow(!show);
            }}
          >
            Scan
          </Button>
          <Overlay target={target.current} show={show} placement="left-start">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                {...props}
                className="scranfile"
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(84, 180, 211, 0.85)",
                  padding: "2px 10px",
                  color: "white",
                  borderRadius: 30,
                  width: "45%",
                  height: "77vh",
                  overflow: "auto",
                  ...props.style,
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      {Object.keys(scanData[0]).map((header) => (
                        <th
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                          key={header}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scanData.map((rowData, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(rowData).map((value, columnIndex) => (
                          <td key={columnIndex}>{"" + value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Overlay>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={props.pdf}
              defaultScale={SpecialZoomLevel.PageWidth}
              viewMode="SinglePage"
            ></Viewer>
          </Worker>
        </div>
      )}
    </div>
  );
};

export default Side;
