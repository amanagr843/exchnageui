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
import React, { useEffect } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col,Button } from "reactstrap";
import { Card as Card1 } from 'react-card-component';
import { Divider } from '@material-ui/core';
import { CgArrowsExchangeV } from "react-icons/cg";

import "./map.css";
import axios from "axios";
function Map() {
  const [from,setfrom] = React.useState("BTC")
  const [to,setto] = React.useState("ANTEAG")
  const [fromvalue,setfromvalue] = React.useState(0)
  const [tovalue,settovalue] = React.useState(0);
  const [live,setlive] = React.useState(0)
  const [enteredText, setEnteredText] = React.useState(''); 
  const [tocurr,settocurr] = React.useState(null);
  const [valid,setvalid] = React.useState(true)
  const [ETH,setETH] = React.useState(0)
  const [BNB,setBNB] = React.useState(0)
  const [BTC,setBTC] = React.useState(0)
  const [liveusd,setliveusd] = React.useState(0)
  const [ANTEAG,setANTEAG] = React.useState(0)
  const [final,setfinal] = React.useState(0)

  useEffect(()=>{
       axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BNB/USDT`
      }).then(res=>{
        if(res.data[0]){
          setBNB(res.data[0].price)
        }
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BTC/USDT`
      }).then(res=>{
        if(res.data[0]){
          setBTC(res.data[0].price)
        }
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ETH/USDT`
      }).then(res=>{
        if(res.data[0]){
          console.log(res.data[0])
          setETH(res.data[0].price)
        }
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ANTEAG/USDT`
      }).then(res=>{
        if(res.data[0]){
          setANTEAG(res.data[0].price)
        }
        
      })
},[])
  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card className="card-plain">
              <CardHeader>SWAP YOUR COINS</CardHeader>
              <CardBody style={{ alignSelf: "center" }}>
                <Card1 outlined={true} bordered={true} style={{ background: "#fff", borderRadius: "100px" }}>

                  <div style={{ textColor: "black", marginLeft: "1rem", marginTop: "1rem" }}>
                    <h1 style={{ color: "black",fontWeight:"bold", fontFamily: "Kanit,sans-serif" }}>Exchange</h1>
                    <p style={{ color: "black" }}>Trade Token in an Instant</p>
                  </div>


                  <div className="input" style={{ width: "98%", paddingLeft: "0.4rem" }}>

                    <div style={{ background: "#eeeaf4", borderRadius: "0.7rem" }}>
                      <label style={{ color: "black", padding: "0.3rem", width: "99%" }}>From</label>
                      <p style={{color:"grey",padding:"0.4rem"}}>Max Available {localStorage.getItem(`${from}_Coins`)}</p>
                      <input placeholder={`ENTER ${from}`} onChange={(e)=>{
                    if(parseFloat(e.target.value) > parseFloat(localStorage.getItem(`${from}_Coins`))){
                      alert("Please Enter Amount less than or equal to your wallet balance")
                      setvalid(false);
                      }
                    else{
                      
                      setfromvalue(e.target.value)
                      setvalid(true)
                      switch (e.target.value) {
                        case 'ETH':
                          setfinal(ETH*fromvalue*0.098/tocurr)
                        case 'BTC':
                          setfinal(BTC*fromvalue*0.098/tocurr)
                        case 'BNB':
                          setfinal(BNB*fromvalue*0.098/tocurr)
                        case 'ANTEAG':
                          setfinal(ANTEAG*fromvalue*0.098/tocurr)
                      }
                     
                    }
                      
                      }} style={{ height: "1.5rem", width: "70%", background: "rgb(238,234,244)", marginTop: "1rem", paddingTop: "0.5rem", marginLeft: "0.2rem" }}></input>
                 
                      <select style={{ background:"rgb(238,234,244)",marginLeft:"0.5rem",marginTop: "0.7rem",height:"1.7rem",width:"20%", position:"absolute" }} onChange={(e)=>{
                        setfrom(e.target.value)
                      }}>
                        <option>BTC</option>
                        <option>INRD</option>
                        <option>ETH</option>
                        <option>BNC</option>
                        <option>USDT</option>
                        <option>ANTEAG</option>
                      </select>
                    </div>

                    <CgArrowsExchangeV size={40} style={{ marginLeft: "50%",marginBottom:"1rem" }}></CgArrowsExchangeV>

                    <div style={{ background: "#eeeaf4", borderRadius: "0.7rem" }}>
                      <label style={{ color: "black", padding: "0.3rem", width: "99%" }}>To</label>
                      <input placeholder={`You will Recieve ${final}`} style={{ underlineColorAndroid :"transparent",height: "1.5rem", width: "70%", background: "rgb(238,234,244)", marginTop: "1rem", paddingTop: "0.5rem", marginLeft: "0.2rem" }}></input>
                      <select style={{ background:"rgb(238,234,244)",marginTop: "0.7rem",marginLeft:"0.5rem",height:"1.7rem",width:"20%", position:"absolute" }} onChange={(e)=>{
                        setto(e.target.value)
                        switch (e.target.value) {
                          case 'ETH':
                            settocurr(ETH)
                          case 'BTC':
                            settocurr(BTC)
                          case 'BNB':
                            settocurr(BNB)
                          case 'ANTEAG':
                            settocurr(ANTEAG)
                          case 'USDT':
                            settocurr(1)
                          case 'INR':
                            settocurr(75)
                        }
                      }}>

                     
                        <option>BTC</option>
                        <option>INRD</option>
                        <option>ETH</option>
                        <option>BNB</option>
                        <option>USDT</option>
                        <option>ANTEAG</option>
                      </select>
                    </div>
                    <Button className="btn btn-primary m-6" style={{ marginTop: "3rem", width: "100%" }} disabled={!valid} onClick={()=>{
                      if(from.length != 0 || to.length != 0){
                        if(from.length < localStorage.getItem(`${from}_Coins`) || to.length < localStorage.getItem(`${to}_Coins`) ){

                        }
                      }
                    }}>Convert</Button>
                  </div>

                </Card1>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
