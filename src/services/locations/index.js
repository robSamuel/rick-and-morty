import { httpClient } from '../httpClient';

const url = '/location/';

export const retrieveLocations = async (page, options = {}) => {
    const { name, type, dimension} = options;
    let endpointURL = `${url}?page=${page}`;

    if(name)
        endpointURL = `${endpointURL}&name=${name}`;

    if(type)
        endpointURL = `${endpointURL}&type=${type}`;

    if(dimension)
        endpointURL = `${endpointURL}&dimension=${dimension}`;

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url: endpointURL,
        });

        return {
            pagination: data.info,
            results: data.results,
            status
        };
    } catch (error) {
        return { error };
    }
};

export const retrieveLocationDetail = async (id) => {
    const endpointURL = `${url}${id}`;

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url: endpointURL
        });

        return { data, status };
    } catch (error) {
        return { error };
    }
}
