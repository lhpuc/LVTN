import { axiosClient } from "../../helpers/axios";

export const FilterInfoOfPostApi = () => {
	const axiosClientInstance = axiosClient();
	const cityKey = "city";
	const propertyKey = "property";
	const findKey = "find";
	const FilterInfoOfPost = {
		getOptionFilter: () => {
			return axiosClientInstance.get(`/${cityKey}`);
		},
		searchPropertiesWithFilter: (dataRequest) => {
			return axiosClientInstance.post(`/${propertyKey}/${findKey}`, dataRequest);
		},
		getAllProperties: () => {
			return axiosClientInstance.get(`/${propertyKey}`);
		},
		// headers :{Authorization:`Bearer ${token}`}
		// data:data,
	};
	return FilterInfoOfPost;
};
