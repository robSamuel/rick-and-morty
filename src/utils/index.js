import defaultEpisode from '../assets/images/default-episode.png';
import defaultLocation from '../assets/images/default-location.png';
import defaultThumbnail from '../assets/images/default-thumbnail.jpeg';

export const isNotEmptyArray = arr =>
    Array.isArray(arr) && !!arr.length;

export const getThumbnailUrl = (url, type) => {
    let thumbnail = null;

    if(url)
        return url;

    switch(type) {
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
    if(!url)
        return 0;

    const parts = url.split('/');
    const id = +parts[parts.length -1];

    return id;
};
