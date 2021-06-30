import React from "react";
import loginImg from "../../../assets/FInalCryptologo.png"
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';
import {Button,Input,Image,CardText,Card,Label,CardTitle} from 'reactstrap';



export class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    username : [],
    password : []
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <CardTitle style={{fontSize:"3rem",marginTop:"8rem"}}>Login</CardTitle>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <Label style={{color:"black"}} >Username</Label>
              <Input style={{color:"black"}} onChange={(e)=>this.setState({username:e.target.value})} placeholder="username" />
            </div>
            <div className="form-group">
              <Label  style={{color:"black"}}>Password</Label>
              <Input style={{color:"black"}} onChange={(e)=>this.setState({password:e.target.value})} placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <Button type="button" style={{marginTop:"-10rem"}} onClick={()=>{
            axios({
              url : `https://api.anteagle.tech/login?username=${this.state.username}&password=${this.state.password}`,
              headers:{
                'Accept' : "aaplication/json"
              },
              method : "post"
            }).then(res=>{
              if(res.data.success){
                swal("Login Successfull","Proceeding to Home Page","success")
                localStorage.setItem("jwt","test")
                localStorage.setItem("BTC_Coins",res.data.BTC_Coins)
                localStorage.setItem("ETH_Coins",res.data.ETH_Coins)
                localStorage.setItem("BNB_Coins",res.data.BNB_Coins)
                localStorage.setItem("ANTEAG_Coins",res.data.ANT_Coins)
                localStorage.setItem("USDT_Coins",res.data.USDT_Coins)
                localStorage.setItem("INRD_Coins",res.data.INRD_Coins)
                localStorage.setItem("userid",res.data.userid)
                this.props.props.history.push('/admin/dashboard')
              }
              else{
                swal("Error","Invalid username or Password please try agin","error")
              }
            })
          }}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}
