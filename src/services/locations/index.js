import { httpClient } from '../httpClient';

export const retrieveLocations = async (page, options = {}) => {
    const { name, type, dimension} = options;
    let url = `/location?page=${page}`;

    if(name)
        url = `${url}&name=${name}`;

    if(type)
        url = `${url}&type=${type}`;

    if(dimension)
        url = `${url}&dimension=${dimension}`;

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
