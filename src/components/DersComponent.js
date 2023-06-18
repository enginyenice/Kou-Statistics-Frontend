import React, { Component } from "react";
import LoaderComponent from "./LoaderComponent";
import {
  Form,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
export default class DersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object,
      loading: false,
      dersValue: "",
      dersId: "",
    };
    this.dataSearch = this.dataSearch.bind(this);
  }
  dataSearch(event) {
    this.setState({ dersValue: event.target.value });
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
    this.getDersList();
  }
  renderDonem() {
    const items = [];
    this.state.data.forEach((row) => {
      // console.log(row["text"])
      items.push(
        <ListGroup.Item
        className={(this.state.dersId === row["id"])? "active": ""}
          onClick={() => {this.selectDersId(row["id"],row["text"])}}
          key={row["id"]}
          style={{
            display: row["display"],
          }}
        >
          {row["text"]}
        </ListGroup.Item>
      );
    });
    return <ListGroup style={{cursor:"pointer"}}>{items}</ListGroup>;
  }
  getDersList() {
    fetch("https://kouistatistikapi.enginyenice.com/?donem="+this.props.allData.donemId+"&universite="
    +this.props.allData.universiteId+"&fakulte="+this.props.allData.fakulteId+"&bolum="+this.props.allData.bolumId+"&ders")
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

  selectDersId(id,text){
    this.setState({dersId: id});
    this.props.setDersIdCallback(id,text);
  }

  render() {
    return (
      <Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Dersler</Form.Label>
              <Form.Control
              autoComplete="off"
                onKeyUp={this.dataSearch}
                //value={this.state.donemValue}
                className="donemInput"
                type="text"
                required="require"
                placeholder="Ders/Hoca ara.."
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
