import { useEffect, useState } from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./style.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { lazy, Suspense } from "react";
const LazyCardforHighlight = lazy(() => import("../cards/CardforHighlight"));
function HighLight1(props) {
  const { items, keys, ...others } = props;

  const defaultLayout = () => {
    //dispatch(Returndefaultlayout());
    // chiuj
  };
  useEffect(() => {
    return () => {};
  }, [items]);

  useEffect((event) => {}, [keys]);

  return (
    <>
      <Container fluid>
        <Row>
          {items.map((ChartComponent, index) => (
            <Col key={index} md={6} className="p-2 ">
              <Suspense fallback={<div>Loading...</div>} key={index}>
                <LazyCardforHighlight
                  id={index}
                  chart={JSON.parse(ChartComponent)}
                  name={keys}
                />
              </Suspense>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HighLight1;
