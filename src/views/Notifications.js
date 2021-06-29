/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormTextProps,
  FormFeedback,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  FormText,
  Form,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import QRCode from "react-qr-code";
function Notifications() {
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
          Successfully Copied to Clipboard
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row style={{marginLeft:"0.5rem"}}>
        
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        DEPOSIT
                        <p className="category">Deposit your Currency to these Address</p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                    <Tabs>
    <TabList>
      <Tab>BTC</Tab>
      <Tab>ETH</Tab>
      <Tab>USDT</Tab>
      <Tab>BNB</Tab>
    </TabList>

    <TabPanel>

       <Label>YOUR BTC ADDRESS</Label>
       <InputGroup>
       <Input placeholder="18HwcqpEf7nSdMGgrnw2WCnrkGjnTpEyek" disabled="true"/><Button onClick={()=>{

         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="18HwcqpEf7nSdMGgrnw2WCnrkGjnTpEyek" />

    </TabPanel>
    <TabPanel>
    <Label>YOUR ETH ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
    <TabPanel>
    <Label>YOUR USDT ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
    <TabPanel>
    <Label>YOUR BNB ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
  
  </Tabs>
                    </Col>
                  </Row>
                 
                </div>
              </CardBody>
              <CardFooter>
                <Button style={{marginLeft:"14rem",marginTop:"-7rem"}} className="btn-fill" color="primary" type="submit">
                  DEPOSIT
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
