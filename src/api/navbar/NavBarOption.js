import { axiosClient } from "../../helpers/axios";

export const PostInfoApi = () => {
	const axiosClientInstance = axiosClient();
	const PostInfo = {
		getUserInfo: (id) => {
			return axiosClientInstance.post(`/user/getuser?id=${id}`);
		},
		getPersonalInfo: (token) => {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return axiosClientInstance.get(`/user/getuser`, config);
		},
		// headers :{Authorization:`Bearer ${token}`}
		// data:data,
	};
	return PostInfo;
};
