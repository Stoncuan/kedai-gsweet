import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/style/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
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
            <h4 className="login-title">ADMIN LOGIN</h4>

            <Form onSubmit={handleLogin}>
              <div className="input-group custom-input mt-4">
                <span className="input-group-text icon-box">
                  <FaUser />
                </span>
                <Form.Control
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group custom-input mt-3">
                <span className="input-group-text icon-box">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="login-btn mt-4" type="submit">
                Login
              </Button>
            </Form>

            {error && <p className="text-danger mt-3">{error}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
