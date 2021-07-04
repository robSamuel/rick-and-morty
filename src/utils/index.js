import defaultEpisode from '../assets/images/default-episode.png';
import defaultLocation from '../assets/images/default-location.png';
import defaultThumbnail from '../assets/images/default-thumbnail.jpeg';

export const isNotEmptyArray = arr =>
    Array.isArray(arr) && !!arr.length;

export const getThumbnailUrl = (url, type) => {
    let thumbnail = null;

    if (url) return url;

    switch (type) {
        case 'character':
            thumbnail = defaultThumbnail;
            break;

        case 'episode':
            thumbnail = defaultEpisode;
            break;

        case 'location':
            thumbnail = defaultLocation;
            break;

        default:
            thumbnail = defaultThumbnail;
            break;
    }

    return thumbnail;
};

export const retrieveIdFromURL = url => {
    if (!url) return 0;

    const parts = url.split('/');
    const id = +parts[parts.length - 1];

    return id;
};

export const getRandomFeaturedIds = (maxLength, idsLength = 4) => {
    const ids = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < idsLength; index++)
        ids.push(Math.floor(Math.random() * maxLength));

    return ids;
};
