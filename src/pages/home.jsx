// Home.js
import React from 'react';
import '../style/home.css';
import '../style/generalStyle.css'
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
      <Col xs={6} className="p-4 position-relative" style={{ backgroundImage: 'url("https://images.pexels.com/photos/5797900/pexels-photo-5797900.jpeg?auto=compress&cs=tinysrgb&w=600")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* חלק השמאלי - רקע תמונה */}
          <div className="image-overlay"></div>
        </Col>
        <Col xs={6} className="background-color  text-white d-flex align-items-center justify-content-center p-4">
          <div className="text-center text-burgundy kalam-bold glowing-text big-text">
            <h1>Managment tasks</h1>
            <p>manage your shared tasks</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

