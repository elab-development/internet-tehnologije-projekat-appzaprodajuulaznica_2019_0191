import axios from "axios";

const http = axios.create({
    baseURL:`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/`,
})

export default http;