import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const AdminCustomerPolicies = () => {
  let location = useLocation()
  const [customerPolicies,setCustomerpolicies]=useState([]);
  let admin = location.state.admin
  let customer = location.state.customer
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_ADMIN'))

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  useEffect(()=>{
    if (token == null) {
        toast.error('Unauthorized access please login first')
        Navigate('/signin')
      }
    axios.get(`${config.SpingUrl}/admin/getMyCustomerPolicies/customer/${customer.id}`).then((response)=>
    {
       
       setCustomerpolicies(response.data)
    }).catch((error)=>{
      toast.error(error)
    })
  },[])
  return (
    <div className="dashboard d-flex">
    <div>
      <AdminSideBar admin={admin} />
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
      <AdminNavBar adminName={admin.firstName}/>
     
     
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
                to="/adminCustomersPolicyDetails"
                className="btn btn-primary"
                style={styles.button}
                state={{customer:customer,admin:admin,customerPolicy:customerPolicy,customerPolicies:customerPolicies}}
              >
                View Details
              </Link>
            </td>
          </tr>)
              })
          }
         
        </tbody>
      </Table>
      <center>
      <Link
                to="/adminCustomersDetails"
                className="btn btn-warning"
                style={styles.button}
                state={{customerDetails:customer,admin:admin,customerPolicies:customerPolicies}}
              >
                Back to {customer.firstName}s Details
              </Link>
      </center>
    </div>
  </div>
  );
};
export default AdminCustomerPolicies;
const styles = {
  myfont: {
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
  button:{
    borderRadius:'15px'
  }
};
