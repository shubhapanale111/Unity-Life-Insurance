import AgentSideBar from './agentSidebar'
import AgentNavBar from './agentNavbar';
import "./Dashboard.css";
import { Row, Col, Card, Button } from 'react-bootstrap';
import Footer from '../user/footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config'
const AgentAllPlans=()=>{
  let location = useLocation()
let agent=""
  const [policies,setPolicies]=useState([])
  agent=location.state.agent
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 

 
  
  useEffect(() => {
    if (token == null) {
      toast.error('Unauthorized access please login first')
      Navigate('/signin')
    }
    else{
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getAllPolicies`)
      .then(response => setPolicies(response.data) ).catch(error=>toast.error(error))
  }},[]);
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
    policies.map((policy)=>{
      let imageUrl=`${config.SpingUrl}/admin/getPolicyImage/${policy.id}`
      return(
      <Col>
      <Card className='col-12'>
        <Card.Img variant="top"  src={imageUrl} />
        <Card.Body>
          <Card.Title ><h3>{policy.policyName}</h3></Card.Title>
          <Card.Text>
           <h5> This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.</h5>
          </Card.Text>
          <div className='d-flex justify-content-center'>
          <Link to='/agentViewPolicy' className='btn btn-success ' style={{width:'350px',borderRadius:'15px'}}  state={{agent:agent,policies:policies,policy:policy}} >View Policy</Link>
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
export default AgentAllPlans;