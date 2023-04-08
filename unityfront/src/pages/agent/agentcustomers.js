import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";
import { Link ,useLocation, useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from './../config';

const Agentcustomers = () => {
  let location=useLocation();
  const [customers,setCustomers]=useState([]);
  let agent=location.state.agent;

  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_AGENT"));


  console.log(token);
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
   else{
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get(`${config.SpingUrl}/agent/getMyCustomers/${agent.id}`).then((response)=>
    {
        setCustomers(response.data);
       
    }).catch((error)=>{
      toast.error(error)
    })
  }},[])
  console.log(customers);
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
          overflowX:"hidden"
        }}
      >
        <AgentNavBar agentName={agent.firstName}/>
        <td>
          <Link
            to="/agentAddCustomer"
            className="btn btn-primary"
            state={{agent:agent}}
            style={{
              backgroundColor: "#FFCB08",
              borderRadius: "10px",
              color: "black",
              fontWeight: "bold",
              marginLeft: "85%",
              marginTop: "4%",
            }}
          >
            Add New Customer
          </Link>
        </td>
        <h1
          style={{
            marginBottom: "40px",
            marginLeft: "10px",
            textAlign: "center",
          }}
        >
          <b>My Customers</b>
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
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Phone No</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map(customer=>
                { return(
                  <tr>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.email}</td>
              <td>
                <Link
                  to="/agentCustomersDetails"
                  className="btn btn-primary"
                  style={styles.button}
                  state={{customer:customer,agent:agent}}
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
export default Agentcustomers;
const styles = {
  button: {
    borderRadius: "15px",
  },
};
