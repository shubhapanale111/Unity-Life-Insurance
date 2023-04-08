import AgentSideBar from './agentSidebar'
import AgentNavBar from './agentNavbar';
import "./Dashboard.css";
import { Row, Col, Card, Button } from 'react-bootstrap';
import Footer from '../user/footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

const GetApplicableCustomerPolicies=()=>{
  let location = useLocation()
  
  let agent = location.state.agent
  let customer=location.state.customer
 
 
  const [policies,setPolicies]=useState([])

  let age=getAge(customer.dateOfBirth);
  console.log("Age==>"+age)
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 

 
  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getApplicablePoliciesForCustomer/${customer.id}`)
      .then(response => setPolicies(response.data) ).catch(error=>toast.error(error))
  },[]);

  console.log(policies)

    return(
        <div className="dashboard d-flex">
    	<div>
      	<AgentSideBar agent={agent}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AgentNavBar agentName={agent.firstName}/>
      
       <Row xs={1} md={2} className="g-3">
  
  {   
  policies.filter(policyfilter=>policyfilter.minEntryAge<=age && policyfilter.maxEntryAge>=age).map((policy)=>{
    let imageUrl=`${config.SpingUrl}/admin/getPolicyImage/${policy.id}`
      return(
      <Col>
      <Card className='col-12'>
        <Card.Img variant="top"  src={imageUrl} />
        <Card.Body>
          <Card.Title ><h3>{policy.policyName}</h3></Card.Title>
          <Card.Text>
           <h5>{policy.description}</h5>
          </Card.Text>
          <div className='d-flex justify-content-center'>
          <Link to='/agentPolicyViewDetailsApply' className='btn btn-success ' style={{width:'350px',borderRadius:'15px'}} state={{agent:agent,customer:customer,policy:policy}} >View Policy</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
    )})
  }
</Row>
<Footer/>
       </div>
       </div>
    )
}
export default GetApplicableCustomerPolicies;
function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
