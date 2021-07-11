/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;
    const characterPage = path.resolve('./src/pages/character.jsx');

    createPage({
        path: '/character',
        matchPath: '/character/:id',
        component: characterPage,
    });
};
