import AdminSidebar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';
const AdminPolicyDetails = () => {
  const location = useLocation()
  let admin=location.state.admin
  const policyDetails= location.state.policy
  const [file,setFile]=useState();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      Navigate("/signin");
    }
  }, []);
  const updatePolicyImage=()=>{
    if(file==null)
    toast.error("Select Policy Image First")
    else{
    
    const body=new FormData();
    body.set('imageFile', file);
  console.log(file)
    
    console.log(body.imageFile);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/admin/addPolicyImage/${policyDetails.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {Navigate("/adminallplans", {state:{admin:admin}})
      toast.success("Image Updated Successfully")
    }
      else{
        toast.error("Failed to Update Image")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  return (
    <div className="dashboard d-flex">
      	<div>
      	<AdminSidebar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <h1>Details:</h1>
        <td>
          <Link
            to="/adminAddPolicy"
            className="btn btn-primary"
            state={{admin:admin}}
            style={{
              backgroundColor: "#FFCB08",
              borderRadius: "10px",
              color: "black",
              fontWeight: "bold",
              marginLeft: "88%",
            }}
          >
            Add New Policy
          </Link>
        </td>
        <center>
          <h1>PolicyDetails</h1>
          <br />
          <table
            className="table"
            style={{ width: "60%", border: "2px", borderBlockStyle: "solid" }}
          >
            <tbody style={styles.myfont}>
              <tr>
                <td>
                  <h4>Policy Name</h4>
                </td>
                <td>
                  <h4>{ policyDetails.policyName}</h4>
                </td>
              </tr>
              <tr>
                <td>Policy Discription</td>
                <td>{ policyDetails.policyDescription}</td>
              </tr>
              <tr>
                <td>Minimun Entry Age</td>
                <td>{policyDetails.minEntryAge }</td>
              </tr>
              <tr>
                <td>Maximum Entry Age</td>
                <td>{ policyDetails.maxEntryAge}</td>
              </tr>
              <tr>
                <td>Minimum Period Months</td>
                <td>{ policyDetails.minPeriodMonths}</td>
              </tr>
              <tr>
                <td>Maximum Period Moths</td>
                <td>{ policyDetails.maxPeriodMonths}</td>
              </tr>
              <tr>
                <td>Agent Commission Percentage</td>
                <td>{ policyDetails.agentCommisionPercentage}</td>
              </tr>
              <tr>
                <td>Per Annum Rate</td>
                <td>{policyDetails.perAnnumRate }</td>
                  </tr>
                  <tr>
                <td>Update Image</td>
                <td><input
          onChange={(e) => {
           
            setFile(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></td>
       <td> <Button onClick={updatePolicyImage} title='Upload Photo'>Update Image</Button></td>
                  </tr>
              </tbody>
          </table>
          <Link to='/adminallplans' className='btn btn-success ' style={{width:'350px',borderRadius:'15px'}}  state={{admin:admin}} >Back To Plans</Link>
        </center>
      </div>
    </div>
  );
};
export default AdminPolicyDetails;
const styles = {
  myfont: {
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
};
