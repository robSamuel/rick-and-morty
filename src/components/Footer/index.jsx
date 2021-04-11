import React from 'react'; 
import Logo from '../Logo';
import FooterImg from '../../assets/images/footer-logo.png';

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12 col-md-6">
                        <div className="Footer-column  d-flex h-100">
                            <img
                                className="Footer-logo"
                                src={FooterImg}
                                alt="Footer Logo"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="Footer-column  d-flex h-100">
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
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
