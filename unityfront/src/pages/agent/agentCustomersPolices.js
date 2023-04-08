import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import config from './../config';
const AgentCustomerPolicies = () => {
  let location = useLocation()
  const [customerPolicies,setCustomerpolicies]=useState([]);
  let agent = location.state.agent
  let customer = location.state.customer
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))


  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getMyCustomerPolicies/${agent.id}/customer/${customer.id}`).then((response)=>
    {
       
       setCustomerpolicies(response.data)
    }).catch((error)=>{
      toast.error(error)
    })
  },[])
  return (
    <div className="dashboard d-flex">
    <div>
      <AgentSideBar agent={agent} />
    </div>
    <div
      style={{
        flex: "1 1 auto",
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <AgentNavBar agentName={agent.firstName}/>
      <td>
          <Link
            to="/agentGetApplicablePoliciesForCustomer"
            className="btn btn-primary"
            state={{agent:agent,customer:customer,customerPolicies:customerPolicies}}
            style={{
              backgroundColor: "#FFCB08",
              borderRadius: "10px",
              color: "black",
              fontWeight: "bold",
              marginLeft: "85%",
              marginTop: "4%",
            }}
          >
            Apply for New Policy
          </Link>
        </td>
     
      <h1
        style={{
          marginBottom: "40px",
          marginLeft: "10px",
          textAlign: "center",
        }}
      >
        <b>{customer.firstName} {customer.lastName} Policies</b>
      </h1>
      <Table
        striped
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          borderColor: "#96D4D4",
        }}
      >
        <thead>
          <tr>
            <th>Policy Id</th>
            <th>Policy Name</th>
            <th>Premium Date</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {
            
            customerPolicies.filter(policy=>policy.status==true).map(customerPolicy=>
              { return(
                <tr>
            <td>{customerPolicy.id}</td>
            <td>{customerPolicy.policy.policyName}</td>
            <td>{customerPolicy.premiumDate}</td>
            <td>{customerPolicy.premium}</td>
            <td>
              <Link
                to="/agentCustomersPolicyDetails"
                className="btn btn-primary"
                style={styles.button}
                state={{customer:customer,agent:agent,customerPolicy:customerPolicy}}
              >
                View Details
              </Link>
            </td>
          </tr>)
              })
          }
         
        </tbody>
      </Table>
    </div>
  </div>
  );
};
export default AgentCustomerPolicies;
const styles = {
  myfont: {
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
};
