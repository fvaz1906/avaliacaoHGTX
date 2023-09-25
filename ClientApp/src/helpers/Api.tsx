import { API_URL } from './Variables';

import axios from "axios";

const Api = axios.create({
    baseURL: API_URL,
    // withCredentials: false,
    // httpsAgent: new https.Agent({ keepAlive: true })
});

Api.defaults.headers.post['Content-Type'] = 'application/json';

export default Api;