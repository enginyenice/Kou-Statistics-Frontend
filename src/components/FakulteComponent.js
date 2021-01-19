import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import LoaderComponent from "./LoaderComponent";
export default class FakulteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object,
      loading: false,
      fakulteValue: "",
      fakulteId: "",
    };
    this.dataSearch = this.dataSearch.bind(this);
  }
  dataSearch(event) {
    this.setState({ fakulteValue: event.target.value });
    let input = event.target.value.toLowerCase();
    this.state.data.forEach((row, i) => {
      let text = row["text"].toLowerCase();
      //console.log( text+ " || " + input);
      text.indexOf(input) > -1
      ? (this.state.data[i]["display"] = "block")
      : (this.state.data[i]["display"] = "none");
    });
  }
  componentDidMount() {
    this.getFakulteList();
  }

  renderDonem() {
    const items = [];
    this.state.data.forEach((row) => {
      // console.log(row["text"])
      items.push(
        <ListGroup.Item
        className={(this.state.fakulteId === row["id"])? "active": ""}
          onClick={() => {this.selectFakulteId(row["id"],row["text"])}}
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
  getFakulteList() {
    fetch("http://kouistatistik.enginyenice.com/?donem="+this.props.allData.donemId+"&universite="+this.props.allData.universiteId+"&fakulte")
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

  selectFakulteId(id,text){
    this.setState({fakulteId: id});
    this.props.setFakulteIdCallback(id,text);
  }

  render() {
    return (
      <Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Fakülte/YO/MYO</Form.Label>
              <Form.Control
                onKeyUp={this.dataSearch}
                //value={this.state.donemValue}
                className="donemInput"
                type="text"
                required="require"
                placeholder="Fakülte/YO/MYO Seçiniz.."
              />
            </Form.Group>
          </Col>
        </Row>

        {this.state.loading === true
          ? this.renderDonem()
          : <LoaderComponent></LoaderComponent>}
      </Form.Group>
    );
  }
}
