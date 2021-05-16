import React, { useState, useEffect, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { retrieveCharacterDetails } from '../services/characters';
import { retrieveLocationDetail } from '../services/locations';
import { retrieveIdFromURL } from '../utils';
import Container from '../components/Container';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Spinner from '../components/Loading';

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
    const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
    const [location, setLocation] = useState({});
    const { location: { state }, params } = props;
    const id = state ? state.id : params.id;
    console.log(props);

    useEffect(() => {
        if(id)
            fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        setIsLoadingOrigin(true);

        const { results, status } = await retrieveCharacterDetails(id);

        console.log(status, results);
        if(status !== 200 && !results)
            return;

        const newData = {
            id: results.id,
            name: results.name || '',
            image: results.image || '',
            gender: results.gender || '',
            episodes: results.episode || [], //it needs to call an endpoint or show the list only
            origin: results.origin || {}, //it needs to call an endpoint
            species: results.species || '',
            status: results.status || '',
            type: results.type || ''
        };

        setData(newData);
        fetchLocation(results.location);
    };

    const fetchLocation = async (location) => {
        if(!location) {
            setIsLoadingOrigin(false);
            return;
        }

        const id = retrieveIdFromURL(location.url);
        const { data, status } = await retrieveLocationDetail(id);

        if(status !== 200 && !data){
            setIsLoadingOrigin(false);

            return; //TODO: Set something as default when no data is returned
        }
        
        const newData = {
            id: data.id || 0,
            name: data.name || '',
            dimension: data.dimension || '',
            residentsCount: data.residents.length || 0,
            type: data.type || ''
        };

        setLocation(newData);
        setIsLoadingOrigin(false);
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

    const renderLocation = () => {
        if(isLoadingOrigin)
            return (
                <Spinner
                    className="CharacterDetails-location-spinner"
                    containerClass="CharacterDetails-location-spinner-container"
                    type="grow"
                />
            );

        return (
            <Fragment>
                <h3>Location</h3>
                {renderLine('Name', location.name)}
                {renderLine('Dimension', location.dimension)}
                {renderLine('Residents', location.residentsCount)}
                {renderLine('Type', location.type)}
            </Fragment>
        );
    };

    return (
        <Layout>
            <SEO title="Character Details" />
            <section className="CharacterDetails">
                <Container>
                        <div className="d-flex justify-content-center col-md-6 col-sm-12 margin-auto">
                            <img
                                src={data.image}
                                alt={data.name || ''}
                            />
                        </div>
                        <div className="CharacterDetails-info col-md-6 col-sm-12 margin-auto">
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
                        <div className="CharacterDetails-location-container col-sm-12 margin-auto">
                            {renderLocation()}
                        </div>
                </Container>
            </section>
        </Layout>
    );
};

Character.propTypes = {

};

export default Character;
