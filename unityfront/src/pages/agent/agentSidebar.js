import React, { useEffect, useState } from "react";
import DefaultProfile from '../../Images/avatar.png'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
const AgentSidebar = (props) => {
  let agent=props.agent;
  const [token, setToken] = useState(sessionStorage.getItem("token_AGENT"));
  const Navigate=useNavigate();
  let profileImage=`${config.SpingUrl}/agent/getProfileImage/${agent.id}`
  const [profilePhoto,setProfilePhoto]=useState(false);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(() => {
    if (!sessionStorage["token_AGENT"]) {
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

  return (
    <div style={{ height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#3c008f">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink
            exact
            to="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            SVRP INSURANCE
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <CDBSidebarMenuItem><img  className = "img-circle mt-5" src={profilePhoto ? `${config.SpingUrl}/agent/getProfileImage/${agent.id}`  : DefaultProfile } style={{overflow : 'auto', width:130, height:130, borderRadius:65}} /></CDBSidebarMenuItem>
           
           <br></br>
           <br></br>
            <NavLink exact to="/agentdashboard" state={{agent:agent}} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/agentPremiumPayment"
              activeClassName="activeClicked"
              state={{agent:agent}}
            >
              <CDBSidebarMenuItem icon="table">
                Premium Payments
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/agentcustomers" state={{agent:agent}} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">My Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/agentAppliedPolicies" activeClassName="activeClicked" state={{agent:agent}}>
              <CDBSidebarMenuItem icon="table">Appied Policies</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/agentprofile"
              activeClassName="activeClicked"
              state={{agent:agent}}
            >
              <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/agentAllPlans"
              activeClassName="activeClicked"
              state={{agent:agent}}
            >
              <CDBSidebarMenuItem icon="th-large">All Plans</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/agentCustomerPolicyHistory" state={{agent:agent}} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Policy History
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};
export default AgentSidebar;
