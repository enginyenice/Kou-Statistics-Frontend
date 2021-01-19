import React, { Component } from "react";
import { Container, Card,Badge,Button,Row,Col } from "react-bootstrap";
import BolumComponent from "./BolumComponent";
import DersComponent from "./DersComponent";
import DonemComponent from "./DonemComponent";
import FakulteComponent from "./FakulteComponent";
import UniversiteComponent from "./UniversiteComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import IstatistikComponent from "./IstatistikComponent";

export default class SearchComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object,
      IdList: {
        donemId: "",
        universiteId: "",
        fakulteId: "",
        bolumId: "",
        dersId: "",
      },

      TextList: {
        donemText: "",
        universiteText: "",
        fakulteText: "",
        bolumText: "",
        dersText: "",
      },
    };
  }
  setDonemId = (id,text) => {
    this.setState({
      IdList: {
        donemId: id,
        universiteId: "",
        fakulteId: "",
        bolumId: "",
        dersId: "",
      },
    TextList: {
      donemText: text,
      universiteText: "",
      fakulteText: "",
      bolumText: "",
      dersText: "",
    }});
   //console.log("DonemID: " + this.state.IdList.donemId);
  };

  setUniversiteId = (id,text) => {
    this.setState({
      IdList: {
        donemId: this.state.IdList.donemId,
        universiteId: id,
        fakulteId: "",
        bolumId: "",
        dersId: "",
      },
      TextList: {
        donemText: this.state.TextList.donemText,
        universiteText:text,
        fakulteText: "",
        bolumText: "",
        dersText: "",
      
    }});
  };

  setFakulteId = (id,text) => {
    this.setState({
      IdList: {
        donemId: this.state.IdList.donemId,
        universiteId: this.state.IdList.universiteId,
        fakulteId: id,
        bolumId: "",
        dersId: "",
      },
      TextList: {
        donemText: this.state.TextList.donemText,
        universiteText:this.state.TextList.universiteText,
        fakulteText: text,
        bolumText: "",
        dersText: "",
      
    }
    });
  };

  setBolumId = (id,text) => {
    this.setState({
      IdList: {
        donemId: this.state.IdList.donemId,
        universiteId: this.state.IdList.universiteId,
        fakulteId: this.state.IdList.fakulteId,
        bolumId: id,
        dersId: "",
      },
      TextList: {
        donemText: this.state.TextList.donemText,
        universiteText:this.state.TextList.universiteText,
        fakulteText: this.state.TextList.fakulteText,
        bolumText: text,
        dersText: "",
      
    }
    });
  };


  setDersId = (id,text) => {
    this.setState({
      IdList: {
        donemId: this.state.IdList.donemId,
        universiteId: this.state.IdList.universiteId,
        fakulteId: this.state.IdList.fakulteId,
        bolumId: this.state.IdList.bolumId,
        dersId: id ,
      },
      TextList: {
        donemText: this.state.TextList.donemText,
        universiteText:this.state.TextList.universiteText,
        fakulteText: this.state.TextList.fakulteText,
        bolumText: this.state.TextList.bolumText,
        dersText: text,
    }
    });
  };
  backData(){
    if(this.state.IdList.dersId !== "")
    {
      this.setState({
        IdList: {
          donemId: this.state.IdList.donemId,
          universiteId: this.state.IdList.universiteId,
          fakulteId: this.state.IdList.fakulteId,
          bolumId: this.state.IdList.bolumId,
          dersId: "" ,
        },
        TextList: {
          donemText: this.state.TextList.donemText,
          universiteText:this.state.TextList.universiteText,
          fakulteText: this.state.TextList.fakulteText,
          bolumText: this.state.TextList.bolumText,
          dersText: "",
      }
      });
    } else if(this.state.IdList.bolumId !== ""){
      this.setState({
        IdList: {
          donemId: this.state.IdList.donemId,
          universiteId: this.state.IdList.universiteId,
          fakulteId: this.state.IdList.universiteId,
          bolumId: "",
          dersId: "" ,
        },
        TextList: {
          donemText: this.state.TextList.donemText,
          universiteText:this.state.TextList.universiteText,
          fakulteText: this.state.TextList.fakulteText,
          bolumText: "",
          dersText: "",
      }
      });
    } else if(this.state.IdList.fakulteId !== ""){
      this.setState({
        IdList: {
          donemId: this.state.IdList.donemId,
          universiteId: this.state.IdList.universiteId,
          fakulteId: "",
          bolumId: "",
          dersId: "" ,
        },
        TextList: {
          donemText: this.state.TextList.donemText,
          universiteText:this.state.TextList.universiteText,
          fakulteText: "",
          bolumText: "",
          dersText: "",
      }
      });
    } else if(this.state.IdList.universiteId !== ""){
      this.setState({
        IdList: {
          donemId: this.state.IdList.donemId,
          universiteId: "",
          fakulteId: "",
          bolumId: "",
          dersId: "" ,
        },
        TextList: {
          donemText: this.state.TextList.donemText,
          universiteText:"",
          fakulteText: "",
          bolumText: "",
          dersText: "",
      }
      });
    } else if(this.state.IdList.donemId !== "  "){
      this.setState({
        IdList: {
          donemId: "",
          universiteId: "",
          fakulteId: "",
          bolumId: "",
          dersId: "" ,
        },
        TextList: {
          donemText: "",
          universiteText:"",
          fakulteText: "",
          bolumText: "",
          dersText: "",
      }
      });
    }
  }
  componentDidMount() {
    //console.log(this.state.IdList.donemId);
  }

  render() {
    return (
      <Container fluid="sm">
        <Card className="formCard">
          <Card.Header>
            <Row>
              <Col>
              <Card.Title>İstatistik Görüntüle</Card.Title>
            
              </Col>
              <Col className="text-right">
              <Button variant="success" onClick={() => this.backData()}> <FontAwesomeIcon icon={faBackspace} /> Geri </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
          <h5>
            <Badge variant="primary">{
            (this.state.TextList.donemText !== "")?this.state.TextList.donemText+" ":"" }
            {(this.state.TextList.donemText !== "")? (<span><FontAwesomeIcon icon={faArrowRight} /></span>):""}
            </Badge>
            <Badge variant="secondary">{
            (this.state.TextList.universiteText !== "")?this.state.TextList.universiteText+" ":""}
            {(this.state.TextList.universiteText !== "")? <FontAwesomeIcon icon={faArrowRight} />:""}
            </Badge>
            <Badge variant="danger">{
            (this.state.TextList.fakulteText !== "")?this.state.TextList.fakulteText+" ":""}
            {(this.state.TextList.fakulteText !== "")? <FontAwesomeIcon icon={faArrowRight} />:""}
            </Badge>
            <Badge variant="warning">{
            (this.state.TextList.bolumText !== "")?this.state.TextList.bolumText+" ":""}
            {(this.state.TextList.bolumText !== "")? <FontAwesomeIcon icon={faArrowRight} />:""}
            </Badge>
            <Badge variant="dark">{
            (this.state.TextList.dersText !== "")?this.state.TextList.dersText+" ":""}
            </Badge>
            </h5> 


            {this.state.IdList.donemId === "" &&
              this.state.IdList.universiteId === "" &&
              this.state.IdList.fakulteId === "" &&
              this.state.IdList.bolumId === "" &&
              this.state.IdList.dersId === "" && (
                <DonemComponent
                  setDonemIdCallback={this.setDonemId}
                ></DonemComponent>
              )}

            {this.state.IdList.donemId !== "" &&
              this.state.IdList.universiteId === "" &&
              this.state.IdList.fakulteId === "" &&
              this.state.IdList.bolumId === "" &&
              this.state.IdList.dersId === "" && (
                <UniversiteComponent
                  allData={this.state.IdList}
                  setUniversiteIdCallback={this.setUniversiteId}
                ></UniversiteComponent>
              )}

            {this.state.IdList.donemId !== "" &&
              this.state.IdList.universiteId !== "" &&
              this.state.IdList.fakulteId === "" &&
              this.state.IdList.bolumId === "" &&
              this.state.IdList.dersId === "" && (
                <FakulteComponent
                  allData={this.state.IdList}
                  setFakulteIdCallback={this.setFakulteId}
                ></FakulteComponent>
                
              )}

            {this.state.IdList.donemId !== "" &&
              this.state.IdList.universiteId !== "" &&
              this.state.IdList.fakulteId !== "" &&
              this.state.IdList.bolumId === "" &&
              this.state.IdList.dersId === "" && (
                <BolumComponent
                  allData={this.state.IdList}
                  setBolumIdCallback={this.setBolumId}
                ></BolumComponent>
              
              )}

              {this.state.IdList.donemId !== "" &&
              this.state.IdList.universiteId !== "" &&
              this.state.IdList.fakulteId !== "" &&
              this.state.IdList.bolumId !== "" &&
              this.state.IdList.dersId === "" && (
                <DersComponent
                  allData={this.state.IdList}
                  setDersIdCallback={this.setDersId}
                ></DersComponent>
              )}



              {this.state.IdList.donemId !== "" &&
              this.state.IdList.universiteId !== "" &&
              this.state.IdList.fakulteId !== "" &&
              this.state.IdList.bolumId !== "" &&
              this.state.IdList.dersId !== "" && (
              <>
              <IstatistikComponent allData={this.state.IdList}></IstatistikComponent>
              </>
              )}

          </Card.Body>
          <Card.Footer className="formCardFooter">
           <Row>
           <Col xs={12} sm={12} md={6}>
             <b>Tüm Hakları Saklıdır. </b>
             </Col>
             <Col  xs={12} sm={12} md={6} className="text-right">
             
             <b>Kocaeli Üniversitesi </b> <FontAwesomeIcon icon={faHeart} style={{color:"darkgreen"}} /><b> Engin Yenice</b>
             </Col>
           </Row>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
