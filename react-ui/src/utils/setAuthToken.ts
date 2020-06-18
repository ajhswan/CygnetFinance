import axios from 'axios';

const setAuthToken = (token: unknown) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
};

export default setAuthToken

