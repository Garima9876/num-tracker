import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col, Button, ButtonGroup, Form } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleIncrement = () => {
    updateNumber(Math.min(num + 1, 150));
  };

  const handleDecrement = () => {
    updateNumber(Math.max(num - 1, 0));
  };

  const updateNumber = (newNum) => {
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, newNum]);
    setCurrentIndex(newHistory.length);
    setNum(newNum);
    setInputValue(newNum); // Update input value when number changes
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setNum(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setNum(history[currentIndex + 1]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (value === "" || (numericValue >= 0 && numericValue <= 150)) {
      setInputValue(value);
      if (!isNaN(numericValue)) {
        updateNumber(numericValue);
      }
    }
  };

  return (
    <Container
      className="text-center mt-5 p-4 rounded-3"
      style={{ backgroundColor: "#f0f8ff" }}
    >
      <h1
        className="mb-4 text-dark fs-2 fw-bold"
        style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
      >
        Num Tracker
      </h1>
      <Row className="justify-content-center mb-4 align-items-center">
        <Col md="auto" className="d-flex flex-column flex-md-row align-items-center">
          <ButtonGroup className="mb-3 mb-md-0">
            <Button
              className="rounded-pill me-4"
              variant="outline-danger"
              onClick={handleDecrement}
              style={{ width: "60px" }}
            >
              -1
            </Button>
            <Form.Control
              type="number"
              value={inputValue}
              placeholder="0-150"
              onChange={handleInputChange}
              style={{ width: "100px", maxWidth: "150px", textAlign: "center" }}
            />
            <Button
              className="rounded-pill ms-4"
              variant="outline-success"
              onClick={handleIncrement}
              style={{ width: "60px" }}
            >
              +1
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <CircularProgressbar
              value={num}
              maxValue={150}
              text={`${num}`}
              styles={buildStyles({
                pathColor: "#3e98c7",
                textColor: "#3e98c7",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <ButtonGroup>
            <Button
              className="rounded-pill me-2"
              variant="secondary"
              onClick={handleUndo}
              style={{ width: "80px" }}
              disabled={currentIndex === 0}
            >
              Undo
            </Button>
            <Button
              className="rounded-pill ms-2"
              variant="secondary"
              onClick={handleRedo}
              style={{ width: "80px" }}
              disabled={currentIndex === history.length - 1}
            >
              Redo
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;