import axios from 'axios';

const URL = "https://randomuser.me/api/?results=100&nat=us"

const API = {
    search: function() {
        return axios.get(URL);
    }
};

export default API;