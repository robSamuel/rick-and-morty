import { httpClient } from '../httpClient';

export const retrieveCharacters = async (page, options = {}) => {
    const {
        name = '',
        status = '',
        species = '',
        types = '',
        gender = ''
    } = options;
    let url = `/character?page=${page}`;

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
