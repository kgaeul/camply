import React from "react";
import { Link } from "react-router-dom";
import general from "../../img/general.png";
import manager from "../../img/manager.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import CampNavBar from '../camp/CampNavbar';

const Register = () =>  {
  
  return (
    <section>
      <CampNavBar/>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
        </Container>
      </Container>

      <div class="container text-center">
        <div class="row row-cols-2">
          <div class="col">
            <Link to="/register/general">
              <img src={general} alt="General Register" width="500px" height="500px" />
            </Link>
          </div>
          <div class="col">
            <Link to="/register/manager">
              <img src={manager} alt="Manager Register" width="500px" height="500px" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
