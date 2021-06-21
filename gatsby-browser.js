/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
exports.createPages = function ({ actions }) {
    actions.createPage({
        path: 'character',
        matchPath: '/character/:id',
        component: require.resolve('./src/pages/character.jsx'),
    });
};
