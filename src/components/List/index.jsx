import React, { useState , useEffect, Fragment} from 'react';
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
    const {
        inheritedList,
        link,
        listTitle,
        retrieveData,
        useList
    } = props;

    useEffect(() => {
        if(!useList){
            fetchData();
        } else {
            setList(inheritedList);
            setHasMore(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inheritedList]);

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

    const renderTitle = () => {
        if(!listTitle)
            return <Fragment />;

        return (
            <label className="List-title">
                {`${listTitle}:`}
            </label>
        )
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

    const renderInfiniteScroll = () => {
        const containerId = `ScrollContainer-${link}`;

        return (
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
                >
                    {renderList()}
                </InfiniteScroll>
            </div>
        );
    };

    const renderGeneralList = () => {
        return (
            <div className="List">
                {renderInfiniteScroll()}
            </div>
        );
    };

    const renderTitledList = () => {
        return (
            <div className="List List-title-container">
                {renderTitle()}
                {renderInfiniteScroll()}
            </div>
        );
    };

    return !listTitle
        ? renderGeneralList()
        : renderTitledList();
};

List.defaultProps = {
    inheritedList: [],
    listTitle: '',
    retrieveData: () => {},
    useList: false
};

List.propTypes = {
    inheritedList: PropTypes.array,
    link: PropTypes.oneOf([
        'character',
        'episode',
        'location']
    ).isRequired,
    listTitle: PropTypes.string,
    retrieveData: PropTypes.func,
    useList: PropTypes.bool
};

export default List;
