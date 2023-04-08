import AgentSideBar from './agentSidebar'
import AgentNavBar from './agentNavbar'
import './Dashboard.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DefaultProfile from '../../Images/avatar.png'
import config from '../config'
import { Button } from 'react-bootstrap'
const AgentCustomersDetails = () => {
  let location = useLocation()

  let agent = location.state.agent
  let customer = location.state.customer
  const Navigate = useNavigate()
  const [profilePhoto,setProfilePhoto]=useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
  let profileImageGet=`${config.SpingUrl}/customer/getProfileImage/${customer.id}`
  const [profileImage,setProfileImage]=useState();
const [aadharDoc,setAadharDoc]=useState();
const[panDoc,setPanDoc]=useState();
let panViewUrl=`${config.SpingUrl}/customer/getPanDoc/${customer.id}`
let aadharViewUrl=`${config.SpingUrl}/customer/getAadharDoc/${customer.id}`
  useEffect(()=>{
   
    if(!token)
    {
      toast.error("Unauthorized access please login first")
      Navigate("/signin")
    }
    else{
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(profileImageGet, 
        ).then((response)=>{
           
    
            if(response.data != null){
           
            setProfilePhoto(true)
         
            }
    
        
        }).catch((error)=>{
            console.log(error)
        })
    }
  },[])
  const updateProfileImage=()=>{
    if(profileImage==null)
    toast.error("Select Profile Image Image First")
    else{
    
    const body=new FormData();
    body.set('profileImage', profileImage);
  console.log(profileImage)
    
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/customer/addProfileImage/${customer.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Profile Image Updated Successfully")
      window.location.reload(false);
    }
      else{
        toast.error("Failed to Update Image")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  const updateAadharDoc=()=>{
    if(aadharDoc==null)
    toast.error("Select Aadhar Doc Image First")
    else{
    
    const body=new FormData();
    body.set('aadharDoc', aadharDoc);
  console.log(aadharDoc)
     
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/customer/addAadharDoc/${customer.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Aadhar Doc Updated Successfully")
      window.location.reload(false);
      
    }
      else{
        toast.error("Failed to Update Aadhar")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  const updatePanDoc=()=>{
    if(panDoc==null)
    toast.error("Select Pan Doc First")
    else{
    
    const body=new FormData();
    body.set('panDoc', panDoc);
  
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/customer/addPanDoc/${customer.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Pan Doc Updated Successfully")
      window.location.reload(false);
    
    }
      else{
        toast.error("Failed to Update Pan Doc")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  return (
    <div className="dashboard d-flex">
      <div>
        <AgentSideBar agent={agent} />
      </div>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <AgentNavBar agent={agent} />
        <h1>Details:</h1>

        <center>
        <img  className = "img-circle mt-2" src={profilePhoto ? `${config.SpingUrl}/customer/getProfileImage/${customer.id}`  : DefaultProfile } style={{overflow : 'auto', width:200, height:200, borderRadius:30}} />
          <h1>
            {customer.firstName} {customer.lastName}
          </h1>
          <br />

          <table
            className="table"
            style={{ width: '60%', border: '2px', borderBlockStyle: 'solid' }}
          >
            <tbody style={styles.myfont}>
              <tr>
                <td>Adhar Card</td>
                <td>{customer.aadhar}</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>{customer.phoneNumber}</td>
              </tr>
              <tr>
                <td>Email ID</td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{customer.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Pan Card </td>
                <td>{customer.pan}</td>
              </tr>
              <tr>
                <td>PinCode</td>
                <td>{customer.address.pincode}</td>
              </tr>
              <tr>
                <td>Village</td>
                <td>{customer.address.village}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{customer.address.city}</td>
              </tr>
              <tr>
                <td>AddressLine 1</td>
                <td>{customer.address.addressLine1}</td>
              </tr>
              <tr>
                <td>AddressLine 2</td>
                <td>{customer.address.addressLine2}</td>
              </tr>
              <tr>
                <td><input
          onChange={(e) => {
           
            setProfileImage(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></td>
                <td><Button onClick={updateProfileImage} title='Upload Photo'>Update Profile Image</Button></td>
              </tr>
              <tr>
                <td> <input
          onChange={(e) => {
           
            setAadharDoc(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></td>
                <td><Button onClick={updateAadharDoc} title='Upload Photo'  style={{marginRight:'20px'}}>Update Aadhar Doc</Button>
                <Button onClick={()=>{window.open(aadharViewUrl,"_blank")}} className='btn btn-success'>View Pan</Button></td>
              </tr>
              <tr>
                <td><input
          onChange={(e) => {
           
            setPanDoc(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></td>
                <td><Button onClick={updatePanDoc} title='Upload Photo' style={{marginRight:'45px'}}>Update Pan Doc</Button>
                <Button onClick={()=>{window.open(panViewUrl,"_blank")}} className='btn btn-success'>View Pan</Button></td>
              </tr>
            </tbody>
          </table>
        </center>
        <center>
          <Link
            to="/agentCustomerPolicies"
            className="btn btn-success"
            state={{agent:agent,customer:customer}}
            style={{
              backgroundColor: '#FFCB08',
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            View Policies
          </Link>
        </center>
      </div>
    </div>
  )
}
export default AgentCustomersDetails
const styles = {
  myfont: {
    textDecoration: 'none',
    fontWeight: 'bold',
    textAlign: 'left',
  },
}
