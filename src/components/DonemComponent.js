import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import LoaderComponent from "./LoaderComponent";
export default class DonemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object,
      loading: false,
      donemValue: "",
      donemId: "",
    };
    this.dataSearch = this.dataSearch.bind(this);
  }
  dataSearch(event) {
    this.setState({ donemValue: event.target.value });
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
    this.getDonemList();
  }
  updateState(item,style){
    item.display = style
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [item.id]: {...item}
      }
    }))
  }
  renderDonem() {
    const items = [];
    this.state.data.forEach((row) => {
      // console.log(row["text"])
      items.push(
        <ListGroup.Item
        className={(this.state.donenId === row["id"])? "active": ""}
          onClick={() => {this.selectDonemId(row["id"],row["text"])}}
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
  getDonemList() {
    fetch("https://kouistatistik.enginyenice.com/?donem")
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

  selectDonemId(id,text){
    console.log(id)
    this.setState({donenId: id});
    this.props.setDonemIdCallback(id,text)
  }

  render() {
    return (
      <Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Dönem</Form.Label>
              <Form.Control
                autoComplete="off"
                onKeyUp={this.dataSearch}
                //value={this.state.donemValue}
                className="donemInput"
                type="text"
                required="require"
                placeholder="Dönem ara.."
              />
            </Form.Group>
          </Col>
        </Row>

        {this.state.loading === true
          ? this.renderDonem()
          :<LoaderComponent></LoaderComponent>}
      </Form.Group>
    );
  }
}
