import NavBar from "../../components/navbar"
import {Carousel} from 'react-bootstrap';
import Footer from "./footer";
import './user.css'
import '../../App.css'

const Home=()=>{
    return (   
      <div  className="App" > 
        <NavBar/>
        <div className="caro">
     <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../../Images/111.jpg`)}
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../../Images/222.jpg`)}
     
      alt="Second slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../../Images/333.jpg`)}
      
      alt="Third slide"
    />

  </Carousel.Item>
 
</Carousel>
</div>
<br/>
<br/>
<br/>
<br/>
<Footer/>
</div>    

        
    )
}
export default Home
