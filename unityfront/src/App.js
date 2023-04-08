import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/home';
import Signin from './pages/user/signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './pages/user/forgotPassword';
import Signup from './pages/user/signup';
import AboutUs from './pages/user/aboutus';
import ContactUs from './pages/user/contactus';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CustomerDashBoard from './pages/customer/customerdashboard';
import CustomerPolicies from './pages/customer/customerpolicies';
import CustomerProfile from './pages/customer/customerprofile';
import CustomerAppliedPolicy from './pages/customer/customerAppliedPolicy'
import CustomerPolicyHistory from './pages/customer/customerPolicyHistory'
import AllPolicyDetails from './pages/customer/allpolicydetails';
import CustomerAllPlans from './pages/customer/customerallplans';
import CustomerPremiumPayments from './pages/customer/customerpremiumpayments';
import CustomerSummary from './pages/customer/customersummary';
import CustomerUploadDocuments from './pages/customer/customerUploadDocuments'
import CustomerAllPlansForMe from './pages/customer/customerAllPlansForMe';
import CustomerPolicyDetails from './pages/customer/customerpolicydetails';
import CustomerBuyPolicy from './pages/customer/customerBuyPolicy'
import CustomerNewPolicyDetails from './pages/customer/customernewpolicydetails';
import CustomerPayNow from './pages/customer/customerpaynow';

import AdminDashBoard from "./pages/admin/admindahsboard";
import Newapplications from "./pages/admin/newapplications";
import Admincustomers from "./pages/admin/admincustomers";
import Adminagents from "./pages/admin/adminagents";
import AdminProfile from "./pages/admin/adminprofile";
import Adminallplans from "./pages/admin/adminallplans";
import AdminNewApplicationDetails from "./pages/admin/adminNewApplicationDetails"
import Totalbusiness from "./pages/admin/totalbusiness";
import AdminAddPolicy from "./pages/admin/adminAddPolicy";
import AdminCustomerPolicies from './pages/admin/adminCustomerPolicies'
import AdminAgentsCustomers from './pages/admin/adminAgentsCustomers'
import AdminAgentCustomerPolicies from './pages/admin/adminAgentCustomerPolicies';
import AdminClaimApplications from './pages/admin/adminClaimApplications';
import AdminSurrenderApplications from './pages/admin/adminSurrenderApplications';
import AdminClaimApplicationDetails from './pages/admin/adminClaimApplicationDetails';
import AdminSurrenderApplicationDetails from './pages/admin/adminSurrenderApplicationDetails';
import AdminCustomersDetails from "./pages/admin/adminCustomersDetails";
import AdminCustomersPolicyDetails from "./pages/admin/adminCustomersPolicyDetails";
import AdminAgentsCustomersDetails from "./pages/admin/adminAgentsCustomersDetails";
import AdminAgentsCustomersPolicyDetails from "./pages/admin/adminAgentsCustomersPolicyDetails";
import AdminAgentsDetails from "./pages/admin/adminAgentsDetails";
import AdminPolicyDetails from "./pages/admin/adminPolicyDetails";

import AgentDashboard from "./pages/agent/agentDashboard";
import AgentNavbar from "./pages/agent/agentNavbar";
import AgentSidebar from "./pages/agent/agentSidebar";
import AgentCustomersDetails from "./pages/agent/agentCustomersDetails";
import Agentcustomers from './pages/agent/agentcustomers';
import AgentCustomersPolicyDetails from './pages/agent/agentCustomersPolicyDetails';
import AgentAllPlans from './pages/agent/agentAllPlans';
import AgentCustomerPolicies from './pages/agent/agentCustomersPolices';
import AgentCustomerPolicyHistory from "./pages/agent/agentCustomorPolicyHistory";
import AgentProfile from "./pages/agent/agentProfile";
import AgentPremiumPayment from "./pages/agent/agentPremiumPayments";
import AgentPremiumPaynow from "./pages/agent/agentPremiumPaynow"; 
import AgentAddCustomer from './pages/agent/agentAddCustomers';
import AgentAddCustomersProfileImageAndDocs from './pages/agent/addprofileImageAndDocs'
import AgentGetApplicablePoliciesForCustomer from './pages/agent/getApplicablePoliciesForCustomer'
import AgentPolicyViewDetailsAndApply from './pages/agent/agentPolicyViewDetailsApply'
import AgentApplyForCustomerPolicy from './pages/agent/agentApplyForCustomerPolicy'
import AgentAppliedPolicies from './pages/agent/agentAppliedPolicies';
import AgentViewPolicy from './pages/agent/agentViewPolicy';

function App() {
  
   return(
    <BrowserRouter>
  
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signin' element={<Signin />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/forgotpassword' element={<ForgotPassword />} />
    <Route path='/customerdashboard' element={<CustomerDashBoard />} />
    <Route path='/customerpolicies' element={<CustomerPolicies />} />
            <Route path='/customerprofile' element={<CustomerProfile />} />
            <Route path='/allPolicyDetails' element={<AllPolicyDetails />} />
            <Route path='/customerAllPlansForMe' element={<CustomerAllPlansForMe />} />
            <Route path='/customerUploadDocuments' element={<CustomerUploadDocuments />} />
   <Route path='/customerallplans' element={<CustomerAllPlans />} />
            
   <Route path='/customerPolicyHistory' element={<CustomerPolicyHistory />} />
    <Route path='/customerpremiumpayments' element={<CustomerPremiumPayments />} />
   <Route path='/customerpolicydetails' element={<CustomerPolicyDetails />} />
<Route path='/customerbuypolicy' element={<CustomerBuyPolicy />} />
<Route path='/customerAppliedPolicy' element={<CustomerAppliedPolicy />} />
<Route path='/customernewpolicydetails' element={<CustomerNewPolicyDetails />} />
    <Route path='/customerpaynow' element={<CustomerPayNow />} />
    <Route path='/customersummary' element={<CustomerSummary />} />
    <Route path='/aboutus' element={<AboutUs />} />
    <Route path='/contactUs' element={<ContactUs />} />

    <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route path="/newapplications" element={<Newapplications />} />
        <Route path="/admincustomers" element={<Admincustomers />}></Route>
           <Route path="/adminagents" element={<Adminagents />} />
        <Route path="/adminNewApplicationDetails" element={<AdminNewApplicationDetails />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
            <Route path="/adminallplans" element={<Adminallplans />} />
            <Route path="/adminAgentCustomerPolicies" element={<AdminAgentCustomerPolicies />} />
            <Route path="/totalbusiness" element={<Totalbusiness />} />
        <Route path="/adminAddPolicy" element={<AdminAddPolicy />} />
        <Route path="/adminCustomersDetails" element={<AdminCustomersDetails />} />
            <Route path="/adminCustomersPolicyDetails" element={<AdminCustomersPolicyDetails />} />
            <Route path="/adminClaimApplications" element={<AdminClaimApplications />} />
        <Route path="/adminSurrenderApplications" element={<AdminSurrenderApplications />} />
        <Route path="/adminClaimApplicationDetails" element={<AdminClaimApplicationDetails />} />
            <Route path="/adminSurrenderApplicationDetails" element={<AdminSurrenderApplicationDetails />} />
            <Route path="/adminCustomerPolicies" element={<AdminCustomerPolicies />} />

            <Route path="/adminAgentsCustomersDetails" element={<AdminAgentsCustomersDetails />} />
             <Route path="/adminAgentsCustomers" element={<AdminAgentsCustomers />} />
        <Route path="/adminAgentsCustomersPolicyDetails" element={<AdminAgentsCustomersPolicyDetails />} />
        <Route path="/adminAgentsDetails" element={<AdminAgentsDetails />} />
        <Route path="/adminPolicyDetails" element={<AdminPolicyDetails />} />
        <Route path="/adminAddPolicy" element={<AdminAddPolicy />} />
      

      <Route path="/agentDashboard" element={<AgentDashboard />} />
     <Route path="/agentNavbar" element={<AgentNavbar />} />
        <Route path="/agentSidebar" element={<AgentSidebar />} />
        <Route path="/agentCustomersDetails" element={<AgentCustomersDetails />} />
        <Route path="/agentcustomers" element={<Agentcustomers />} />
        <Route path="/agentCustomersPolicyDetails" element={<AgentCustomersPolicyDetails />} />
        <Route path="/agentAllPlans" element={<AgentAllPlans />} />
            <Route path="/agentCustomerPolicies" element={<AgentCustomerPolicies />} />
        <Route path="/agentCustomerPolicyHistory" element={<AgentCustomerPolicyHistory />} />
        <Route path="/agentProfile" element={<AgentProfile />} />
        <Route path="/agentPremiumPayment" element={<AgentPremiumPayment />} />
        <Route path="/agentPremiumPaynow" element={<AgentPremiumPaynow />} />
            <Route path="/agentAddCustomer" element={<AgentAddCustomer />} />
            <Route path="/agentAddCustomersProfileAndDocs" element={<AgentAddCustomersProfileImageAndDocs/>}/>
        <Route path="/agentGetApplicablePoliciesForCustomer" element={<AgentGetApplicablePoliciesForCustomer/>}/>
        <Route path="/agentPolicyViewDetailsApply" element={<AgentPolicyViewDetailsAndApply/>}/>
        <Route path="/agentApplyForCustomerPolicy" element={<AgentApplyForCustomerPolicy/>}/>
        <Route path="/agentAppliedPolicies" element={<AgentAppliedPolicies/>}/>
        <Route path="/agentViewPolicy" element={<AgentViewPolicy/>}/>
   
      </Routes>
      <ToastContainer position='top-center' autoClose={1000} />
      </BrowserRouter>
   )

}

export default App;
