import { httpClient } from '../httpClient';

const endpointURL = '/character';

export const retrieveCharacters = async (page, options = {}) => {
    const {
        name = '',
        status = '',
        species = '',
        types = '',
        gender = ''
    } = options;
    let url = `${endpointURL}?page=${page}`;

    if(name)
        url = `${url}&name=${name}`;

    if(status)
        url = `${url}&status=${status}`;

    if(species)
        url = `${url}&species=${species}`;

    if(types)
        url = `${url}&types=${types}`;

    if(gender)
        url = `${url}&gender=${gender}`;

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url,
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

export const retrieveMultipleCharacters = async (ids) => {
    const url = `${endpointURL}/${ids.join()}`

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url,
        });

        return {
            results: data,
            status
        };
    } catch (error) {
        return { error };
    }
};
