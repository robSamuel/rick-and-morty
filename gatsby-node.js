/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = function ({ actions }) {
    actions.createPage({
        path: 'character',
        matchPath: '/character/:id',
        component: require.resolve('./src/pages/character.jsx'),
    });
};
