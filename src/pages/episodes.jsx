import React, { useState, useEffect, Fragment } from 'react';
import {
    retrieveEpisodes,
    retrieveMultipleEpisodes,
} from '../services/episodes';
import { getRandomFeaturedIds, isNotEmptyArray } from '../utils';
import Card from '../components/Card';
import Layout from '../components/Layout';
import List from '../components/List';
import SEO from '../components/seo';

const Episodes = () => {
    const [featuredEpisodes, setFeaturedEpisodes] = useState([]);

    const fetchData = async pageNumber => {
        const data = await retrieveEpisodes(pageNumber);

        return data;
    };

    const fetchFeaturedEpisodes = async ids => {
        const { data, status } = await retrieveMultipleEpisodes(ids);

        if (status !== 200 && !isNotEmptyArray(data)) return;

        setFeaturedEpisodes(data);
    };

    useEffect(() => {
        const ids = getRandomFeaturedIds(
            process.env.GATSBY_MAX_EPISODES_LENGTH
        );

        fetchFeaturedEpisodes(ids);
    }, []);

    const renderFeaturedEpisodes = () => {
        if (!isNotEmptyArray(featuredEpisodes)) return <Fragment />;

        return featuredEpisodes.map(episode => {
            return (
                <Card
                    key={`episode-${episode.id}`}
                    id={episode.id}
                    image=""
                    link="episode"
                    title={episode.name}
                />
            );
        });
    };

    return (
        <Layout>
            <SEO title="Episodes List" />
            <section>
                <div className="container-fluid FeaturedEpisodes">
                    <span className="list-title">
                        Featured Episodes:
                    </span>
                    <div className="FeaturedEpisodes-list">
                        {renderFeaturedEpisodes()}
                    </div>
                </div>
                <div className="m-top-50">
                    <List link="episode" retrieveData={fetchData} />
                </div>
            </section>
        </Layout>
    );
};

export default Episodes;
