import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { retrieveCharacterDetails } from '../services/characters';
import { retrieveMultipleEpisodes } from '../services/episodes';
import { retrieveLocationDetail } from '../services/locations';
import { isNotEmptyArray, retrieveIdFromURL } from '../utils';
import Container from '../components/Container';
import Layout from '../components/Layout';
import List from '../components/List';
import SEO from '../components/seo';
import Spinner from '../components/Loading';

const INITIAL_VALUE = {
    id: 0,
    name: '',
    image: '',
    gender: '',
    species: '',
    status: '',
    type: '',
};

const Character = props => {
    const [data, setData] = useState(INITIAL_VALUE);
    const [episodes, setEpisodes] = useState([]);
    const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [location, setLocation] = useState({});
    const [origin, setOrigin] = useState({});
    const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
    const {
        location: { state },
        params,
    } = props;
    const id = state ? state.id : params.id;

    const fetchEpisodes = async retrievedEpisodes => {
        setIsLoadingEpisodes(true);

        if (!isNotEmptyArray(retrievedEpisodes)) {
            setIsLoadingEpisodes(false);

            return;
        }

        const list = retrievedEpisodes.map(episode =>
            retrieveIdFromURL(episode)
        );

        const { data: multipleEpisodesData, status } =
            await retrieveMultipleEpisodes(list);

        if (
            status !== 200 &&
            !isNotEmptyArray(multipleEpisodesData)
        ) {
            setEpisodes([]);
            setIsLoadingEpisodes(false);

            return;
        }

        setEpisodes(multipleEpisodesData);
        setIsLoadingEpisodes(false);
    };

    const fetchLocation = async (
        locationData,
        setInformation,
        setLoading,
        isLocationEqualToOrigin = false
    ) => {
        if (!locationData) {
            setLoading(false);
            return;
        }

        const locationId = retrieveIdFromURL(locationData.url);
        const { data: retrievedLocation, status } =
            await retrieveLocationDetail(locationId);

        if (status !== 200 && !data) {
            setLoading(false);
            // TODO: Set something as default when no data is returned
            return;
        }

        const newData = {
            id: retrievedLocation.id || 0,
            name: retrievedLocation.name || '',
            dimension: retrievedLocation.dimension || '',
            residentsCount: retrievedLocation.residents.length || 0,
            type: retrievedLocation.type || '',
        };

        setInformation(newData);
        setLoading(false);

        if (isLocationEqualToOrigin) {
            setOrigin(newData);
            setIsLoadingOrigin(false);
        }
    };

    const fetchData = async characterId => {
        setIsLoadingLocation(true);
        setIsLoadingOrigin(true);

        const { results, status } = await retrieveCharacterDetails(
            characterId
        );

        if (status !== 200 && !results) return;

        const newData = {
            id: results.id,
            name: results.name || '',
            image: results.image || '',
            gender: results.gender || '',
            species: results.species || '',
            status: results.status || '',
            type: results.type || '',
        };
        const isLocationEqualToOrigin =
            results.location.url === results.origin.url;

        setData(newData);
        fetchLocation(
            results.location,
            setLocation,
            setIsLoadingLocation,
            isLocationEqualToOrigin
        );

        fetchEpisodes(results.episode);

        if (!isLocationEqualToOrigin)
            fetchLocation(
                results.origin,
                setOrigin,
                setIsLoadingOrigin
            );
    };

    useEffect(() => {
        if (id) fetchData(id);
    }, [id]);

    const renderLine = (label, value) => {
        if (!value) return <Fragment />;

        return (
            <div>
                <label className="CharacterDetails-label">{`${label}: `}</label>
                <span className="CharacterDetails-value">
                    {value}
                </span>
            </div>
        );
    };

    const renderSpinner = () => (
        <Spinner
            className="CharacterDetails-location-spinner"
            containerClass="CharacterDetails-location-spinner-container"
            type="grow"
        />
    );

    const renderLocation = (label, info, loading) => {
        if (loading) return renderSpinner();

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

    const renderEpisodes = () => {
        if (isLoadingEpisodes) return renderSpinner();

        return (
            <List
                inheritedList={episodes}
                link="episode"
                listTitle="Episodes featuring this character"
                useList
            />
        );
    };

    return (
        <Layout>
            <SEO title="Character Details" />
            <section className="CharacterDetails">
                <Container>
                    <div className="d-flex justify-content-center col-md-6 col-sm-12 margin-auto">
                        <img src={data.image} alt={data.name} />
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
                    <div className="d-flex flex-column-sm col-sm-12 pt-3">
                        <div className="col-lg-6 CharacterDetails-empty-container" />
                        <div className="d-flex flex-column-sm px-0 col-lg-6 col-md-12">
                            <div className="CharacterDetails-location-container col-md-6 col-sm-12 margin-auto">
                                {renderLocation(
                                    'Origin',
                                    origin,
                                    isLoadingOrigin
                                )}
                            </div>
                            <div className="CharacterDetails-location-container col-md-6 col-sm-12 margin-auto">
                                {renderLocation(
                                    'Location',
                                    location,
                                    isLoadingLocation
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        {renderEpisodes()}
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

Character.defaultProps = {
    location: {},
    params: {},
};

Character.propTypes = {
    location: PropTypes.object,
    params: PropTypes.object,
};

export default Character;
