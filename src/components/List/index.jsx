import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import { isNotEmptyArray } from '../../utils';
import Card from '../Card';
import InfiniteScroll from 'react-infinite-scroll-component';

const initPagination = {
    count: 0,
    pages: 0
};

const List = props => {
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState([]);
    const [pagination, setPagination] = useState(initPagination);
    const { link, retrieveData } = props;
    const containerId = `ScrollContainer-${link}`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const newPage = pagination.pages + 1;
        const {
            pagination: paginationData,
            results,
            status
        } = await retrieveData(newPage);

        if(status === 200 && isNotEmptyArray(results)) {
            const willHaveMore =
                list.length <= paginationData.count
                && newPage <= paginationData.pages;

            setList(prevList => {
                return [...prevList, ...results];
            });

            setPagination(prevPagination => {
                return {
                    count: prevPagination.count + 1,
                    pages: newPage
                };
            });

            setHasMore(willHaveMore);
        }
    };

    const renderList = () => {
        if(isNotEmptyArray(list)) {
            return list.map(item => {
                const label = item.name || '';

                return (
                    <Card
                        key={`${link}-${item.id}`}
                        id={item.id}
                        image={item.image}
                        link={link}
                        title={label}
                    />
                )
            });
        }

        return (
            <span className="List-no-items">
                There are no items available.
            </span>
        );
    };

    return (
        <div className="List">
            <div
                className="List-container"
                id={containerId}
            >
                <InfiniteScroll
                    className="List-scrollable"
                    dataLength={list.length}
                    hasMore={hasMore}
                    next={fetchData}
                    scrollableTarget={containerId}
                    scrollThreshold={1}
                    loader={
                        <h3>Loading...</h3>
                    }
                >
                    {renderList()}
                </InfiniteScroll>
            </div>
        </div>
    );
};

List.propTypes = {
    link: PropTypes.oneOf([
        'character',
        'episodes',
        'location']
    ).isRequired,
    retrieveData: PropTypes.func.isRequired
};

export default List;
