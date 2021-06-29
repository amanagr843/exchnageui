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
import axios from "axios";
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  FormText,
  Row,
  Col,
  Label,
  InputGroupText,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  InputGroupAddon,
  UncontrolledDropdown
} from "reactstrap";
import swal from "sweetalert";

function UserProfile() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = React.useState(false);
  const [wallet,setwallet] = React.useState(null);
  const [amount,setamount] = React.useState(0)
  const [currency,setcurrency] = React.useState('');
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  return (
    <>
      <div className="content">
        <Row style={{marginLeft:"0.5rem"}}>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Withdraw Your Currency</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Label>Enter Address</Label>
                  <Input placeholder="Copy & Paste Your Address here to withdraw your coins" onChange={(e)=>{setwallet(e.target.value)}}></Input>
                
                  <Label>Amount</Label>
                 
                  <Input placeholder="Enter Amount" onChange={(e)=>{
                    setamount(e.target.value)
                  }}></Input>
        
                  <Label>Currency</Label>
                  <Input placeholder="Select Currency" type="select" onChange={(e)=>{
                    setcurrency(e.target.value)
                  }}>
                    <option>BTC</option>
                    <option>BNB</option>
                    <option>ETH</option>
                  </Input>
      
                  <FormText>* Make sure the Address you entered is verified by your end. The amout of coins you entered will get directly transfered to this Address</FormText>
                </Form>
               

              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={()=>{
                  axios({
                    method:"post",
                    url : `http://103.155.73.35:3001/requestcrypto?walletaddress=${wallet}&coins=${amount}&type=withdraw&currency=${currency}`,
                    headers: {
                      'Accept' : 'Application/json',
                      'Content-type' : "application/json"
                    }
                  }).then(res=>{
                    if(res.data.message){
                      swal("Submitted","Your transaction has been processed Succesfully, All coins will be redirected to your wallet after 15 confirmations,\n Transaction hash will be shared to you email id","success");
                    }
                    console.log(res.data)
                  })
                }}>
                  Withdraw
                </Button>
              </CardFooter>
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
