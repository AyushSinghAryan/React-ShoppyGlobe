import { useEffect, useState } from "react";
// this is custom hook which fetch the data from an API and give the output based on condition , error something went wrong , loading if API taking some time 
function useFetchProductList(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url])
    return { data, loading, error };
}
export default useFetchProductList;