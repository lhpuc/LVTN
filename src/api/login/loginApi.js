import { axiosClient } from "../../helpers/axios";

export const accountApi = () => {
	const axiosClientInstance = axiosClient();
	const userKey = "/user";
	const manageAccountApi = {
		registerUser: (dataRequest) => {
			console.log("vgrevbgre");
			return axiosClientInstance.post(`${userKey}`, dataRequest);
		},
	};

	return manageAccountApi;
};
