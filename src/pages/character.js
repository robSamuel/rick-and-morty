import React, { useState, useEffect, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { retrieveCharacterDetails } from '../services/characters';
import Container from '../components/Container';
import Layout from '../components/Layout';
import SEO from '../components/seo';

const INITIAL_VALUE = {
    id: 0,
    name: '',
    image: '',
    gender: '',
    location: 0,
    episodes: [],
    origin: {},
    species: '',
    status: '',
    type: ''
};

const Character = props => {
    const [data, setData] = useState(INITIAL_VALUE);

    useEffect(() => {
        console.log(props);
        const { location: { state }, params } = props;
        const id = state ? state.id : params.id;

        fetchData(id);
    }, []);

    const fetchData = async (id) => {
        const { results, status } = await retrieveCharacterDetails(id);

        console.log(status, results);
        if(status !== 200 && !results)
            return;

        const newData = {
            id: results.id,
            name: results.name || '',
            image: results.image || '',
            gender: results.gender || '',
            location: results.location || {},
            episodes: results.episode || [],
            origin: results.origin || {},
            species: results.species || '',
            status: results.status || '',
            type: results.type || ''
        };

        setData(newData);
    };

    const renderLine = (label, value) => {
        if(!value)
            return <Fragment />;

        return (
            <div>
                <label className="CharacterDetails-label">
                    {`${label}: `}
                </label>
                <span className="CharacterDetails-value">
                    {value}
                </span>
            </div>
        )
    };

    return (
        <Layout>
            <SEO title="Character Details" />
            <section className="CharacterDetails">
                <Container>
                        <div className="d-flex justify-content-center col-lg-7 col-xl-6 col-12 margin-auto">
                            <img
                                src={data.image}
                                alt={data.name}
                            />
                        </div>
                        <div className="col-lg-7 col-xl-6 col-12 margin-auto">
                            <div>
                                <h2 className="CharacterDetails-name">
                                    {data.name}
                                </h2>
                                <div>
                                    {renderLine('Status', data.status)}
                                    {renderLine('Gender', data.gender)}
                                    {renderLine('Species', data.species)}
                                    {renderLine('Origin', data.origin.name || '')}
                                    {renderLine('Type', data.type)}
                                </div>
                            </div>
                        </div>
                </Container>
            </section>
        </Layout>
    );
};

Character.propTypes = {

};

export default Character;
