import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rocketseat-node.herokuapp.com/api'
    //ou minha API feita local http://endereco:3000/api
});

export default api;