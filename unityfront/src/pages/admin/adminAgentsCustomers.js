import AdminSideBar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import "./Dashboard.css";
import Table from 'react-bootstrap/Table'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import config from '../config';

const AdminAgentsCustomers = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const agent = location.state.agent;
  let admin=location.state.admin
  const [agentCustomer,setagentCustomer] = useState([]) 
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      navigate("/signin");
    } else {
      getAllAdminsCustomers();
    }
  }, []);

  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  const getAllAdminsCustomers = () => {
    //to set defaults of axios header
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    let url = `${config.SpingUrl}/agent/getMyCustomers/${agent.id}` ;
    axios
      .get(url)
      .then((response) => {
        setagentCustomer(response.data)
      })
      .catch((error) => {
        toast.error("Data Not Found" + error);
      });
  };

  const adminAgentCustomersInformation= (agentsCustomer) => {
    navigate('/adminAgentsCustomersDetails',{state:{agentcustomerDetails:agentsCustomer}})
  }
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <Link
                       to="/adminAgentsDetails"
                       state={{admin:admin,agent:agent}}
                      className="btn btn-warning"
                      style={styles.backToAgentsbutton}
                    > Back to {agent.firstName}s Details</Link>
        <h1 style={{marginBottom:'40px',marginLeft:'10px',textAlign:'center'}}><b>{agent.firstName} {agent.lastName} Customers</b></h1>
        <Table striped style={{border: '1px solid black',
  borderRadius:'10px',
borderColor: '#96D4D4',}}>
  
      <thead >
        
        <tr>
          <th>CustomerId</th>
          <th>Customer Name</th>
          <th>Phone No</th>
          <th>Email ID</th>
          <td></td>
        </tr>
      </thead>
            <tbody>
              {agentCustomer.map((customer) => {
                return (
                  <tr>
                    <td>{customer.id}</td>
                    <td> {customer.firstName}</td>
                    <td> {customer.phoneNumber}</td>
                    <td>{customer.email}</td>
                    
                    <td><Link
                       to="/adminAgentsCustomersDetails"
                       state={{admin:admin,agent:agent,customer:customer}}
                      className="btn btn-primary"
                      style={styles.button}
                    > View Details</Link></td>
                    <td><Link
                       to="/adminAgentCustomerPolicies"
                       state={{admin:admin,agent:agent,customer:customer}}
                      className="btn btn-success"
                      style={styles.button}
                    >View Policies</Link></td>
                  </tr>)
              })}
      </tbody>
    </Table>
        </div>
        </div>

    )
}
export default AdminAgentsCustomers
const styles={
  button:  {
      borderRadius:'15px',
    }
    ,
    backToAgentsbutton:{
      width:'200px',
      borderRadius:'15px',
      marginLeft:'1050px',
      marginTop:'5px'
    }
}