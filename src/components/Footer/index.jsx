import React from 'react';
import Logo from '../Logo';

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="Footer-logo">
                <Logo />
            </div>
            <span>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a
                    className="Footer-link"
                    href="https://www.gatsbyjs.com"
                >
                    Gatsby
                </a>
                    {` `}
                    and developed by
                    {` `}
                <a
                    className="Footer-link"
                    href="https://github.com/robSamuel"
                >
                    Robert Samuel
                </a>
            </span>
        </footer>
    );
};

export default Footer;
