/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
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
