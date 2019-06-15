import axios from 'axios';

// utilizando IP por conta dos testes serem feitos no dispositivo
// no emulador de android deve ser utilizado 10.0.2.2
const api = axios.create({
    baseURL: 'http://192.168.1.5:3000'
})

export default api;