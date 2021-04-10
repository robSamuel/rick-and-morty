import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

const Logo = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "logo.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);
    const component = !data?.placeholderImage?.childImageSharp?.fluid
        ? <div>Picture not found</div>
        : (
            <Link to="/">
                <Img
                    className="Logo"
                    fluid={data.placeholderImage.childImageSharp.fluid}
                />
            </Link>
        );

    return component;
};

export default Logo;
