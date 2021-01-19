import React from 'react'
import Loader from 'react-loader-spinner';
import { Row, Col,Container } from "react-bootstrap";
export default function LoaderComponent() {
    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col className="text-center">
            <Loader type="Oval" color="#00BFFF" height={80} width={80}/>
            </Col>
        </Row>
        </Container>
    )
}
