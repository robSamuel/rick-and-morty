import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
    <div className="container">
        <div className="row">{children}</div>
    </div>
);

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;
