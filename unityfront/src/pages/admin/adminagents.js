import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import "./Dashboard.css";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";
const Adminagents = () => {
  let location=useLocation();
 
  const [adminAgent, setadminAgent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      navigate("/signin");
    } else {
      getAllAdmins();
    }
  }, []);
  let admin=location.state.admin;
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  const getAllAdmins = () => {
    //to set defaults of axios header
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    let url = `${config.SpingUrl}/admin/getAllAgents`;
    axios
      .get(url)
      .then((response) => {
        setadminAgent(response.data);
      })
      .catch((error) => {
        toast.error("Data Not Found" + error);
      });
  };
  const viewDetailsofAgents = (agent) => {
    navigate("/adminAgentsDetails", { state: { agent: agent,admin:admin } });
  };
const viewAgentCustomers = (agent) => {
  navigate("/adminAgentsCustomers", { state: { agent: agent,admin:admin } });
};
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
          <b>My Agents</b>
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
              <th>#</th>
              <th>Agent Name</th>
              <th>Phone No</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {adminAgent.map((agent) => {
              return (
                <tr>
                  <td>{agent.id}</td>
                  <td>{agent.firstName}</td>
                  <td>{agent.phoneNumber}</td>
                  <td>{agent.email}</td>
                  {/* <td><Link to='/adminCustomersDetails' className='btn btn-primary'  style={styles.button}>View Details</Link></td> */}
                  <td>
                    <button
                      onClick={() => viewDetailsofAgents(agent)}
                      className="btn btn-warning"
                      style={styles.button}
                    >
                      View Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => viewAgentCustomers(agent)}
                      className="btn btn-success"
                      style={styles.button}
                    >
                      View Agent Customers
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Adminagents;
const styles = {
  button: {
    borderRadius: "15px",
  },
};
