import { convertLegacyProps } from "antd/lib/button/button";
import axios from "axios";
import queryString from "query-string";

export const axiosClient = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_BACKEND_URL,
		headers: {
			"Content-Type": "application/json",
		},
		paramsSerializer: {
			serialize: (params) => {
				return queryString.stringify(params);
			},
		},
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	return axiosInstance;
};
