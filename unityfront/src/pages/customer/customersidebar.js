import React, { useEffect, useState } from 'react';
import DefaultProfile from '../../Images/avatar.png'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter, 
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { useLocation } from 'react-router-dom';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
const CustomerSideBar = () => {
  let location=useLocation()
  let customer=location.state.customer
  console.log("customer Id"+customer.user.id);
  let profileImage=`${config.SpingUrl}/customer/getProfileImage/${customer.user.id}`
  const [profilePhoto,setProfilePhoto]=useState(false);
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_CUSTOMER"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(() => {
    if (!sessionStorage["token_CUSTOMER"]) {
      Navigate("/signin");
    }
      else{
        axios.get(profileImage, 
    ).then((response)=>{
       

        if(response.data != null){
       
        setProfilePhoto(true)
     
        }

    
    }).catch((error)=>{
        console.log(error)
    })
    }
      
    
  }, []);
    return(
        
            <div style={{  height: '100vh', overflow: 'scroll initial' }}>
              <CDBSidebar textColor="#fff" backgroundColor="#3c008f">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                  <NavLink exact to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    Unity Life Insurance
                  </NavLink>
                </CDBSidebarHeader>
        
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                  <CDBSidebarMenuItem><img  className = "img-circle mt-5" src={profilePhoto ? `${config.SpingUrl}/customer/getProfileImage/${customer.user.id}`  : DefaultProfile } style={{overflow : 'auto', width:130, height:130, borderRadius:65}} /></CDBSidebarMenuItem>
           
           <br></br>
           <br></br>
              <NavLink exact to="/customerdashboard" state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/customerpolicies"  state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="table">My Policies</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/customerAppliedPolicy"  state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="table">Applied Policies</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/customerpremiumpayments"  state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="credit-card">Premium Payments</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/customerprofile" state={{ customer: customer }}  activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/customerallplans" state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="th-large">All Plans</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/customerAllPlansForMe" state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="th-large">Plans For Me</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/customerPolicyHistory" state={{ customer: customer }} activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="th-large">Policy History</CDBSidebarMenuItem>
                    </NavLink>
        
                   
                  </CDBSidebarMenu>
                </CDBSidebarContent>
        
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      padding: '20px 5px',
                    }}
                  >
                    Sidebar Footer
                  </div>
                </CDBSidebarFooter>
              </CDBSidebar>
            </div>
        
    )
}
export default CustomerSideBar