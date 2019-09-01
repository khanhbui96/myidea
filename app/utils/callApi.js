import axios from 'axios';

const callApi = (method, endpoint, data)=>{
    return axios({
        method,
        data,
        url: `https://taichinhd25.herokuapp.com/api${endpoint}`
    }
    )
};

export default callApi