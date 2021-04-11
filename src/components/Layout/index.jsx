/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 
 import Header from '../Header';
 import Footer from '../Footer';
 import '../../assets/scss/main.scss';
 
 const Layout = ({ children }) => {
 
    return (
        <>
            <Header />
            <div>
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
 };
 
 Layout.propTypes = {
    children: PropTypes.node.isRequired,
 };
 
 export default Layout; 
