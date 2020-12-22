import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import FileService from "../services/file.service";
const publicIp = require('public-ip');
const iplocation = require("iplocation");

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      files:[]
    };
  }

  async componentDidMount() {
    const files = await FileService.getFile()
    
    this.setState({
      files:files
    })
    const currentUser = AuthService.getCurrentUser();
    // console.log("current user",currentUser)
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  handleDownload = async (file) =>{
    const ip = await publicIp.v4()
    const ipLoc = await iplocation(ip)
    const fileDownload = await FileService.downloadFile(file,ipLoc,ip,this.state.currentUser.username) 
    // console.log("ipLoc",ipLoc)
  }

  handleGenerate = async () =>{
    // console.log("here")
   const response = await FileService.createFile()
   alert(response.message)
   const files = await FileService.getFile()
    
   this.setState({
     files:files
   })
   
  }

  

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    

    return (
      <div className="container">
         {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        {/*
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>*/}
        {(currentUser.isAdmin) ?
        <button onClick={() => this.handleGenerate()}>generate file</button>
         :null}</div>: null}
         {(currentUser.isAdmin) ? <div>
          

          </div>:null} 

         {this.state.files.map((file)=>{
          //  console.log("file",file)
           return <button onClick={(e)=> this.handleDownload(file)} style={{margin:"auto",padding:"10px",display:"flex",justifyContent:"center", border:"none",backgroundColor:"#fff"}}>{file}</button>
         })}
         
      </div>
    );
  }
}
