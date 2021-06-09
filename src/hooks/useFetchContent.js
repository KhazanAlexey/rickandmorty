import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useFetchContent = () => {
    const [imgList, setImgList] = useState([]);
    useEffect(async () => {
        try {
            const res = await axios.get('https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9,10]')
            setImgList(res.data)
        } catch (e) {
            console.log('error ', e)
        }
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

