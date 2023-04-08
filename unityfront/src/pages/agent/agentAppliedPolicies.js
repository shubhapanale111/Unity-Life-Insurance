import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import config from './../config';
const AgentAppliedPolicies = () => {
  let location = useLocation()
  const [appiliedPolicies,setAppliedpPolicies]=useState([]);
  let agent = location.state.agent
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))


  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getAppliedPolicies/${agent.id}`).then((response)=>
    {
       
      setAppliedpPolicies(response.data)
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
     
      <h1
        style={{
          marginBottom: "40px",
          marginLeft: "10px",
          textAlign: "center",
        }}
      >
        <b>Pending Applications</b>
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
            <th>Customer Name</th>
            <th>Premium</th>
            <th>Claimable Amount</th>
            <th>Agent Commission Percent</th>
            </tr>
        </thead>
        <tbody>
          {
            
            appiliedPolicies.map(AppliedPolicy=>
              { return(
                <tr>
            <td>{AppliedPolicy.id}</td>
            <td>{AppliedPolicy.policy.policyName}</td>
            <td>{AppliedPolicy.customer.firstName} {AppliedPolicy.customer.lastName}</td>
            <td>{AppliedPolicy.premium}</td>
            <td>{AppliedPolicy.claimAmount}</td>
            <td>{AppliedPolicy.policy.agentCommisionPercentage}</td>
            
           
          </tr>)
              })
          }
         
        </tbody>
        
      </Table>
      <center>
      <Link
                to="/agentDashBoard"
                className="btn btn-primary"
                style={styles.signinButton}
                state={{agent:agent}}
                
              >
                Back To DashBoard
              </Link>
      </center>
    </div>
  </div>
  );
};
export default AgentAppliedPolicies;
const styles = {
  myfont: {
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
  signinButton: {
    position: 'relative',
    width: '50%',
    height: 40,
    backgroundColor: '#FFCB08',
    color: 'black',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
    fontWeight: 'bold',
  },
};
