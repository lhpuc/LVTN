import { axiosClient } from "../../helpers/axios";

export const FilterInfoOfPostApi = () => {
	const axiosClientInstance = axiosClient();
	const cityKey = "city";
	const propertyKey = "property";
	const propertyTypeKey = "propertytype";
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

		getAllPropertiesType: () => {
			return axiosClientInstance.get(`/detail/${propertyTypeKey}`);
		},

		addPostBDS: (dataRequest, token) => {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return axiosClientInstance.post(`/${propertyKey}`, dataRequest, config);
		},

		// headers :{Authorization:`Bearer ${token}`}
		// data:data,
	};
	return FilterInfoOfPost;
};
