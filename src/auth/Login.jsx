import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import "../assets/style/Login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <Container className="login-box">
        <Row className="justify-content-center">
          <Col md={10} className="text-center">

            {/* ---- LOGO ---- */}
            <img
              src="../public/logoooo.png"   // ganti sesuai lokasi file logo kamu
              alt="Logo"
              className="login-logo"
            />

            <h4 className="login-title">USER LOGIN</h4>

            {/* ---- FORM ---- */}
            <Form>
              {/* USERNAME */}
              <div className="input-group custom-input mt-4">
                <span className="input-group-text icon-box">
                  <FaUser />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="input-field"
                />
              </div>

              {/* PASSWORD */}
              <div className="input-group custom-input mt-3">
                <span className="input-group-text icon-box">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
              </div>

              {/* BUTTON */}
              <Button className="login-btn mt-4" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
