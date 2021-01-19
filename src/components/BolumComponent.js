import React, { Component } from "react";
import { Form, Row, Col, ListGroup } from "react-bootstrap";
import LoaderComponent from "./LoaderComponent";
export default class BolumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object,
      loading: false,
      bolumValue: "",
      bolumId: "",
    };
    this.dataSearch = this.dataSearch.bind(this);
  }
  dataSearch(event) {
    this.setState({ bolumValue: event.target.value });
    let input = event.target.value.toLowerCase();

    this.state.data.forEach((row, i) => {
      let text = row["text"].toLowerCase();
      text.indexOf(input) > -1
      ? (this.state.data[i]["display"] = "block")
      : (this.state.data[i]["display"] = "none");
    });
  }

  componentDidMount() {
    this.getBolumList();
  }
  renderDonem() {
    const items = [];
    this.state.data.forEach((row) => {
      items.push(
        <ListGroup.Item
          className={this.state.bolumId === row["id"] ? "active" : ""}
          onClick={() => {
            this.selectBolumId(row["id"], row["text"]);
          }}
          key={row["id"]}
          style={{
            display: row["display"],
          }}
        >
          {row["text"]}
        </ListGroup.Item>
      );
    });
    return <ListGroup>{items}</ListGroup>;
  }
  getBolumList() {
    fetch(
      "https://kouistatistik.enginyenice.com/?donem=" +
        this.props.allData.donemId +
        "&universite=" +
        this.props.allData.universiteId +
        "&fakulte=" +
        this.props.allData.fakulteId +
        "&bolum"
    )
      .then((res) => res.json())
      .then((response) => {
        let details = [];
        for (var i in response) {
          details.push({ id: i, text: response[i], display: "block" });
        }
        this.setState({ data: details, loading: true });
      })
      .then(() => {});
  }

  selectBolumId(id, text) {
    this.setState({ bolumId: id });
    this.props.setBolumIdCallback(id, text);
  }

  render() {
    return (
      <Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Bölüm/Program</Form.Label>
              <Form.Control
                onKeyUp={this.dataSearch}
                //value={this.state.donemValue}
                autocomplete="off"
                className="donemInput"
                type="text"
                required="require"
                placeholder="Bölüm/Program Seçiniz.."
              />
            </Form.Group>
          </Col>
        </Row>

        {this.state.loading === true
          ? this.renderDonem()
          : <LoaderComponent></LoaderComponent>
          }
        
      </Form.Group>
    );
  }
}
