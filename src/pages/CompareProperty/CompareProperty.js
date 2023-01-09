import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { Typography, Spin, Rate } from "antd";
import { SearchFilterPostContext } from "../../context/searchFilterContext";

import { noImage } from "../../models/images";
import { TextField, Grid, Button, autocompleteClasses } from "@mui/material";
import axios from "axios";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const CompareProperty = () => {
	const { comparePropertyItem, setPropertyCompareItem } = useContext(SearchFilterPostContext);
	const FilterInfoOfPostService = FilterInfoOfPostApi();
	const [isSpin, SetIsSpin] = useState(false);

	const settings = {
		dots: false,
		infinite: false,
		autoplay: true,
		speed: 500,
		arrow: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
	};
	const [arrCompare, setArrCompare] = useState([]);
	const [arrProperty, setArrProperty] = useState([]);

	useEffect(() => {
		SetIsSpin(true);
		const propertiesCompare = comparePropertyItem.map((item) => item._id);

		if (propertiesCompare.length > 0) {
			const dataRequest = {
				idList: propertiesCompare,
			};

			FilterInfoOfPostService.geArrayOfProperties(dataRequest).then((value) => {
				const data = value.data;
				if (data.success) {
					setArrProperty(data.propertyList);
				}
				SetIsSpin(false);
			});
		} else {
			setArrProperty([]);
			SetIsSpin(false);
		}
	}, [comparePropertyItem]);
	const navigate = useNavigate();
	return (
		<>
			<Spin spinning={isSpin} tip="Đợi xíu nhé...">
				<Grid
					spacing={2}
					style={{ margin: "auto", padding: 30, backgroundColor: "#ccc", textAlign: "center" }}
				>
					<Grid style={{ backgroundColor: "#fff", borderRadius: 10, padding: 50 }}>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Bài Đăng
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									<div>
										{item.img.length < 1 ? (
											<div>
												<img style={{ height: 250, width: "auto", margin: "auto" }} src={noImage} />
											</div>
										) : (
											<Slider {...settings}>
												{item.img.map((image) => (
													<div>
														<img src={image} style={{ height: 250, width: "auto", margin: "auto" }} />
													</div>
												))}
											</Slider>
										)}
									</div>
								</Grid>
							))}
						</Grid>

						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Tiêu đề
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.title}
								</Grid>
							))}
						</Grid>

						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Giá
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3} style={{ fontWeight: "bold", color: "red" }}>
									{item.isNegotiate ? "Thương lượng" : <>{moneyFormat(item.price)} VND</>}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Đánh giá
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									<Rate disabled allowHalf value={item.rating} />
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Diện tích
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.area}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Số phòng ngủ
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.nOfBedroom}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Sô phòng tắm, nhà vệ sinh
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.nOfBathRoom}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Số tầng
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.nOfFloor}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Vị trí
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.ward} - {item.district} - {item.city}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Địa chỉ
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.address}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Giấy tờ pháp lý
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									{item.license.join(", ")}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Mô tả
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									<span style={{ fontSize: 12 }}>{item.desc}</span>
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={2} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Xem chi tiết
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs={3}>
									<Button onClick={() => navigate(`/property/${item._id}`)}>
										<VisibilityOutlinedIcon />
									</Button>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Spin>
		</>
	);
};

export default CompareProperty;
