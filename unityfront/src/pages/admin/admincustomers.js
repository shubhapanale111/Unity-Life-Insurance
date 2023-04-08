import AdminSideBar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import "./Dashboard.css";
import Table from 'react-bootstrap/Table'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import AdminCustomersDetails from './adminCustomersDetails';
import config from './../config';
const Admincustomers = () => {
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));

 
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
  else{
    getAllCustomers()
  }
},[])
let admin=location.state.admin
  const [adminCustomer,setadminCustomer] = useState([]) 
  const navigate = useNavigate()
  useEffect(() => {
  if (!sessionStorage['token_ADMIN']) {
    navigate('/signin')
  } else {
   
  }
  }, [])
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const getAllCustomers = () => {
   let url=`${config.SpingUrl}/admin/getAllCustomers`;
    axios.get(url).then((response) => {
    setadminCustomer(response.data)
    }).catch((error) => {
      toast.error("Data Not Found" + error)
    })
  }
  const viewDetails = (customer,admin) => {
    navigate('/adminCustomersDetails',{state:{customerDetails:customer,admin:admin}})
  }
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <h1 style={{marginBottom:'40px',marginLeft:'10px',textAlign:'center'}}><b>My Customers</b></h1>
        <Table striped style={{border: '1px solid black',
  borderRadius:'10px',
borderColor: '#96D4D4',}}>
      <thead >
        <tr>
          <th>Customer Id</th>
          <th>Customer Name</th>
          <th>Phone No</th>
          <th>Email ID</th>
        </tr>
      </thead>
            <tbody>
              {adminCustomer.map((customer) => {
                return (
                  <tr>
                <td>{customer.id}</td>
          <td>{customer.firstName}</td>
          <td>{customer.phoneNumber}</td>
                <td>{ customer.email}</td>
                    <td><button onClick={() => viewDetails(customer,admin)} className='btn btn-primary'  style={styles.button}>View Details</button></td>
        </tr>
                )
              })}
              
      </tbody>
    </Table>
        </div>
        </div>

    )
}
export default Admincustomers
const styles={
  button:  {
    borderRadius: '15px',
    }
}