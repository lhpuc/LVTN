import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { PaymentOfPostApi } from "../../api/payment/PaymentApi";
import { PostInfoApi } from "../../api/navbar/NavBarOption";
import { Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { successPayment, failPayment } from "../../models/images";
import CircularProgress from "@mui/material/CircularProgress";
const CheckOutResult = () => {
	const paymentPostService = PaymentOfPostApi();
	const location = useLocation();

	const params = queryString.parse(location.search);
	const [statusHandle, setStatusHandle] = useState(false);
	const [loading, setLoading] = useState(false);
	const [propertyId, setPropertyId] = useState("");
	useEffect(() => {
		setLoading(true);
		const dataRequest = {
			...params,
		};

		paymentPostService
			.sendInfoPayment(dataRequest)
			.then((data) => {
				if (data.data) {
					setStatusHandle(data.data.signed);
					if (data.data.signed) {
						setPropertyId(data.data.code);
						setLoading(false);
					} else {
						setStatusHandle(false);
						setLoading(false);
					}
				} else {
					setStatusHandle(false);
					setLoading(false);
				}
			})
			.catch(() => {
				setStatusHandle(false);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{loading ? (
				<>
					<div style={{ padding: 50, textAlign: "center", backgroundColor: "#FFF" }}>
						<CircularProgress color="secondary" />
					</div>
				</>
			) : (
				<>
					{statusHandle ? (
						<Grid
							container
							spacing={4}
							style={{ backgroundColor: "white", alignItems: "center", padding: 50 }}
						>
							<Grid item xs={7} style={{ padding: 50 }}>
								<img src={successPayment} />
							</Grid>
							<Grid item xs={5}>
								<CheckCircleOutlineIcon color="success" sx={{ fontSize: "100px" }} />
								<p style={{ fontSize: 40, fontFamily: "SPM title bold", margin: 0, color: "#318d48" }}>
									Giao dịch thành công
								</p>

								<Button
									onClick={() => {
										window.location = `/property/${propertyId}`;
									}}
									variant="outlined"
								>
									Hoàn thành giao dịch
								</Button>
							</Grid>
						</Grid>
					) : (
						<Grid
							container
							spacing={4}
							style={{ backgroundColor: "white", alignItems: "center", padding: 50 }}
						>
							<Grid item xs={7} style={{ padding: 50 }}>
								<img src={failPayment} />
							</Grid>
							<Grid item xs={5}>
								<ErrorOutlineIcon color="error" sx={{ fontSize: "100px" }} />
								<p style={{ fontSize: 40, fontFamily: "SPM title bold", margin: 0, color: "#7e203f" }}>
									Có lỗi xảy ra
								</p>

								<Button href="/post" color="secondary" variant="outlined">
									Quay lại
								</Button>
							</Grid>
						</Grid>
					)}
				</>
			)}
		</>
	);
};
export default CheckOutResult;
