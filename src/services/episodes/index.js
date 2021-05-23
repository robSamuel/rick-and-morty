import { httpClient } from '../httpClient';

const url = '/episode';

export const retrieveEpisodes = async (page, options = {}) => {
    const {
        name = '',
        episode = 0
    } = options;
    let urlEndpoint = `${url}?page=${page}`;

    if(name)
        urlEndpoint = `${urlEndpoint}&name=${name}`;

    if(episode)
    urlEndpoint = `${urlEndpoint}&episode=${episode}`;

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url: urlEndpoint,
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

export const retrieveMultipleEpisodes = async (episodesList) => {
    const urlEndpoint = `${url}/${episodesList.join()}`;
    console.log(urlEndpoint);

    try {
        const { data, status } = await httpClient({
            method: 'GET',
            url: urlEndpoint
        });

        console.log(`data`, data)
        return {
            data,
            status
        };
    } catch (error) {
        console.log(error);
        return { error };
    }
};
