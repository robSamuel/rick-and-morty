/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 
 import Header from '../Header';
 import '../../assets/scss/main.scss';
 
 const Layout = ({ children }) => {
 
   return (
     <>
       <Header />
       <div
           style={{
               margin: `0 auto`,
               padding: `0 1.0875rem 1.45rem`,
           }}
       >
         <main>{children}</main>
         <footer
             style={{
                 marginTop: `2rem`,
             }}
         >
             © {new Date().getFullYear()}, Built with
             {` `}
             <a href="https://www.gatsbyjs.com">Gatsby</a>
             {` `}
             and develop by
             {` `}
             <a href="https://github.com/robSamuel">Robert Samuel</a>
         </footer>
       </div>
     </>
   )
 };
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 };
 
 export default Layout; 