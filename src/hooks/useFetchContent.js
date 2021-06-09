import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useFetchContent = () => {
    const [imgList, setImgList] = useState([]);

///fetch first 10
    useEffect(() => {
        fetchMore(10)
    }, [])


    ///fetch searching value from input
    const fetch = useCallback(async (value) => {
        if (value) {
            try {
                const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`)
                setImgList(res.data.results)

            } catch (e) {
                console.log('error ', e)
            }
        }
    }, []);
    // TODO: Put fetchMore method here
    const fetchMore = useCallback(async (number) => {
        if (number) {
            const arr = Array.from({length: imgList.length + number}, (v, k) => k + 1)
            try {
                const res = await axios.get(`https://rickandmortyapi.com/api/character/${arr}`)
                setImgList(res.data)
            } catch (e) {
                console.log('error ', e)
            }
        }
    }, [imgList]);

    return [fetch, imgList, fetchMore];
};

