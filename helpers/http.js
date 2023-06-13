import axios from 'axios';

const http = (token) => {
    const headers = {}
    if(token){
        headers.authorization = 'Bearer '+ token
    }
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://cute-lime-goldfish-toga.cyclic.app",
        headers,
    })
    return instance
}

export default http