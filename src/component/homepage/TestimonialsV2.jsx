import React, {useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../homepage/Testimonials.css";
import user01 from './Image/user01.jpg'
import user02 from './Image/user02.jpg'
import user03 from './Image/user03.jpg'
import user04 from './Image/user04.png'

function TestimonialCard({ text, userAvatar, userName }) {
  return (
    <>
      <div
        id="hihi"
        className="card"
        style={{
          background: "grey",
          width: "25em",
          height: "10em",
          padding: "1em",
          borderRadius: "15px",
          margin: "0% 1%",
        }}
      >
        <p style={{ height: "60%", color: "white",fontSize:"0.9em" }}>{text}</p>
        <div style={{ height: "40%", color: "white"  }}>
          <Row>
            <Col xs={2}>
              <img
                src={userAvatar}
                class="rounded-circle"
                alt="Avatar"
                width="45em"
                height="45em"
              />
            </Col>
            <Col xs={10} style={{ padding: "0.5em 0.5em", color: "white"  }}>
              {userName}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default function TestimonialsV2() {
  const [speed, setSpeed] = useState(20000);

  const [cards, setCards] = useState([
    {
      text: "It's like having a data science intern in my pocket. The AI assistant in Datalace crunches insights so fast, I can focus on higher-level problem solving.",
      userAvatar: `${user01}`,
      userName: "Sarah K., Data Analyst",
    },
    {
      text: "No more drowning in spreadsheets! Datalace automates my routine tasks, freeing up my time to explore and uncover hidden patterns in the data.",
      userAvatar: `${user02}`,
      userName: "David M., Senior Data Analyst",
    },
    {
      text: "Collaboration just got supercharged. Datalace lets me share analyses and dashboards with my team in real-time, leading to faster decision-making.",
      userAvatar: `${user03}`,
      userName: "OEmily L., Lead Business Analyst",
    },
    {
      text: "I'm not a data person, but Datalace makes it easy for me to understand complex insights. It's like having a translator for spreadsheets!",
      userAvatar: `${user04}`,
      userName: "Jane B., Marketing Manager",
    },
  ]);

  return (
    <>
      {/* <div style={{ height: "130.4px" }} /> */}
      <div className="reviewTitle">
        <h1>What Our Clients Say</h1>
      </div>

      <div className="inner">
        <div className="wrapper">
          <section style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
        </div>
      </div>

      <div className="inner">
        <div className="wrapper">
          <section className="left" style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
          <section className="left" style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
          <section className="left" style={{ "--speed": `${speed}ms` }}>
            {cards.map((card, index) => (
              <TestimonialCard
                key={index}
                text={card.text}
                userAvatar={card.userAvatar}
                userName={card.userName}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
