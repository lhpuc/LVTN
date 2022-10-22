import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

console.log(baseURL,'BaseUrl');
let headers = {
    "Content-Type" : "application/json",
};
if(localStorage.token){
    headers.Authorization = ``;
}
const axiosClient = axios.create({
    baseURL,
    headers,
});

export default axiosClient;