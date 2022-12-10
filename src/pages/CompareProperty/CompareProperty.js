import React, { useState, useEffect } from "react";
import { Typography, Spin, Carousel } from "antd";
import ReactImageUploading from "react-images-uploading";

import { noImage } from "../../models/images";
import { TextField, Grid, Button, autocompleteClasses } from "@mui/material";
import axios from "axios";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
const { Title } = Typography;

const CompareProperty = () => {
	const FilterInfoOfPostService = FilterInfoOfPostApi();
	const [isSpin, SetIsSpin] = useState(false);

	const [arrCompare, setArrCompare] = useState([]);
	const [arrProperty, setArrProperty] = useState([]);

	useEffect(() => {
		const propertiesFormat = {
			id: [],
			img: [],
			price: [],
			numOfBedroom: [],
			numOfBathroom: [],
			numOfFloor: [],
			area: [],
			title: [],
			license: [],
			address: [],
			mapAddress: [],
			propertyType: [],
			owner: [],
		};
		// arrProperty.forEach((item)=>{
		//   propertiesFormat.id.push(item._id);
		//   propertiesFormat.img.push(item.img.lenth>0?item.img:noImage);
		//   propertiesFormat.price.push(item.price);
		//   propertiesFormat.numOfBedroom.push(item.nOfBedroom);
		//   propertiesFormat.numOfBathroom.push(item.nOfBathRoom);
		//   propertiesFormat.area.push(item.area);
		//   propertiesFormat.title.push(item.title);
		//   propertiesFormat.license.push(item.license);
		//   propertiesFormat.address.push(item.address);
		//   propertiesFormat.mapAddress.push(item.mapAddress);
		//   propertiesFormat.propertyType.push(item.propertyType);
		// })
	}, [arrProperty]);
	useEffect(() => {
		SetIsSpin(true);
		// const propertiesId = localStorage.getItem("propertyId");
		const propertiesId = [
			"639407113c23106fdac7672f",
			"639407113c23106fdac7672f",
			"639407113c23106fdac7672f",
		];

		const dataRequest = {
			idList: propertiesId,
		};

		FilterInfoOfPostService.geArrayOfProperties(dataRequest).then((value) => {
			const data = value.data;
			if (data.success) {
				setArrProperty(data.propertyList);
			}
			SetIsSpin(false);
		});
	}, []);
	return (
		<>
			<Spin spinning={isSpin} tip="Đợi xíu nhé...">
				<Grid
					spacing={2}
					style={{ margin: "auto", padding: 30, backgroundColor: "#ccc", textAlign: "center" }}
				>
					<Grid style={{ backgroundColor: "#fff", borderRadius: 10, padding: 50 }}>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Bài Đăng
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.img.length < 1 ? (
										<div>
											<img style={{ height: 250, width: "auto", margin: "auto" }} src={noImage} />
										</div>
									) : (
										<Carousel autoplay>
											{item.img.map((image) => (
												<div>
													<img src={image} style={{ height: 250, width: "auto", margin: "auto" }} />
												</div>
											))}
										</Carousel>
									)}
								</Grid>
							))}
						</Grid>

						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Tiêu đề
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.title}
								</Grid>
							))}
						</Grid>

						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Giá
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs style={{ fontWeight: "bold", color: "red" }}>
									{item.isNegotiate ? "Thương lượng" : <>{item.price} VND</>}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Diện tích
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.area}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Số phòng ngủ
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.nOfBedroom}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Sô phòng tắm, nhà vệ sinh
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.nOfBathRoom}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Số tầng
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.nOfFloor}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								vị trí
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.ward} - {item.district} - {item.city}
								</Grid>
							))}
						</Grid>
						<Grid container spacing={5} style={{ padding: "20px 0px", borderBottom: "1px solid #ccc" }}>
							<Grid item xs={1} style={{ fontWeight: "bold", color: "#0f0f0f" }}>
								Địa chỉ
							</Grid>
							{arrProperty.map((item) => (
								<Grid item xs>
									{item.address}
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
