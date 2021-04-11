import { httpClient } from '../httpClient';

export const retrieveEpisodes = async (page, options = {}) => {
    const {
        name = '',
        episode = 0
    } = options;
    let url = `/episode?page=${page}`;

    if(name)
        url = `${url}&name=${name}`;

    if(episode)
    url = `${url}&episode=${episode}`;

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
