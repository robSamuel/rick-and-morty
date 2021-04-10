import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Card = props => {
    const {
        id,
        image,
        link,
        title
    } = props;

    return (
        <div className="Card">
            <Link to={`/${link}/${id}`} state={{ id: id }}>
                <img
                    src={image}
                    alt=""
                    className="Card-image"
                />
                <h3 className="Card-title">{title}</h3>
            </Link>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    link: PropTypes.oneOf([
        'character',
        'episodes',
        'locations']
    ).isRequired,
    title: PropTypes.string.isRequired
};

export default Card;
