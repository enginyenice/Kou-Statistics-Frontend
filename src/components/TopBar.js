import React from "react";
import { Navbar, Card} from "react-bootstrap";

export default function TopBar() {
  return (
      <>
    <Navbar bg="light">
      <Navbar.Brand href="#home">
        <img
          src="http://bhi.kocaeli.edu.tr/amblem/logorgb.png"
          width="55"
          height="55"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Navbar>
    <Card style={{
      border: "none",
      
    }}>
        <Card.Title className="text-center">Kocali Üniversitesi İstatistik</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">3. Parti Uygulama</Card.Subtitle>
    </Card>
    </>
  );
}
