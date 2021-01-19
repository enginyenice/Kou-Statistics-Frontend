import React, { Component } from "react";
import { Alert, Row, Col, Table, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "react-google-charts";
import {
  faBookmark,
  faCalculator,
  faChalkboardTeacher,
  faCogs,
  faLayerGroup,
  faSchool,
  faSquareRootAlt,
} from "@fortawesome/free-solid-svg-icons";
import LoaderComponent from "./LoaderComponent";

export default class IstatistikComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DersDetay: [],
      GenelIstatistik: [],
      TNotAralik: [],
      HarNotuDagilimi: [],
      HarfNotuDagilimiPie: [],
    };
  }
  componentDidMount() {
    this.getIstatistik();
  }
  getIstatistik() {
    fetch(
      "http://kouistatistik.enginyenice.com/?donem=" +
        this.props.allData.donemId +
        "&universite=" +
        this.props.allData.universiteId +
        "&fakulte=" +
        this.props.allData.fakulteId +
        "&bolum=" +
        this.props.allData.bolumId +
        "&ders=" +
        this.props.allData.dersId +
        "&istatistik"
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({ DersDetay: response["DersDetay"] });
        this.setState({ GenelIstatistik: response["GenelIstatistik"] });
        //  this.setState({ TNotAralik: response["TNotAralik"] });

        let ogrDagilim = [];
        for (var i in response["GenelIstatistik"]["OgrenciDagilimi"]) {
          ogrDagilim.push({
            id: i,
            text: response["GenelIstatistik"]["OgrenciDagilimi"][i],
          });
         }

        this.setState({ HarNotuDagilimi: ogrDagilim });


        let data = Object.entries(response["GenelIstatistik"]["OgrenciDagilimi"])
        data.splice(0, 0, ["Harf","Kişi Sayısı"]);
        this.setState({
          HarfNotuDagilimiPie: data,
        });
        let tnotAralik = [];
        for (var value in response["TNotAralik"]) {
          tnotAralik.push({ id: value, text: response["TNotAralik"][value] });
        }
        this.setState({ TNotAralik: tnotAralik });
      })
      .then(() => {});
  }

  renderHarfNotuDagilimi() {
    let harf = [];
    let not = [];

    this.state.HarNotuDagilimi.forEach((row, key) => {
      harf.push(<th key={"harf-" + key}>{row["id"]}</th>);
    });

    this.state.HarNotuDagilimi.forEach((row, key) => {
      not.push(<th key={"not-" + key}>{row["text"]}</th>);
    });
    return (
      <Table
        className="text-center"
        responsive
        size="sm"
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th colSpan="15">Harf Notu & Kişi Sayısı Dağılım Tablosu</th>
          </tr>
        </thead>
        <tbody>
          <tr>{harf}</tr>
          <tr>{not}</tr>
        </tbody>
      </Table>
    );
  }
  renderTNotAraligi() {
    let harf = [];
    let not = [];

    this.state.TNotAralik.forEach((row, key) => {
      harf.push(<th key={"harf-" + key}>{row["id"]}</th>);
    });

    this.state.TNotAralik.forEach((row, key) => {
      var res = row["text"].split("-")
      not.push(<th key={"not-" + key}>{res[0]}<br></br>{res[1]}</th>);
    });
    return (
      <Table
        className="text-center"
        responsive
        size="sm"
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th colSpan="15">T Notu & Harf Aralığı</th>
          </tr>
        </thead>
        <tbody>
          <tr>{harf}</tr>
          <tr>{not}</tr>
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.state.DersDetay.Donem !== undefined && (
          <>
            <Alert variant="success">
              <Row className="text-center">
                <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faLayerGroup} />{" "}
                  <b>{this.state.DersDetay.Donem}</b>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faSchool} />{" "}
                  <b>{this.state.DersDetay.Universite}</b>
                </Col>
              </Row>
            </Alert>
            <Alert variant="primary">
              <Row className="text-center">
              <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faBookmark} />
                  <b>{this.state.DersDetay.Fakulte}</b>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faCogs} />
                  <b>{this.state.DersDetay.Bolum}</b>
                </Col>
              </Row>
            </Alert>

            <Alert variant="info">
              <Row className="text-center">
                <Col>
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                  <b>{this.state.DersDetay.Ders}</b>
                </Col>
              </Row>
            </Alert>

            <Alert variant="warning">
              <Row className="text-center">
              <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faSquareRootAlt} />
                  &nbsp;Sınıf Ortalaması:{" "}
                  <b>{this.state.GenelIstatistik.SinifOrtalamasi}</b>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <FontAwesomeIcon icon={faCalculator} />
                  &nbsp;T Notu: <b>{this.state.GenelIstatistik.TNotu}</b>
                </Col>
              </Row>
            </Alert>
            <Container>
              <Row>{this.renderHarfNotuDagilimi()}</Row>
              <Row>{this.renderTNotAraligi()}</Row>
              
              <Row className="justify-content-md-center">
                <Col className="text-center">
                <h4>Harf Notu & Kişi Sayısı Dağılım Tablosu</h4>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="50vh"
                  loader={<LoaderComponent></LoaderComponent>}
                  data={this.state.HarfNotuDagilimiPie}
                  options={{
                    legend: 'none',
                    pieSliceText: 'label',
                  }}
                />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </div>
    );
  }
}
