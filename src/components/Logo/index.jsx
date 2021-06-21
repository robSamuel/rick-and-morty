import React from 'react';
import { Link } from 'gatsby';
import logo from '../../assets/images/logo.png';

const Logo = () => {
    const component = !logo ? (
        <div>Picture not found</div>
    ) : (
        <Link to="/">
            <img className="Logo" src={logo} alt="Logo" />
        </Link>
    );

    return component;
};

export default Logo;
