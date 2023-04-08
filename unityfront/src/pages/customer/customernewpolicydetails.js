import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
const CustomerNewPolicyDetails =()=>{
    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar />
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <CustomerNavBar/>
        <h1 >Policy Features:</h1>
        <button  style={{width:'150px',backgroundColor:'#FFCB08',borderRadius:'10px',color:'black',fontWeight:'bold',marginLeft:'88%'}} >Save Pdf</button>
        <center>
             <h1>Jeevan Labh</h1>
             <br />

        <table className='table'  style={{width:'60%',border:'2px',borderBlockStyle:'solid'}}>
 
       
 
  <tbody style={styles.myfont}>
    <tr>
      <td><h4>Name</h4></td>
      <td><h4>Policy Name</h4></td>
    </tr>
    <tr>
      <td>Maturity</td>
      <td>1,00,000 Rs to 5,00,000 Rs</td>
    </tr>
    <tr>
    <td>Min Age</td>
      <td>25</td>
    </tr>
    <tr>
    <td>Max Age</td>
      <td>50</td>
    </tr>
    <tr>
    <td>Age at Maturity</td>
      <td>65</td>
    </tr>
    <tr>
    <td>Premium Nos</td>
      <td>180</td>
    </tr>
    <tr>
    <td>Premium </td>
      <td>1000 Rs to 5000 Rs</td>
    </tr>
    </tbody>
    
</table>
<button className='btn btn-success mt-3' style={{width:'350px',borderRadius:'15px'}}>Apply</button>
        </center>

        </div>
        </div>
    )
}
export default CustomerNewPolicyDetails
const styles={
    myfont: {
       
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
}