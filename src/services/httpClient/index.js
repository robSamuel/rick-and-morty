import axios from 'axios';

export const httpClient = ({ method, url, params }) => {
    return axios({
        method: method || 'GET',
        baseURL: `${process.env.GATSBY_API_URL}`,
        url: url || '',
        params: { ...params },
    });
};
