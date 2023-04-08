import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import config from "../config";
import { NavItem } from "react-bootstrap";
import axios from "axios";
import DefaultProfile from '../../Images/avatar.png'
const AdminSideBar = (props) => {
  let admin=props.admin;
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  const Navigate=useNavigate();
  let profileImage=`${config.SpingUrl}/admin/getProfileImage/${admin.id}`
  const [profilePhoto,setProfilePhoto]=useState(false);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
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
            Unity Life Insurance
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            
            <CDBSidebarMenuItem><img  className = "img-circle mt-5" src={profilePhoto ? `${config.SpingUrl}/admin/getProfileImage/${admin.id}`  : DefaultProfile } style={{overflow : 'auto', width:130, height:130, borderRadius:65}} /></CDBSidebarMenuItem>
           
            <br></br>
            <br></br>
            
            <NavLink exact to="/admindashboard" activeClassName="activeClicked" state={{admin:admin}}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/admincustomers" activeClassName="activeClicked" state={{admin:admin}}>
              <CDBSidebarMenuItem icon="table">My Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminagents" activeClassName="activeClicked" state={{admin:admin}}>
              <CDBSidebarMenuItem icon="table">My Agents</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/newapplications"
              activeClassName="activeClicked"
              state={{admin:admin}}
            >
              <CDBSidebarMenuItem icon="table">
                New Applications
              </CDBSidebarMenuItem>
            </NavLink>
         
            <NavLink
              exact
              to="/adminClaimApplications"
              activeClassName="activeClicked"
              state={{admin:admin}}
            >
              <CDBSidebarMenuItem icon="table">
                New Claims
              </CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink
              exact
              to="/adminSurrenderApplications"
              activeClassName="activeClicked"
              state={{admin:admin}}
            >
              <CDBSidebarMenuItem icon="table">
                New Surrenders
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/adminprofile"
              activeClassName="activeClicked"
              state={{admin:admin}}
            >

              <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/adminallplans"
              activeClassName="activeClicked"
              state={{admin:admin}}
            >
              <CDBSidebarMenuItem icon="th-large">All Plans</CDBSidebarMenuItem>
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
export default AdminSideBar;
