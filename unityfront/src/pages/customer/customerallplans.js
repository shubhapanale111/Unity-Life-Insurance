import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
import { Row, Col, Card, Button, Toast } from 'react-bootstrap';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import config from './../config'
import { toast } from 'react-toastify'

const CustomerAllPlans=()=>{

let location=useLocation()
let customer=location.state.customer
const[allplans,setallplans]=useState([])
const navigate=useNavigate()
useEffect(()=>{
  if(!sessionStorage['token_CUSTOMER']){
    navigate('/signin')
  }else{
    getallplans()
  }
},[]);

const getallplans=()=>{
  axios.get(config.ExpressUrl+'/customer/allplans',{
    headers:{token:sessionStorage['token_CUSTOMER']},
  })
  .then((response)=>{
    const result=response.data
    if(result['status']==='success'){
      setallplans(response.data.data)
    }else{
      toast.error(result['error'])
    }
  })
}


    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <CustomerNavBar customerName={customer.user.first_name}/>
       
       <Row xs={1} md={2} className="g-3">
            {allplans.map((list) => {
          let imageUrl=`${config.SpingUrl}/admin/getPolicyImage/${list.id}`
              return (
    <Col>
      <Card className='col-12'>
        <Card.Img variant="top"  src= {imageUrl} />
        <Card.Body>
          <Card.Title ><h3>{list.policy_name}</h3></Card.Title>
          <Card.Text>
                      <h5>{ list.policy_description}</h5>
          </Card.Text>
          <div className='d-flex justify-content-center'>
          <Link to='/allpolicydetails' state={{customer:customer,policy:list}} className='btn btn-success ' style={{width:'350px',borderRadius:'15px'}}  >View Policy</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
            )})}
  
</Row>

       </div>
       </div>
    )
}
export default CustomerAllPlans;