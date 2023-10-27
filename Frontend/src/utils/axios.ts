import axios from "axios";
import { toast } from "react-toastify";

const instanceAxios = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    }
})
export default instanceAxios


// Add a request interceptor
instanceAxios.interceptors.request.use(function (config) {

    const token =  JSON.parse(localStorage.getItem("user") as string)
    

if(config.headers ) {
    config.headers.Authorization = `Bearer ${token.accessToken}`
}


console.log(config);

    
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    toast.error(error.response.data.message)
    return Promise.reject(error);
  });