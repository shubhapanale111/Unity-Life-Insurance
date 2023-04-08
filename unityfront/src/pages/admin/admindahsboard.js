import AdminSideBar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import React, { useEffect, useState } from "react";
import {Row,Col,Card} from 'react-bootstrap'
import { useNavigate, Link, useLocation } from 'react-router-dom';

import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashBoard = () => {
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
},[])
let admin=location.state.admin

  return (
  
    <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <AdminNavBar adminName={admin.firstName}/>
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{ marginRight:'10px',margin:'10px',backgroundColor:'lightblue'}}>
  
    <Card.Body>
      <Card.Title>My Customers</Card.Title>
     
    </Card.Body>
     <Card.Footer> <Link to='/admincustomers' className='btn ' state={{admin:admin}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{ margin:'10px',backgroundColor:'lightyellow'}}>
   
    <Card.Body>
      <Card.Title>My Agents</Card.Title>
      
    </Card.Body>
	<Card.Footer> <Link to='/adminagents' className='btn ' state={{admin:admin}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightgreen'}}>
  
    <Card.Body>
      <Card.Title>Add new Policy</Card.Title>
    </Card.Body>
	<Card.Footer> <Link to='/adminAddPolicy' className='btn ' state={{admin:admin}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightpink'}}>
   
    <Card.Body>
      <Card.Title>All Plans</Card.Title>
	 
    </Card.Body>
	<Card.Footer> <Link to='/adminallplans' className='btn ' state={{admin:admin}}>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
      </div>
    </div>

  )
}
export default AdminDashBoard
