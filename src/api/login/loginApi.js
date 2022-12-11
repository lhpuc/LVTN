import { axiosClient } from "../../helpers/axios";

export const accountApi = () => {
	const axiosClientInstance = axiosClient();
	const userKey = "/user";
	const logInKey = "login";
	const manageAccountApi = {
		registerUser: (dataRequest) => {
			return axiosClientInstance.post(`${userKey}`, dataRequest);
		},
		logInUser: (dataRequest) => {
			return axiosClientInstance.post(`${userKey}/${logInKey}`, dataRequest);
		},
		getForgetPassword: (dataRequest) => {
			return axiosClientInstance.post(`user/forgetpassword`, dataRequest);
		},
	};

	return manageAccountApi;
};
