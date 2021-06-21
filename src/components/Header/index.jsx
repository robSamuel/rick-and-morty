import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'gatsby';
import Logo from '../Logo';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
} from 'reactstrap';

const MENU_ITEMS = [
    {
        link: '/',
        title: 'Home',
    },
    {
        link: '/characters',
        title: 'Characters',
    },
    {
        link: '/episodes',
        title: 'Episodes',
    },
    {
        link: '/locations',
        title: 'Locations',
    },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuContainer = useRef(null);

    const clickListener = useCallback(
        e => {
            if (
                isOpen &&
                menuContainer.current &&
                !menuContainer.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        },
        [menuContainer, isOpen]
    );

    useEffect(() => {
        if (document) document.addEventListener('click', clickListener);

        return () => {
            if (document) document.removeEventListener('click', clickListener);
        };
    }, [menuContainer, isOpen, clickListener]);

    const toggle = () => {
        setIsOpen(prevIsOpen => {
            return !prevIsOpen;
        });
    };

    const renderMenuItems = () => {
        return MENU_ITEMS.map(item => {
            return (
                <NavItem className="Header-item" key={uuidv4()}>
                    <Link className="Header-link" to={item.link}>
                        {item.title}
                    </Link>
                </NavItem>
            );
        });
    };

    return (
        <header className="Header">
            <div className="container" ref={menuContainer}>
                <Navbar dark expand="lg">
                    <NavbarBrand>
                        <Logo />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2" />
                    <Collapse
                        className="justify-content-end"
                        isOpen={isOpen}
                        navbar
                    >
                        <Nav navbar>{renderMenuItems()}</Nav>
                    </Collapse>
                </Navbar>

                <div className="Header-background" />
            </div>
        </header>
    );
};

export default Header;
