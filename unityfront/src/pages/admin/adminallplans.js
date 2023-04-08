import AdminSidebar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import "./Dashboard.css";
import { Row, Col, Card, Button } from 'react-bootstrap';
import Footer from '../user/footer';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from 'react-router-dom';
import config from './../config';
const AdminAllPlans = () => {
  let location=useLocation();
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();
  let admin=location.state.admin
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      navigate("/signin");
    } else {
      adminallPlans();
    }
  }, []);
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  const adminallPlans = () => {
    //to set defaults of axios header
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    let url = `${config.SpingUrl}/admin/getAllPolicies`;
    axios
      .get(url)
      .then((response) => {
        setPolicies(response.data);
       
      })
      .catch((error) => {
        toast.error("Data Not Found" + error);
      });
  };
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSidebar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
       
       <Row xs={1} md={2} className="g-3">
  {policies.map((policy)=>{
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
          <Link to='/adminPolicyDetails' className='btn btn-success ' style={{width:'350px',borderRadius:'15px'}}  state={{admin:admin,policies:policies,policy:policy}} >View Policy</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
    )})}
</Row>
<Footer/>
       </div>
       </div>
    )
}
export default AdminAllPlans;