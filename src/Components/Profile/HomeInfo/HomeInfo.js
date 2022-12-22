import React, { useState, useEffect } from "react";
import { Typography, Spin } from "antd";
import ReactImageUploading from "react-images-uploading";
import { PostInfoApi } from "../../../api/navbar/NavBarOption";
import { noImage } from "../../../models/images";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import AlertDialog from "../../Dialog/AleartDialog";
import DialogCustome from "../../DialogCustome/DialogCustome";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
const { Title } = Typography;

const HomeInfo = () => {
	const [avt, setAvt] = useState([]);
	const [cover, setCover] = useState([]);
	const [useInfoInital, setuseInfoInital] = useState({});
	const PostInfoService = PostInfoApi();

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);

	const [openSubmit, setOpenSubmit] = useState(false);
	const [titleDialog, setTitleDialog] = useState("");
	const [contentDialog, setContentDialog] = useState("");

	const [isSpin, setIsSpin] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const handleAvtChange = (f) => {
		setAvt(f);
	};

	useEffect(() => {
		setIsSpin(true);
		if (avt.length > 0) {
			uploadImage(avt[0].file)
				.then((avtUser) => {
					console.log(avtUser, "img1");
					if (avtUser.data.success) {
						setUserInfo({ ...userInfo, ["avatar"]: avtUser.data.result.Location });
						setIsSpin(false);
					} else {
						setIsClosableDialog(true);
						setIsMessageDialog("Không thể tải ảnh đại diện");
						setIsTypeDialog("error");
						setIsOpenDialog(true);
						setIsSpin(false);
					}
				})
				.catch(() => {
					setIsClosableDialog(true);
					setIsMessageDialog("Không thể tải ảnh đại diện");
					setIsTypeDialog("error");
					setIsOpenDialog(true);
					setIsSpin(false);
				});
		} else {
			setIsSpin(false);
		}
	}, [avt]);
	const handleCoverChange = (f) => {
		setCover(f);
	};
	useEffect(() => {
		setIsSpin(true);
		if (cover.length > 0) {
			uploadImage(cover[0].file)
				.then((coverUser) => {
					console.log(coverUser, "img1");
					if (coverUser.data.success) {
						setUserInfo({ ...userInfo, ["cover"]: coverUser.data.result.Location });
						setIsSpin(false);
					} else {
						setIsClosableDialog(true);
						setIsMessageDialog("Không thể tải ảnh bìa");
						setIsTypeDialog("error");
						setIsOpenDialog(true);
						setIsSpin(false);
					}
				})
				.catch(() => {
					setIsClosableDialog(true);
					setIsMessageDialog("Không thể tải ảnh bìa");
					setIsTypeDialog("error");
					setIsOpenDialog(true);
					setIsSpin(false);
				});
		} else {
			setIsSpin(false);
		}
	}, [cover]);

	const uploadImage = async (img) => {
		const formData = new FormData();
		const config = {
			headers: { "Content-Type": "multipart/form-data" },
		};

		formData.append("img", img);

		return await axios.post("https://lvtn2022real.herokuapp.com/image", formData, config);
	};

	const handleUpdateInfoUser = async () => {
		try {
			setIsSpin(true);
			let isError = false;
			if (avt.length === 0) {
				setUserInfo({ ...userInfo, ["avatar"]: useInfoInital.avatar });
			}

			if (cover.length === 0) {
				setUserInfo({ ...userInfo, ["cover"]: useInfoInital.cover });
			}

			if (userInfo.lastName === "") {
				isError = true;
				setIsClosableDialog(true);
				setIsMessageDialog("Tên không được rỗng");
				setIsTypeDialog("error");
				setIsOpenDialog(true);
				setIsSpin(false);
			}
			console.log(userInfo, "fisrt");
			if (!isError) {
				const dataRequest = {
					avatar: userInfo["avatar"],
					cover: userInfo["cover"],
					lastName: userInfo["lastName"],
					address: userInfo["address"],
					mapAddress: userInfo["mapAddress"],
					desc: userInfo["desc"],
					phone: userInfo["phone"],
					email: userInfo["email"],
				};
				await PostInfoService.updateUserInfo(dataRequest, localStorage.getItem("token"))
					.then((value) => {
						console.log(value, "update user");
						if (value.data.success) {
							setIsClosableDialog(true);
							setIsMessageDialog("Cập nhật thành công");
							setIsTypeDialog("success");
							setIsOpenDialog(true);
							setAvt([]);
							setCover([]);

							setuseInfoInital({ ...userInfo });
							setIsSpin(false);
						} else {
							setIsClosableDialog(true);
							setIsMessageDialog("Cập nhật không thành công");
							setIsTypeDialog("error");
							setIsOpenDialog(true);
							setIsSpin(false);
						}
					})
					.catch(() => {
						setIsClosableDialog(true);
						setIsMessageDialog("Cập nhật không thành công");
						setIsTypeDialog("error");
						setIsOpenDialog(true);
						setIsSpin(false);
					});
			}
		} catch (e) {
			setIsClosableDialog(true);
			setIsMessageDialog("Có lỗi xảy ra khi lưu thông tin");
			setIsTypeDialog("error");
			setIsOpenDialog(true);
			setIsSpin(false);
		}
	};

	useEffect(() => {
		setIsSpin(true);
		PostInfoService.getPersonalInfo(localStorage.getItem("token"))
			.then((value) => {
				const data = value.data;
				if (data.success) {
					console.log(data.user);
					setUserInfo(data.user);
					setuseInfoInital(data.user);
				} else {
					console.log("có lỗi xảy ra khi lấy thông tin người dùng");
				}
				setIsSpin(false);
			})
			.catch(() => {
				setIsSpin(false);
				console.log("có lỗi xảy ra khi lấy thông tin người dùng");
			});
	}, []);

	const navigate = useNavigate();

	return (
		<div className="container-section user-info">
			<Spin spinning={isSpin} tip="Đợi xíu nhé...">
				<Title className="title-section">Quản lý cá nhân</Title>

				<Grid container spacing={2} className="content-section home-info">
					<Grid item xs={12} md={6} style={{ paddingRight: 20 }}>
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
								value={userInfo?.address}
								onChange={(e) => {
									setUserInfo({ ...userInfo, ["address"]: e.target.value });
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
							{/* <TextField
								size="small"
								style={{ width: "65%", margin: "15px 0" }}
								id="standard-basic"
								value={userInfo?.mapAddress}
								onChange={(e) => {
									setUserInfo({ ...userInfo, ["mapAddress"]: e.target.value });
								}}
								variant="outlined"
							/> */}
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
						<Grid>
							<Button
								variant="outlined"
								onClick={() => {
									navigate(`/business/${userInfo?._id}`, { replace: true });
								}}
							>
								<VisibilityOutlinedIcon />
								<span style={{ paddingLeft: 10 }}>Đến trang cá nhân</span>
							</Button>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6} className="upload-img">
						<div className="avatar">
							<Title level={3}>Ảnh đại diện</Title>
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
										{avt.length > 0 ? (
											imageList.map((image, index) => {
												return (
													<div key={index} className="image-item">
														<img src={image.dataURL} alt="" onClick={() => onImageUpdate(index)} />
														<button onClick={onImageRemoveAll} className="btn-edit-img">
															X
														</button>
													</div>
												);
											})
										) : (
											<div className="image-item" {...dragProps}>
												<img
													src={userInfo && userInfo.avatar !== "" ? userInfo.avatar : noImage}
													onClick={onImageUpload}
													alt=""
												/>
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
										{cover.length > 0 ? (
											imageList.map((image, index) => {
												return (
													<div key={index} className="image-item">
														<img src={image.dataURL} alt="" onClick={() => onImageUpdate(index)} />
														<button onClick={onImageRemoveAll} className="btn-edit-img">
															X
														</button>
													</div>
												);
											})
										) : (
											<div className="image-item" {...dragProps}>
												<img
													src={userInfo && userInfo.cover !== "" ? userInfo.cover : noImage}
													onClick={onImageUpload}
													alt=""
												/>
											</div>
										)}
									</div>
								)}
							</ReactImageUploading>
						</div>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<AlertDialog
							isOpen={isOpenDialog}
							type={isTypeDialog}
							message={isMesssageDialog}
							closable={isClosableDialog}
							onClose={() => {
								setIsOpenDialog(false);
							}}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<Button
							style={{ margin: 5 }}
							onClick={() => {
								setOpenSubmit(true);
								setTitleDialog("Cập Nhật");
								setContentDialog("Xác nhận cập nhật thông tin cá nhân");
							}}
							color="primary"
							variant="contained"
						>
							Lưu thông tin
						</Button>
						<Button
							style={{ margin: 5 }}
							onClick={() => {
								setUserInfo({ ...useInfoInital });
								setAvt([]);
								setCover([]);
							}}
							color="secondary"
							variant="outlined"
						>
							Hủy thay đổi
						</Button>
					</Grid>
				</Grid>
				<DialogCustome
					open={openSubmit}
					handleSubmit={() => {
						setOpenSubmit(false);
						handleUpdateInfoUser();
					}}
					handleClose={() => {
						setOpenSubmit(false);
					}}
					title={titleDialog}
					content={contentDialog}
				/>
			</Spin>
		</div>
	);
};

export default HomeInfo;
