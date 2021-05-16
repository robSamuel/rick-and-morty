import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Loading = props => {
    const {
        className,
        children,
        color,
        size, 
        type
    } = props;

    return (
        <div>
            <Spinner
                className={className}
                children={children}
                color={color}
                size={size}
                type={type}
                {...props}
            />
        </div>
    );
};

Loading.defaultProps = {
    children: '',
    className: '',
    color: 'info',
    size: 'md',
    type: 'border'
};

Loading.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark']),
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    type: PropTypes.oneOf(['border', 'grow'])
};

export default Loading;
