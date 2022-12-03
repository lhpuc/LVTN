import { axiosClient } from "../../helpers/axios";

export const PaymentOfPostApi = () => {
	const axiosClientInstance = axiosClient();
	const PaymentOfPost = {
		sendInfoPayment: (dataRequest) => {
			return axiosClientInstance.post(`/checkout/vnpay_return`, dataRequest);
		},
		// headers :{Authorization:`Bearer ${token}`}
		// data:data,
		getPostById: (dataRequest) => {
			return axiosClientInstance.get(`/property/find?id=${dataRequest}`);
		},
	};
	return PaymentOfPost;
};
