import React, { useState, useEffect, Fragment } from 'react';
import {
    retrieveCharacters,
    retrieveMultipleCharacters
} from '../services/characters';
import { isNotEmptyArray } from '../utils';
import Card from '../components/Card';
import Layout from '../components/Layout';
import List from '../components/List';
import SEO from '../components/seo';

const Characters = () => {
    const [featuredCharacters, setFeaturedCharacters] = useState([]);

    useEffect(() => {
        const ids = [];

        for (let index = 0; index < 4; index++) {
            ids.push(Math.floor(Math.random() * process.env.GATSBY_MAX_CHARACTERS_LENGTH));
        }

        fetchFeaturedCharacters(ids);
    }, []);

    const fetchData = async (pageNumber) => {
        const data = await retrieveCharacters(pageNumber);

        return data;
    };

    const fetchFeaturedCharacters = async (ids) => {
        const { results, status } = await retrieveMultipleCharacters(ids);

        if(status !== 200 && !isNotEmptyArray(results))
            return;

        setFeaturedCharacters(results);
    };

    const renderFeaturedCharacters = () => {
        if(!isNotEmptyArray(featuredCharacters))
            return <Fragment />;

        return featuredCharacters.map(character => {
            return (
                <Card
                    key={`character-${character.id}`}
                    id={character.id}
                    image={character.image}
                    link="character"
                    title={character.name}
                />
            );
        });
    };

    return (
        <Layout>
            <SEO title="Characters List" />
            <section className="Characters">
                <div className="container-fluid FeaturedCharacters">
                    <span className="FeaturedCharacters-title">
                        Featured Characters:
                    </span>
                    <div className="FeaturedCharacters-list">
                        {renderFeaturedCharacters()}
                    </div>
                </div>
                <div className="container-fluid Characters-list">
                    <List
                        link="character"
                        retrieveData={fetchData}
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Characters;
