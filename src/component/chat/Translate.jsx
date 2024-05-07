import axios from "axios";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Papa from "papaparse";

export default function Translate(props) {
  const [openMore, setOpenMore] = useState(false);
  const [csvData, setCsv] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "12354_translated.csv"
      );
      const parsedData = Papa.parse(response.data, { header: true }).data;
      setCsv(parsedData);
    };
    fetchData();
  }, []);
  return (
    <MDBRow className="d-flex" style={{width:'100% !important', padding:'2%'}}>
      <MDBCol className="tableWrap" lg={6} md={6} style={{overflow:'scroll', width:'50%',height:'80vh'}}>
        <h1>Vietnamese</h1>
        <table
          className="table"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        >
          <thead>
            <tr>
              {props.datas &&
                props.datas.length > 0 &&
                Object.keys(props.datas[0]).map((header) => (
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
            {openMore &&
              props.datas &&
              props.datas.length > 0 &&
              props.datas.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(rowData).map((value, columnIndex) => (
                    <td key={columnIndex}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            {!openMore &&
              props.datas &&
              props.datas.length > 0 &&
              props.datas.slice(0, 6).map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(rowData).map((value, columnIndex) => (
                    <td key={columnIndex}>{String(value)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <Button
          className="btn-show-more"
          onClick={() => setOpenMore(!openMore)}
        >
          {openMore ? <span>Show less...</span> : <span>Show more...</span>}
        </Button>
      </MDBCol>
      <MDBCol className="tableWrap" lg={6} md={6} style={{overflow:'scroll', width:'50%',height:'80vh'}}>
        <h1>English</h1>
        <table
          className="table"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        >
          <thead>
            <tr>
              {csvData &&
                csvData.length > 0 &&
                Object.keys(csvData[0]).map((header) => (
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
            {openMore &&
              csvData &&
              csvData.length > 0 &&
              csvData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(rowData).map((value, columnIndex) => (
                    <td key={columnIndex}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            {!openMore &&
              csvData &&
              csvData.length > 0 &&
              csvData.slice(0, 6).map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(rowData).map((value, columnIndex) => (
                    <td key={columnIndex}>{String(value)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <Button
          className="btn-show-more"
          onClick={() => setOpenMore(!openMore)}
        >
          {openMore ? <span>Show less...</span> : <span>Show more...</span>}
        </Button>
      </MDBCol>
    </MDBRow>
  );
}
