import React from "react";
import { Carousel } from "react-bootstrap";

const basicDashboard = (props) => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://picsum.photos/id/2/1500/300"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Sell Your Property.</h3>
          <p>Now selling your property is at ease.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://picsum.photos/id/1/1500/300"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Buy property</h3>
          <p>Buying a property is hazel free experience.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://picsum.photos/id/33/1500/300"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Get all approved online</h3>
          <p>Now get all your documents approved online.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default basicDashboard;
