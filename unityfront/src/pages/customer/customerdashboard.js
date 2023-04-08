import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import React from "react";
import {Row,Col,Card} from 'react-bootstrap'
import { useNavigate, Link,useLocation } from 'react-router-dom';


import "./Dashboard.css";

const CustomerDashBoard = () => {
	const Navigate=useNavigate();
  //console.log(props.user);
  let location=useLocation()
  let customer=location.state.customer
  //console.log(customer);
  return (
  
    <div className="dashboard d-flex justify-content-center align-item-center">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <CustomerNavBar customerName={customer.user.first_name}/>
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{ marginRight:'10px',margin:'10px',backgroundColor:'lightblue'}}>
  
    <Card.Body>
      <Card.Title>My Policies</Card.Title>
     
    </Card.Body>
     <Card.Footer> <Link to='/customerpolicies'state={{customer:customer}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{ margin:'10px',backgroundColor:'lightyellow'}}>
   
    <Card.Body>
      <Card.Title>Premium Payment</Card.Title>
      
    </Card.Body>
	<Card.Footer> <Link to='/customerpremiumpayments' state={{customer:customer}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
		<Row>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightgreen'}}>
  
    <Card.Body>
      <Card.Title>My Profile</Card.Title>
    </Card.Body>
	<Card.Footer> <Link to='/customerprofile' state={{customer:customer}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		<Col className='col-6'>
		<Card border="primary" style={{margin:'10px',backgroundColor:'lightpink'}}>
   
    <Card.Body>
      <Card.Title>All     Plans</Card.Title>
	 
    </Card.Body>
	<Card.Footer> <Link to='/customerallplans' state={{customer:customer}} className='btn '>View Details</Link></Card.Footer>
  </Card>
		</Col>
		</Row>
  
   
      </div>
      
    </div>

  )
}
export default CustomerDashBoard
