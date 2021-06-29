import React from "react";
import loginImg from "../../../assets/FInalCryptologo.png"
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Col, Row, Button, Form, FormGroup, Label, Input ,CardTitle, CardText, FormFeedback} from 'reactstrap';
import swal from 'sweetalert';
export class Register extends React.Component {
  constructor(props) {
    super(props);
  }
 componentDidMount(){
   axios({
     url : 'http://103.155.73.35:3001/allusers',
     method :"get",
     headers:{
       'Accept' : "application/json"
     }
   }).then(res=>{
      for(let i=0;i<res.data.data.length;i++){
        this.state.usernames.push(res.data.data[i].username)
        this.state.emails.push(res.data.data[i].email)
      }
    console.log(this.state.emails)
    console.log(this.state.usernames)
   }
   )
 }
  state = {
    username : '',
    password : '',
    email : '',
    telegram : '',
    valid_e : true,
    valid_p : true,
    valid_u : true,
    usernames : [],
    emails : []
  }
  render() {
    return (
          <Form>
  <CardTitle style={{fontSize:"4em",fontFamily:"StrasuaRegular"}}>REGISTER</CardTitle>
 <img src={loginImg} style={{height:"10em"}} />
      <FormGroup>
        <Label style={{color:"black"}} for="exampleAddress">Username*</Label>
        <Input invalid={!this.state.valid_u} onChange={(e)=>{
          if(this.state.usernames.find(ele => ele == e.target.value) != null){
            this.setState({valid_u:false})
          }
          else{
            this.setState({valid_u:true})
            this.setState({username:e.target.value})
            console.log("exists")
          }
          
          
        }} type="text" name="address" id="exampleAddress" placeholder="Username" style={{color:"black"}}/>
         <FormFeedback invalid tooltip>This username already exist please choose another</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label style={{color:"black"}} for="exampleAddress2">Password*</Label>
        <Input invalid={!this.state.valid_p} onChange={(e)=>{
          this.setState({password:e.target.value})

        }} type="text" name="address2" id="exampleAddress2" placeholder="Password"  style={{color:"black"}}/>
       
      </FormGroup>
  
          <FormGroup>
            <Label style={{color:"black"}} for="exampleCity">Email Id*</Label>
            <Input invalid={!this.state.valid_e} onChange={(e)=>{
             if(this.state.emails.find(ele => ele == e.target.value) != null){
              this.setState({valid_e:false})
            }
            else{
              this.setState({valid_e:true})
              this.setState({email:e.target.value})
              console.log("exists")
            }
            

            }} type="text" name="city" id="exampleCity" placeholder="Email id" style={{color:"black"}}/>
             <FormFeedback invalid tooltip>This Email already exist please choose another</FormFeedback>
          </FormGroup>
       
          <FormGroup>
            <Label style={{color:"black"}} for="exampleState">Telegram ID</Label>
            <Input onChange={(e)=>{
              this.setState({telegram:e.target.value})

            }} type="text" name="state" id="exampleState" placeholder="Telegram Id (Optional)" style={{color:"black"}}/>
          </FormGroup>
        <CardText style={{color:"black"}}>*All these fields are Required</CardText>
      <Button disabled={!(this.state.valid_u && this.state.valid_p && this.state.valid_e)} onClick={()=>{
        if(this.state.username.length > 0 && this.state.username.length > 0 && this.state.email.length > 0){
          axios({
            url : `http://103.155.73.35:3001/register?username=${this.state.username}&password=${this.state.password}&email=${this.state.password}&telegram=${this.state.telegram}`,
            headers:{
              'Accept' : "application/json"
            },
            method : "post"
          }).then(res=>{
            if(res.data.success){
              swal("Registered Successfully","Sigin First","success")
              
            }
            else{
              swal("Error","Some Error Occured","error")
            }
          })
        }
      else{
        swal("Error","Please Fill all the required fields","error")
      }
                 
      }}>Sign in</Button>
    </Form>
   
    );
  }
}
