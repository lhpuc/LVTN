import { axiosClient } from "../../helpers/axios";

export const PostInfoApi = () => {
	const axiosClientInstance = axiosClient();
	const PostInfo = {
		getPostInfoById: (id) => {
			return axiosClientInstance.get(`/propertype/find?id=${id}`);
		},
		// headers :{Authorization:`Bearer ${token}`}
		// data:data,
	};
	return PostInfo;
};
