import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
const CustomerSummary=()=>{
    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <CustomerNavBar />
        <div class="d-flex">
  <div class="p-2 ">Flex item</div>
  <div class="p-2">Flex item</div>
  <div class="p-2">Third flex item</div>
</div>


        </div>
        </div>
    )
}
export default CustomerSummary