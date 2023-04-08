import AgentSideBar from './agentSidebar'
import AgentNavBar from './agentNavbar';
import React from "react";
import {Row,Col,Card, Button} from 'react-bootstrap'
import { Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import  { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Dashboard.css";

const AgentDashboard = () => {
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_AGENT"));

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
},[])
 let agent=location.state.agent;


  return (
  
    <div className="dashboard d-flex">
    	<div>
      	<AgentSideBar agent={agent}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <AgentNavBar agentName={agent.firstName} />
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{ marginRight:'10px',margin:'10px',backgroundColor:'lightblue'}}>
  
    <Card.Body>
      <Card.Title>My Customers</Card.Title>
     
    </Card.Body>
     <Card.Footer> <Link to='/agentCustomers' state={{agent:agent}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{ margin:'10px',backgroundColor:'lightyellow'}}>
   
    <Card.Body>
      <Card.Title>Premium Payments</Card.Title>
      
    </Card.Body>
	<Card.Footer> <Link to='/agentPremiumPayment' className='btn ' state={{agent:agent}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightgreen'}}>
  
    <Card.Body>
      <Card.Title>My Profile</Card.Title>
    </Card.Body>
	<Card.Footer> <Link to='/agentProfile' className='btn ' state={{agent:agent}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightpink'}}>
   
    <Card.Body>
      <Card.Title>Applied Policies</Card.Title>
	 
    </Card.Body>
	<Card.Footer> <Link to='/agentAppliedPolicies'state={{agent:agent}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
      </div>
    </div>

  )
}
export default AgentDashboard
