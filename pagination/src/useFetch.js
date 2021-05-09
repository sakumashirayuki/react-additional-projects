import { useState, useEffect } from "react"
import axios from "axios";

import paginate from "./utils";

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

export const useFetch = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getProducts = async () => {
        const response = await axios.get(url);
        const getData = response.data;
        console.log("newFollowers", paginate(getData));
        setData(paginate(getData));
        setLoading(false);
    }
    useEffect(()=>{
        getProducts();
    }, []);
    return { loading, data }
}