import AdminSideBar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DefaultProfile from '../../Images/avatar.png'
import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import { Button } from 'react-bootstrap';
const AdminAgentsDetails = () => {
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  let admin=location.state.admin
  let agent=location.state.agent
  let panViewUrl=`${config.SpingUrl}/agent/getPanDoc/${agent.id}`
  let aadharViewUrl=`${config.SpingUrl}/agent/getAadharDoc/${agent.id}`
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const [profilePhoto,setProfilePhoto]=useState(false);
  let profileImage=`${config.SpingUrl}/agent/getProfileImage/${agent.id}`
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
  else{
    axios.get(profileImage, 
      ).then((response)=>{
         
  
          if(response.data != null){
         
          setProfilePhoto(true)
       
          }
  
      
      }).catch((error)=>{
          console.log(error)
      })
  }
},[])


    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
      
        <h1 >Agent Details:</h1>
       
        <center>
        <img  className = "img-circle mt-2" src={profilePhoto ? `${config.SpingUrl}/agent/getProfileImage/${agent.id}`  : DefaultProfile } style={{overflow : 'auto', width:200, height:200, borderRadius:30}} />
            <h1>{agent.firstName} { agent.lastName}</h1>
             <br />

        <table className='table'  style={{width:'60%',border:'2px',borderBlockStyle:'solid'}}>
  <tbody style={styles.myfont}>
   
    <tr>
    <td>Mobile Number</td>
                  <td>{ agent.phoneNumber}</td>
    </tr>
    <tr>
    <td>Email ID</td>
                  <td>{ agent.email}</td>
    </tr>
    <tr>
    <td>Date of Birth</td>
                  <td>{ agent.dateOfBirth}</td>
    </tr>
    <tr>
    <td>PinCode</td>
                  <td>{ agent.address.pincode}</td>
    </tr>
    <tr>
    <td>AddressLine1</td>
                  <td>{ agent.address.addressLine1}</td>
    </tr>
    <tr>
    <td>AddressLine2</td>
                  <td>{ agent.address.addressLine2}</td>
    </tr>
    <tr>
    <td>Village</td>
                  <td>{ agent.address.village}</td>
    </tr>
    <tr>
    <td>City</td>
                  <td>{ agent.address.city}</td>
    </tr>
    <tr>
    <td>State</td>
                  <td>{ agent.address.state}</td>
    </tr>
    <tr>
    <td>Pan Card </td>
                  <td>{ agent.pan}</td>
                            </tr>
                            <tr>
                            
      <td>Adhar Card</td>
                  <td>{ agent.aadhar}</td>
    
    </tr>
    <tr>
      <td><Button onClick={()=>{window.open(aadharViewUrl,"_blank")}} className='btn btn-primary'>View Aadhar</Button></td>
      <td><Button onClick={()=>{window.open(panViewUrl,"_blank")}} className='btn btn-primary'>View Pan</Button></td>
    </tr>
    </tbody>
                    </table>
                </center>
                <center>
                <Link to='/adminagents' className='btn btn-success '  
                state={{admin:admin}}
                style={{
                backgroundColor: "#FFCB08",
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                marginRight:50,
              }}>Back to Agents</Link> 
               <Link to='/adminAgentsCustomers' className='btn btn-success' 
                state={{admin:admin,agent:agent}}
               style={{
                backgroundColor: "#FFCB08",
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
              }}>Check Customers</Link>   
              
                </center>
        </div>
        </div>
    )
}
export default AdminAgentsDetails
const styles={
    myfont: {
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
}