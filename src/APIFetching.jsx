import { useState, useEffect } from "react";
import axios from "axios";
function APIFetching(url) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    // useEffect will run when the url will change.
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setLoading(false);
                setData(res.data);
            })
            .catch(err => {
                setError(err)
            });
    }, [url]);

    return [loading, data, error];
}
export default APIFetching;
