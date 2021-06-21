import React, { useState } from 'react';
import { retrieveCharacters } from '../services/characters';
import { retrieveEpisodes } from '../services/episodes';
import { retrieveLocations } from '../services/locations';
import Layout from '../components/Layout';
import List from '../components/List';
import SEO from '../components/seo';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const IndexPage = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => () => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const fetchCharacters = async pageNumber => {
        const data = await retrieveCharacters(pageNumber);

        return data;
    };

    const fetchEpisodes = async pageNumber => {
        const data = await retrieveEpisodes(pageNumber);

        return data;
    };

    const fetchLocations = async pageNumber => {
        const data = await retrieveLocations(pageNumber);

        return data;
    };

    const getLinkClass = tab => {
        const activeClass = tab === activeTab ? 'active' : '';

        return `Home-nav-link ${activeClass}`;
    };

    return (
        <Layout>
            <SEO title="Home" />
            <section className="Home">
                <div className="container-fluid Home-container">
                    <Nav className="NavTabs" tabs>
                        <NavItem>
                            <NavLink
                                onClick={toggleTab('1')}
                                className={getLinkClass('1')}
                            >
                                Characters
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={toggleTab('2')}
                                className={getLinkClass('2')}
                            >
                                Episodes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={toggleTab('3')}
                                className={getLinkClass('3')}
                            >
                                Locations
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <List
                                link="character"
                                retrieveData={fetchCharacters}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <List link="episode" retrieveData={fetchEpisodes} />
                        </TabPane>
                        <TabPane tabId="3">
                            <List
                                link="location"
                                retrieveData={fetchLocations}
                            />
                        </TabPane>
                    </TabContent>
                </div>
            </section>
        </Layout>
    );
};

export default IndexPage;
