import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/style/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard/admin-panel"); // redirect ke dashboard ManageUsers
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal");
    }
  };

  return (
    <div className="login-wrapper">
      <Container className="login-box">
        <Row className="justify-content-center">
          <Col md={10} className="text-center">
            <img src="/logoooo.png" alt="Logo" className="login-logo" />
            <h4 className="login-title">USER LOGIN</h4>

            <Form onSubmit={handleLogin}>
              <div className="input-group custom-input mt-4">
                <span className="input-group-text icon-box">
                  <FaUser />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group custom-input mt-3">
                <span className="input-group-text icon-box">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="login-btn mt-4" type="submit">
                Login
              </Button>
            </Form>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}