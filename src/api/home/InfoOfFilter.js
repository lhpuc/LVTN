import axiosClient from "../../helpers/axios";
const cityKey = "city";
const propertyKey = "property";
const propertiesKey = "properties";
const findKey = "find";
export const FilterInfoOfPost = {
	getOptionFilter: () => {
		return axiosClient.get(`/${cityKey}`);
	},
	searchPropertiesWithFilter: (dataRequest) => {
		return axiosClient.post(`/${propertyKey}/${findKey}`, dataRequest);
	},
    getAllProperties: () => {
		return axiosClient.get(`/${propertyKey}`);
	},
};
