import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

const Header = () => {
    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={logo} alt="InstaRocket" />
                </Link>
                <Link to="/new">
                    <img src={camera} alt="Enviar Publicação" />
                </Link>                
            </div>
        </header>
    )
}

export default Header;
