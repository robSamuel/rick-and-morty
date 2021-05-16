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
    episodes: [],
    species: '',
    status: '',
    type: ''
};

const Character = props => {
    const [data, setData] = useState(INITIAL_VALUE);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [location, setLocation] = useState({});
    const [origin, setOrigin] = useState({});
    const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
    const { location: { state }, params } = props;
    const id = state ? state.id : params.id;
    console.log(data);

    useEffect(() => {
        if(id)
            fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        setIsLoadingLocation(true);
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
            species: results.species || '',
            status: results.status || '',
            type: results.type || ''
        };
        const isLocationEqualToOrigin = results.location.url === results.origin.url;

        setData(newData);
        fetchLocation(
            results.location,
            setLocation, 
            setIsLoadingLocation,
            isLocationEqualToOrigin
        );

        if(!isLocationEqualToOrigin)
            fetchLocation(results.origin, setOrigin, setIsLoadingOrigin);
    };

    const fetchLocation = async (
        location,
        setInformation,
        setLoading,
        isLocationEqualToOrigin = false
    ) => {
        if(!location) {
            setLoading(false);
            return;
        }

        const id = retrieveIdFromURL(location.url);
        const { data, status } = await retrieveLocationDetail(id);

        if(status !== 200 && !data){
            setLoading(false);

            return; //TODO: Set something as default when no data is returned
        }
        
        const newData = {
            id: data.id || 0,
            name: data.name || '',
            dimension: data.dimension || '',
            residentsCount: data.residents.length || 0,
            type: data.type || ''
        };

        setInformation(newData);
        setLoading(false);

        if(isLocationEqualToOrigin) {
            console.log('are the same');
            setOrigin(newData);
            setIsLoadingOrigin(false);
        }
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

    const renderLocation = (label, info, loading) => {
        if(loading)
            return (
                <Spinner
                    className="CharacterDetails-location-spinner"
                    containerClass="CharacterDetails-location-spinner-container"
                    type="grow"
                />
            );

        return (
            <Fragment>
                <h3>{label}</h3>
                <div>
                    {renderLine('Name', info.name)}
                    {renderLine('Dimension', info.dimension)}
                    {renderLine('Residents', info.residentsCount)}
                    {renderLine('Type', info.type)}
                </div>
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
                                alt={data.name}
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
                                    {renderLine('Type', data.type)}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column-sm col-sm-12">
                            <div className="col-md-6 col-sm-12" />
                            <div className="d-flex flex-column-sm px-0 col-md-6 col-sm-12">
                                <div className="CharacterDetails-location-container col-md-6 col-sm-12 margin-auto">
                                    {renderLocation('Origin', origin, isLoadingOrigin)}
                                </div>
                                <div className="CharacterDetails-location-container col-md-6 col-sm-12 margin-auto">
                                    {renderLocation('Location', location, isLoadingLocation)}
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
