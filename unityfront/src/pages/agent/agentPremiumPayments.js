import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import Table from 'react-bootstrap/Table'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
import config from "../config";
import { toast } from 'react-toastify';
const AgentPremiumPayment=()=>{
  let location = useLocation()
  const[premiums,setPremiums]=useState([])
  let agent = location.state.agent
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 

  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getMyCustomersPremiums/${agent.id}`)
      .then((response) =>{ setPremiums(response.data)
        
      }).catch(error=>toast.error(error))
  },[]);
  console.log(premiums)
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AgentSideBar agent={agent}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <AgentNavBar agentName={agent.firstName}/>
        <h1 style={{marginBottom:'40px',marginLeft:'10px',textAlign:'center'}}><b>My Policies</b></h1>
        <Table striped style={{border: '1px solid black',
  borderRadius:'10px',
borderColor: '#96D4D4',}}>
      <thead >
        <tr>
          <th>CustomerPolicyId</th>
          <th>Policy Name</th>
          <th>Customer Name</th>
          <th>Agent</th>
          <th>Primium</th>
          <th>Premium Date</th>
          
          

        </tr>
      </thead>
      <tbody>
        { premiums.map((premium)=>{
          return(
        <tr>
          <td>{premium.id}</td>
          <td>{premium.policy.policyName}</td>
          <td>{premium.customer.firstName} {premium.customer.lastName}</td>
          <td>{premium.agent.firstName} {premium.agent.lastName}</td>
          <td>{premium.premium}</td>
          <td>{premium.premiumDate}</td>
        
          <td><Link to='/agentPremiumPaynow' className='btn btn-primary' style={styles.button} state={{customer:premium.customer,agent:agent,premium:premium}}>Pay Now</Link></td>
        </tr>
        )}) }   
        
        
      </tbody>
    </Table>
        </div>
        </div>

    )
}
export default AgentPremiumPayment
const styles={
  button:  {
      borderRadius:'15px',
    }
}