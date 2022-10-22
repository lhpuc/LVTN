import axiosClient from "../../helpers/axios"

export const loginAPI = {
    logInUser: (dataRequest) =>{
        return axiosClient.post('/user',dataRequest);
    },
    registerUser: (dataRequest) =>{
        return axiosClient.post('/user',dataRequest);
    }

}