import axios from "axios";

const fetchTSVData = () => {
    const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgI8w-NWdzdJwVdNktWKLol5ZMuYGJjcy4UqyGDB59l6Ua4lWUPXq5dLCiSFc8ub7n9o93MPQhgRsq/pub?output=tsv";

    return new Promise((resolve, reject) => {
        axios
            .get(csvUrl)
            .then((response) => {
                // Resolve the promise with the response data
                resolve(response.data);
            })
            .catch((error) => {
                // Reject the promise with the error
                console.error("Error fetching CSV data:", error);
                reject(error);
            });
    });
};

export { fetchTSVData }
