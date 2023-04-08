import { NavLink, useNavigate } from "react-router-dom";
import {Navbar,Nav,NavDropdown,Form,FormControl,Button } from "react-bootstrap";
import { toast } from "react-toastify";
const AgentNavbar=(props)=>{
  let Navigate=useNavigate()
  const signout=()=>{

    sessionStorage.removeItem("token_AGENT");
    toast.success("Signed Out Successfully")
    Navigate("/");
  }
  return (
    <Navbar bg="#004E8F"  style={styles.navs} variant={"dark"} expand="lg">
    
    
    <Navbar.Brand>
      <img
        src={require(`../../Images/logo-color.png`)}
        className="logo"
        style={styles.logo}
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <NavLink to="#" style={styles.myfont}>Welcome {props.agentName}</NavLink>
        </Nav>
        <Form className="d-flex" style={{marginRight:'350px'}}>
        </Form>
        <Button onClick={signout}  style={styles.myfont}>Sign Out</Button>
      </Navbar.Collapse>
    
  </Navbar>
  )
}
export default AgentNavbar;

const styles = {
    navs: {
      color: "white",
      fontWeight: "bold",
      fontSize: 22,
      backgroundColor:"#3c008f",
      marginBottom:'5px',
      
    },
    myfont:{
      marginRight:'10px',
      color:"white",
      textDecoration: 'none',
    },
    signindropdown:{
      textDecoration:'none',color:'black',
    },
    logo:{
      width:"100px",
        height:"50px",
        margin:'none',
       borderRadius:'10px'

    }
  };