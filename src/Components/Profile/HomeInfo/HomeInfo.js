import React, { useState, useEffect } from "react";
import { Typography, Input, Button, Form, Select, DatePicker } from "antd";
import ReactImageUploading from "react-images-uploading";
import { PostInfoApi } from "../../../api/navbar/NavBarOption";
import { noImage } from "../../../models/images";
import { TextField, Grid } from "@mui/material";
import axios from "axios";
const { Title } = Typography;

const HomeInfo = () => {
	const [avt, setAvt] = useState([]);
	const [cover, setCover] = useState([]);
	const [updateUserInfo, setUpdateUserInfo] = useState({});
	const PostInfoService = PostInfoApi();

	const handleAvtChange = (f) => {
		setAvt(f);
	};
	const handleCoverChange = (f) => {
		setCover(f);
	};

	const [userInfo, setUserInfo] = useState(null);

	const uploadImage = async (img) => {
		const formData = new FormData();
		const config = {
			headers: { "Content-Type": "multipart/form-data" },
		};

		formData.append("img", img);

		await axios
			.post("https://lvtn2022real.herokuapp.com/image", formData, config)
			.then((value) => {
				console.log(value, "avt");
			})
			.catch(() => {
				console.log("lỗi up hình ảnh");
			});
	};

	const handleUpdateInfoUser = async () => {
		await uploadImage(avt[0].file);
	};

	useEffect(() => {
		PostInfoService.getPersonalInfo(localStorage.getItem("token"))
			.then((value) => {
				const data = value.data;
				if (data.success) {
					setUserInfo(data.user);
				} else {
					console.log("có lỗi xảy ra khi lấy thông tin người dùng");
				}
			})
			.catch(() => {
				console.log("có lỗi xảy ra khi lấy thông tin người dùng");
			});
	}, []);

	return (
		<div className="container-section user-info">
			<Title className="title-section">Quản lý trang chủ</Title>
			<Grid container spacing={2} className="content-section home-info">
				<Grid item xs={6} style={{ paddingRight: 20 }}>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Tên: </span>
						<TextField
							size="small"
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.lastName}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["lastName"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Số điện thoại: </span>
						<TextField
							size="small"
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.phone}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["phone"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Địa chỉ: </span>
						<TextField
							size="small"
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.mapAddress}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["mapAddress"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Email: </span>
						<TextField
							size="small"
							disabled
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.email}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["email"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Bản đồ: </span>
						<TextField
							size="small"
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.mapAddress}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["mapAddress"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<span style={{ width: "20%" }}>Giới thiệu: </span>
						<TextField
							multiline
							minRows={3}
							size="small"
							style={{ width: "65%", margin: "15px 0" }}
							id="standard-basic"
							value={userInfo?.desc}
							onChange={(e) => {
								setUserInfo({ ...userInfo, ["desc"]: e.target.value });
							}}
							variant="outlined"
						/>
					</Grid>
					<Button
						onClick={() => {
							handleUpdateInfoUser();
						}}
						htmlType="button"
						className="btn-section-form"
					>
						Lưu thông tin
					</Button>
				</Grid>

				<Grid item xs={6} className="upload-img">
					<div className="avatar">
						<Title level={3}>Ảnh trang chủ</Title>
						<ReactImageUploading
							value={avt}
							onChange={handleAvtChange}
							acceptType={["jpg", "jpeg", "gif", "png", "svg"]}
						>
							{({
								imageList,
								onImageUpload,
								onImageRemoveAll,
								onImageUpdate,
								onImageRemove,
								dragProps,
							}) => (
								<div className="upload__image--wrapper">
									{imageList.map((image, index) => (
										<div key={index} className="image-item">
											<img src={image.dataURL} alt="" onClick={() => onImageUpdate(index)} />
											<button onClick={onImageRemoveAll} className="btn-edit-img">
												X
											</button>
										</div>
									))}
									{avt.length ? undefined : (
										<div className="image-item" {...dragProps}>
											<img src={noImage} onClick={onImageUpload} alt="" />
										</div>
									)}
								</div>
							)}
						</ReactImageUploading>
					</div>
					<div className="avatar">
						<Title level={3}>Ảnh bìa</Title>
						<ReactImageUploading
							value={cover}
							onChange={handleCoverChange}
							acceptType={["jpg", "jpeg", "gif", "png", "svg"]}
						>
							{({
								imageList,
								onImageUpload,
								onImageRemoveAll,
								onImageUpdate,
								onImageRemove,
								dragProps,
							}) => (
								<div className="upload__image--wrapper">
									{imageList.map((image, index) => (
										<div key={index} className="image-item">
											<img src={image.dataURL} alt="" onClick={() => onImageUpdate(index)} />
											<button onClick={onImageRemoveAll} className="btn-edit-img">
												X
											</button>
										</div>
									))}
									{cover.length ? undefined : (
										<div className="image-item" {...dragProps}>
											<img src={noImage} onClick={onImageUpload} alt="" />
										</div>
									)}
								</div>
							)}
						</ReactImageUploading>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default HomeInfo;
