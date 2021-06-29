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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import ChartView from './ChartView';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  FormGroup,
  Label,
  Input,
  Form,
  Table,
  Row,
  Col,
  CardText,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import ChartViewer from './ChartViewer';
// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { FormControl,InputLabel,FormHelperText,Select } from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { set, useForm } from "react-cool-form";  
import axios from "axios";
import './DashBoard.css';
import 'react-tabs/style/react-tabs.css';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import NativeSelect from '@material-ui/core/NativeSelect';
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";


const Field = ({ label, id, error, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
    {error && <p>{error}</p>}
  </div>
);
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: '#d4a537',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


function Dashboard(props) {
  
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [pair,setpair] = React.useState('BTC/INRD')
  const [tradingvalue,settradingvalue] = React.useState(null);
  const [buy_limit_amount,setbuy_limit_amount] = React.useState(0);
  const [buy_limit_price,setbuy_limit_price] = React.useState(0);
  const [buy_market_amount,setbuy_market_amount] = React.useState(0);
  const [buy_market_price,setbuy_market_price] = React.useState(0);
  const [sell_limit_price,setsell_limit_price] = React.useState(0);
  const [sell_limit_amount,setsell_limit_amount] = React.useState(0);
  const [sell_market_price,setsell_market_price] = React.useState(0);
  const [sell_market_amount,setsell_market_amount] = React.useState(0);
  const [valid,setvalid] = React.useState(true)
  const [valid_s,setvalid_s] = React.useState(true)

  const [liveprice_BTC,setlive_BTC] = React.useState(0)
  const [liveprice_BTC_u,setlive_BTC_u] = React.useState(0)
  const [liveprice_BNB_u,setlive_BNB_u] = React.useState(0)
  const [liveprice_BNB,setlive_BNB] = React.useState(0)
  const [liveprice_ETH,setlive_ETH] = React.useState(0)
  const [liveprice_ETH_u,setlive_ETH_u] = React.useState(0)
  const [liveprice_ANTEAG,setlive_ANTEAG] = React.useState(0)
  const [liveprice_ANTEAG_u,setlive_ANTEAG_u] = React.useState(0)
  const [liveprice,setlive] = React.useState(0)

  const [myorders,setmyorder] = React.useState([]);
  const [book,setbook] = React.useState([]);
  const [book_s,setbook_s] = React.useState([]);
  const [c_order,setc_order] = React.useState([]);
  const toggle = () => setIsOpen(!isOpen);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const { form, use } = useForm({
    // (Strongly advise) Provide the default values just like we use React state
    defaultValues: { username: "", email: "", password: "" },
    // The event only triggered when the form is valid
    onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
  });
  // We can enable the "errorWithTouched" option to filter the error of an un-blurred field
  // Which helps the user focus on typing without being annoyed by the error message
  const errors = use("errors", { errorWithTouched: true });
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  useEffect(()=>{
    setInterval(()=>{
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BTC/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_BTC(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BTC/USDT`
      }).then(res=>{
        if(res.data[0]){
          setlive_BTC_u(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ETH/USDT`
      }).then(res=>{
        if(res.data[0]){
          setlive_ETH_u(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ETH/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_ETH(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BNB/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_BNB(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BNB/USDT`
      }).then(res=>{
        if(res.data[0]){
          setlive_BNB_u(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ANTEAG/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_ANTEAG(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ANTEAG/USDT`
      }).then(res=>{
        if(res.data[0]){
          setlive_ANTEAG_u(res.data[0].price)
        }
        
      })

      axios({
        method : 'get',
        url : `https://api.anteagle.tech/orderbook`
      }).then(res2=>{
        var ans2 = []
        var ans3 = []
        for(let i =0;i<res2.data.length;i++){
          var temp = []
          var temp2 = []
          if(res2.data[i].side == 'BUY'){
            temp.push(res2.data[i].price)
            temp.push(res2.data[i].Amount)
            temp.push(res2.data[i].price*res2.data[i].Amount)
            ans2.push(temp)
          }
          else{
            temp2.push(res2.data[i].price)
            temp2.push(res2.data[i].Amount)
            temp2.push(res2.data[i].price*res2.data[i].Amount)
            ans3.push(temp2)
          }
          
        }
        setbook(ans2)
        setbook_s(ans3)
      })
    axios({
        method:"post",
        url : `https://api.anteagle.tech/getorder?userid=${localStorage.getItem("userid")}`,
        headers:{
          'Accept' : 'application/json',
          Authtoken : "jkdhfjkdf"
        }
      }).then(({data})=>{
        var ans = []
        for(let i=0;i<data.data.length;i++){
          var temp = []
          temp.push(data.data[i].date)
          temp.push(data.data[i].pair)
          temp.push(data.data[i].type)
          temp.push(data.data[i].side)
          temp.push(data.data[i].price)
          temp.push(data.data[i].Amount)
          temp.push(data.data[i].filled)
          temp.push(data.data[i].total)
          temp.push(data.data[i].status)
          ans.push(temp)
        } 
        setmyorder(ans)
      })
      // setc_order(data.data)
     
      axios({
        method : "get",
        url : `https://api.anteagle.tech/allwallet?userid=${localStorage.getItem("userid")}`,
        headers : {
          'Accept' : "application/json"
        }
      }).then(res1=>{
        localStorage.setItem("BTC_Coins",res1.data.data.BTC_Coins)
      localStorage.setItem("BNB_Coins",res1.data.data.BNB_Coins)
      localStorage.setItem("ETH_Coins",res1.data.data.ETH_Coins)
      localStorage.setItem("ANTEAG_Coins",res1.data.data.ANT_Coins)
      localStorage.setItem("USDT_Coins",res1.data.data.USDT_Coins)
      localStorage.setItem("INRD_Coins",res1.data.data.INRD_Coins)
      })
    },100)
    
  
    
 


  },[])
  return (
    <>
    
      <div className="content" style={{marginLeft:"0.8rem"}}>
        <Row style={{marginBottom:"0.6rem",height:"7rem"}}>
        <div>
      <Navbar color="dark" light expand="md" style={{width:"100%",marginLeft:"0.5rem",borderRadius:"10px",paddingLeft:"2rem"}}>
       
        <NavbarToggler style={{margin:"auto"}} onClick={toggle}>
        <span style={{fontSize:"2rem",color:"white",borderColor:"white"}}> {pair} </span>

        
          
        </NavbarToggler>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem style={{marginLeft:"1rem"}}> 
            <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle tag="a" style={{fontSize:"2rem",borderRadius:"10px",borderWidth:'1px',borderColor:"white"}}  caret>
            {pair}    <i 
 class="fa fa-chevron-down"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem  onClick={()=>{setpair('BTC/USDT');settradingvalue('BTCUSDT');setlive(liveprice_BTC_u)}}>BTC/USDT</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('BTC/INRD');settradingvalue('BTCINR');setlive(liveprice_BTC)}}>BTC/INRD</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('ETH/USDT');settradingvalue('ETHUSDT');setlive(liveprice_ETH_u)}}>ETH/USDT</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('ETH/INRD');settradingvalue('ETHINR');setlive(liveprice_ETH)}}>ETH/INRD</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('BNB/USDT');settradingvalue('BNBUSDT');setlive(liveprice_BNB_u)}}>BNB/USDT</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('BNB/INRD');settradingvalue('BNBINR');setlive(liveprice_BNB)}}>BNB/INR</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('ANTEAG/USDT');settradingvalue('ANTEAGUSDT');setlive(liveprice_ANTEAG_u)}}>ANTEAG/USDT</DropdownItem>
            <DropdownItem  onClick={()=>{setpair('ANTEAG/INRD');settradingvalue('ANTEAGINR');setlive(liveprice_ANTEAG)}}>ANTEAG/INRD</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
              <CardText>Current {pair.substr(0,pair.indexOf('/'))} Price</CardText><CardText style={{color:"green",fontWeight:"bold"}}>{liveprice} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BTC Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BTC_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BNB Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BNB_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ETH Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ETH_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>USDT Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("USDT_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ANTEAG Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ANTEAG_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>INRC Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("INRD_Coins")}</CardText>
            </NavItem>
            
          
          </Nav>
        
         
        </Collapse>
      </Navbar>
    </div>
        </Row>
       
          
{pair == 'ANTEAG/USDT' || pair == 'ANTEAG/INRD' ? <ChartViewer  className="apexcharts-tooltip"/>: <TradingViewWidget
    symbol={tradingvalue}
    theme={Themes.DARK}
    locale="en"
  />}


  
      
        <Row>
         
          <Col className="mr-auto ml-auto" lg="6">
            <Card className="card-chart">
              <CardHeader>
                
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  BUY
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input  onChange={(event)=>{
      setbuy_limit_price(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>
    <Label>Amount</Label>
   
    
    <Input invalid={!valid} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(parseFloat(event.target.value))
     }
      
    }}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      console.log()
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      console.log()
      setbuy_limit_amount(parseFloat(parseFloat(event.target.value) /parseFloat(buy_limit_price)) )
     }
      
    }}></Input>

    <Button disabled={!valid} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_limit_price,
          Amount : buy_limit_amount,
          filled : "0.0",
          total : buy_limit_price*buy_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount;
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setbuy_market_price(event.target.value)
    }}></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_market_amount} onChange={(event)=>{
      setbuy_market_amount(event.target.value)
    }} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/'),pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>localStorage.getItem(curr)){
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(event.target.value)
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_market_price,
          Amount : buy_market_amount,
          filled : "0.0",
          total : buy_market_price*buy_market_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount;
      localStorage.setItem(`${curr}_Coins`)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
  </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> SELL
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_limit_price(event.target.value)
    }}></Input>
    <Label>Amount</Label>
    <Input invalid={!valid_s} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_limit_amount} onChange={(event)=>{
      if(event.target.value > localStorage.getItem("BTC_Coins")){
        setvalid_s(false)
      }
      else{
        setvalid_s(true)
        setsell_limit_amount(event.target.value)
      }
      
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if((event.target.value*buy_limit_price)>localStorage.getItem(curr)){
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_limit_amount(event.target.value)
     }
      
    }}></Input>
    <Button disabled={!valid_s} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : sell_limit_price,
          Amount : sell_limit_amount,
          filled : "0.0",
          total : sell_limit_price*sell_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(0,pair.indexOf('/'))}`
      console.log(localStorage.getItem(`${curr}_Coins`) - sell_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - sell_limit_amount;
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form > 
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_market_amount(event.target.value)
    }} ></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_market_amount} onChange={(event)=>{
      setsell_market_amount(event.target.value)
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if((event.target.value/sell_market_price)>localStorage.getItem(curr)){
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_market_amount(event.target.value)
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : sell_market_price,
          Amount : sell_market_amount,
          filled : "0.0",
          total : sell_market_price*sell_market_amount,
        }),
      }).then(res=>{console.log(res.data)})
      axios({
        method:"post",
        url : `http://103.155.73.35/get${pair.substr(0,pair.indexOf('/')).toLowerCase()}?coins=${localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}_Coins`)-sell_market_amount}`,
        headers:{
          "Accept": "application/json"
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
  </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (BUY)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (SELL)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {book_s.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
               <Tabs>
                <TabList>
                  <Tab>Open Orders({myorders.length})</Tab>
                  <Tab>Order History</Tab>
                  <Tab>Trade History</Tab>
                </TabList>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                
                 {myorders.map((ans,i)=>{
                   return(
                    <tr>
                      {  ans.map((res,i)=>{
                    return(
                      <td>{res}</td>
                    )
                   })}
                  <td><Button title="Cancel" onClick={()=>{
                    axios({
                      method:'post',
                      url : `https://api.anteagle.tech/cancel?userid=${localStorage.getItem("userid")}`,
                      headers:{
                        "Accept": "application/json, text/plain, */*",
                        'Content-type' : "application/json"
                      },
                      data : JSON.stringify({
                        date : ans[0],
                        pair : ans[1],
                        type : ans[2],
                        side : ans[3],
                        price : ans[4],
                        Amount : ans[5],
                        filled : ans[6],
                        total : ans[7],
                        status : ans[8],
                        
                      })
                    }).then(res=>{
                      console.log(res.data)
                      swal("Canceled","Your order Canceled Successfully","success")
                    })
                  }}>Cancel</Button></td>
                       </tr>
                   )
                 
                      
                 })}
               
                    
                  </tbody>
                </Table>
                </TabPanel>
               </Tabs>
              </CardBody>
            </Card>
          </Col>
      </div>
    </>
  );
}

export default Dashboard;
