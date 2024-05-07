import { Carousel, Container, Card } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item interval={50000}>
        <Container className="d-flex align-items-center justify-content-center">
          <Card>
            <Card.Body>
              <Card.Title>Item 1</Card.Title>
              <Card.Text>Content for Item 1</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container className="d-flex align-items-center justify-content-center">
          <Card>
            <Card.Body>
              <Card.Title>Item 2</Card.Title>
              <Card.Text>Content for Item 2</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container className="d-flex align-items-center justify-content-center">
          <Card>
            <Card.Body>
              <Card.Title>Item 3</Card.Title>
              <Card.Text>Content for Item 3</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
