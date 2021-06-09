import Header from "./Header";
import ContentList from "./ContentList";
import {useFetchContent} from "../hooks/useFetchContent";
import "./App.css";

import Button from "./Button";
import {useMemo, useState} from "react";
///sorting function
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&

            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};
const App = () => {
    const [fetch, content, fetchMore] = useFetchContent();
    ///sorting hook
    const {items, requestSort, sortConfig} = useSortableData(content);
    //sorting styles function for button
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (

        <div className="App">

            <Header onSearch={fetch}/>
            Filter content by:
            <Button className={getClassNamesFor('name')} onClick={() => {
                requestSort('name')
            }}>name</Button>
            <Button className={getClassNamesFor('gender')} onClick={() => {
                requestSort('gender')
            }}>gender</Button>
            <Button className={getClassNamesFor('id')} onClick={() => {
                requestSort('id')
            }}>id</Button>

            <h1>Simple content list</h1>
            <ContentList content={items}/>
            <Button onClick={() => {
                fetchMore(10)
            }}>Fetch more</Button>
        </div>
    );
};

export default App;
