import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Loading = props => {
    const {
        className,
        children,
        color,
        containerClass,
        size,
        style,
        type
    } = props;

    return (
        <div
            className={containerClass}
            style={style}
        >
            <Spinner
                className={className}
                children={children}
                color={color}
                size={size}
                type={type}
            />
        </div>
    );
};

Loading.defaultProps = {
    children: '',
    className: '',
    color: 'info',
    containerClass: '',
    size: 'md',
    style: {},
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
    containerClass: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    style: PropTypes.object,
    type: PropTypes.oneOf(['border', 'grow'])
};

export default Loading;
