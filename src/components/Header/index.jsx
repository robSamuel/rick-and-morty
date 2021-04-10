import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'gatsby';
import Logo from '../Logo';

const MENU_ITEMS = [
    {
        link: '/',
        title: 'Home'
    },
    {
        link: '/characters',
        title: 'Characters'
    },
    {
        link: '/episodes',
        title: 'Episodes'
    },
    {
        link: '/locations',
        title: 'Locations'
    },
];

const Header = () => {
    const renderMenuItems = () => {
        return MENU_ITEMS.map(item => {
            return (
                <li
                    className="Header-item"
                    key={uuidv4()}
                >
                    <Link
                        className="Header-link"
                        to={item.link}
                    >
                        {item.title}
                    </Link>
                </li>
            );
        });
    };

    return (
        <header className="Header">
            <div className="Header-content">
                <div>
                    <Logo />
                </div>
                <ul className="Header-menu">
                    {renderMenuItems()}
                </ul>
            </div>
            <div className="Header-background" />
        </header>
    );
};

export default Header;
