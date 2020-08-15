import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//importação de images
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from  '../../assets/images/icons/study.svg';

//importação dos componentes usados na página
import giveClassesIcon from  '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from  '../../assets/images/icons/purple-heart.svg';

// improtação do CSS
import './styles.css';

// importa acesso ao axios - acesso a api do banco
import api from '../../services/api';

function Landing() {

  //const que é utilizada para receber-setar o total de conexões realizadas
  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    api.get('connections').then( response =>{
      const {total} = response.data;

      setTotalConnection(total);
    })
  }, []);


  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div className="logo-container">
          <img src={logoImg} alt="Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img 
          src={landingImg} 
          alt="Plataforma de estudos" 
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnection} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>
    </div>
  )
  
};

export default Landing;