import axios from "axios";
import React, { Component } from "react";

import UserService from "../services/user.service";
const API_URL = "http://localhost:8080/api/users";
const publicIp = require('public-ip');
const iplocation = require("iplocation");

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Admin",
      users:[],
      miles:0
    };
  }

  componentDidMount() {
    axios.get(API_URL).then(response=>{
      console.log("users",response)
      this.setState({
          users:response.data.users
      })
    }).catch(err=>console.log(err))
  }
  handleReset = () =>{
    axios.get(API_URL).then(response=>{
      this.setState({
          users:response.data.users
      })
    }).catch(err=>console.log(err))
  }

  handleSearch =async () => {
    const ip = await publicIp.v4()
    const ipLoc = await iplocation(ip)
    axios({method:"POST",url:API_URL+`/d?distance=${this.state.miles}`,data:{
      longitude:ipLoc.longitude,
      latitude:ipLoc.latitude
    }}).then(resp =>{
      // console.log("resp",resp)
      this.setState({
        users:resp.data.users
      })    })
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div style={{display:"flex", justifyContent:"space-between",
      paddingBottom:"32px"}}>
         <p>
         <input type="number" min={0} style={{width:"300px"}} width="340px" onChange={(e) =>{
           this.setState({
             miles:e.target.value
           })
         }} placeholder="distance(miles) from your location" />
         <button onClick={() =>{
           this.handleSearch()
         }}> Search</button>
         <button onClick={()=>{
           this.handleReset()
         }}> Reset</button>
          </p>
        </div>
        {/* {console.log("users",this.state.users)} */}
        {this.state.users.length ?
          this.state.users.map(user=>{
            return(
              <div>
                <p>User: {user.username}</p>
                {user.downloads.map((file)=>{
                  return(
                    <div style={{paddingLeft:"12px"}}>
                      <p>File: {file.file},{file.ipLoc.city},{file.ipLoc.country.name},{file.ip}</p>
                    </div>
                  )
                })}
              </div>
            )
          }):null
        }
      </div>
    );
  }
}
