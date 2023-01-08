import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { Button, Form, Input, message, Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { noImage } from "../../models/images";
import { Grid, Pagination, Rating, TextField } from "@mui/material";
import CarouselProperties from "../../Components/CarouselProperties/CarouselProperties";
import DialogCustome from "../../Components/DialogCustome/DialogCustome";
import AlertDialog from "../../Components/Dialog/AleartDialog";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { PostInfoApi } from "../../api/navbar/NavBarOption";
import { Button as ButtonUi } from "@mui/material";
import moment from "moment";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const validateMessages = {
	required: "${label} là trường bắt buộc!",
	types: {
		email: "${label} không phải là một email hợp lệ!",
	},
};

const PropertyDetails = () => {
	const FilterInfoOfPostService = FilterInfoOfPostApi();
	const PostInfoService = PostInfoApi();
	const { favouriteUser, setFavouriteUser, user, setUser, setComparePropertyItem } =
		useContext(SearchFilterPostContext);
	const onFinish = (values) => {
		console.log(values);
	};
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [propertyRelate, setPropertyRelate] = useState(null);
	const [contactUser, setContactUser] = useState(null);
	const [mesContact, setMesContact] = useState("");

	const [openSubmit, setOpenSubmit] = useState(false);
	const [titleDialog, setTitleDialog] = useState("");
	const [contentDialog, setContentDialog] = useState("");

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);

	const [ratingValue, setRatingValue] = useState(0);
	const [commentPost, setCommentPost] = useState("");

	const [arrRating, setArrRating] = useState([]);
	const [indexRating, setIndexRating] = useState(1);
	const [totalIndexRating, setTotalIndexRating] = useState(1);

	const handleAddCompare = (id) => {
		const local = localStorage.getItem("property");
		if (local !== null) {
			const dataLocal = JSON.parse(localStorage.getItem("property"));
			console.log(dataLocal, "cẻver");
			if (dataLocal.length < 3) {
				const findId = dataLocal.find((item) => item == id._id);
				if (!findId) {
					dataLocal.push(id);
					localStorage.setItem("property", JSON.stringify(dataLocal));
					setComparePropertyItem(dataLocal);
				}
			} else {
				message.error("Chỉ được tối đa 3 mục so sánh");
			}
		} else {
			localStorage.setItem("property", JSON.stringify([id]));
			setComparePropertyItem([id]);
		}
		console.log(localStorage, "local");
	};

	const handleGetPropertyById = () => {
		FilterInfoOfPostService.getPostInfoById(id)
			.then((value) => {
				console.log(value, "property");
				const data = value.data;
				if (data.success) {
					setProperty(data.property);
					setPropertyRelate(data.nearByProperties);
				} else {
					setProperty(null);
				}
			})
			.catch(() => {
				setProperty(null);
			});
	};

	const HandleSendRatingPost = () => {
		const dataRequest = {
			pId: property._id,
			comment: commentPost,
			rate: ratingValue,
		};
		FilterInfoOfPostService.sendRating(dataRequest, localStorage.getItem("token"))
			.then((value) => {
				const data = value.data;
				if (data.success) {
					message.success("Đánh giá thành công.");
					handleGetPropertyById();
					setRatingValue(0);
					setCommentPost("");
				} else {
					message.error("Không thể gửi đánh giá");
				}
			})
			.catch(() => {
				message.error("Gửi đánh giá bị lỗi");
			});
	};
	const handleAddFavourite = async (id, checked) => {
		let arrFavourite = favouriteUser;
		if (checked) {
			const favouriteDup = arrFavourite.find((item) => item == id._id);
			if (favouriteDup === undefined) {
				arrFavourite.push(id._id);
				setFavouriteUser([...arrFavourite]);
			}
		} else {
			const favouriteDe = favouriteUser.filter((item) => item != id._id);
			arrFavourite = favouriteDe.map((item) => item);
			setFavouriteUser(arrFavourite);
		}

		const dataRequest = {
			favourite: arrFavourite,
		};
		console.log(dataRequest, "ewvewvewv");

		await PostInfoService.updateUserInfo(dataRequest, localStorage.getItem("token"))
			.then((value) => {
				message.success("Đã cập nhật.");
			})
			.catch(() => {
				message.error("có lỗi");
			});
	};

	useEffect(() => {
		handleGetPropertyById();
	}, []);

	useEffect(() => {
		if (property) {
			setContactUser(property.owner);
			setTotalIndexRating(Math.ceil(property.rateList.length / 5));
			setIndexRating(1);
		}
	}, [property]);

	useEffect(() => {
		if (property && property.rateList.length > 0) {
			let arr = [];
			if ((indexRating - 1) * 5 + 5 < property.rateList.length) {
				arr = property.rateList.slice((indexRating - 1) * 5, (indexRating - 1) * 5 + 5);
			} else {
				arr = property.rateList.slice((indexRating - 1) * 5, property.rateList.length);
			}

			setArrRating(arr);
		}
	}, [indexRating, property]);

	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
	};

	const settingSlider = {
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const handleSendMailToUser = () => {
		if (mesContact !== "") {
			const dataRequest = {
				message: mesContact,
			};
			FilterInfoOfPostService.sendMailToUser(dataRequest, property._id, localStorage.getItem("token"))
				.then((value) => {
					const data = value.data;
					if (data.success) {
						setIsClosableDialog(true);
						setIsMessageDialog(data.mes);
						setIsTypeDialog("success");
						setIsOpenDialog(true);
					} else {
						setIsClosableDialog(true);
						setIsMessageDialog(data.mes);
						setIsTypeDialog("error");
						setIsOpenDialog(true);
					}
				})
				.catch(() => {
					setIsClosableDialog(true);
					setIsMessageDialog("có lỗi xảy xa.");
					setIsTypeDialog("error");
					setIsOpenDialog(true);
				});
		}
	};
	const desc = ["Kinh khủng", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

	return (
		<>
			{property && (
				<>
					<div className="container mx-auto min-h-[800px] mb-14">
						<Grid
							container
							spacing={2}
							className="flex flex-col items-center gap-6 lg:flex-row"
							style={{ alignItems: "flex-start", justifyContent: "space-between" }}
						>
							<Grid item md={8} xs={12}>
								<Grid item xs={12} style={{ padding: 30, backgroundColor: "white", borderRadius: 10 }}>
									<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
										<div>
											<h2 className="text-2xl font-semibold">{property.title}</h2>
										</div>
										<div>
											<h2 style={{ fontSize: 14, color: "#cccfff" }}>
												Ngày đăng tin: {moment(property.startDate).format("DD/MM/YYYY")}
											</h2>
										</div>
										<div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
											<div className="bg-green-500 rounded-full text-white px-3 inline-block">
												{property.bussinessType === 2 ? "Bán" : "Cho thuê"}
											</div>
											<div className="bg-violet-500 rounded-full text-white px-3 inline-block">
												{property.city}
											</div>
										</div>
										<div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
											<Rate disabled allowHalf value={property.rating} />
										</div>
									</div>
									<div style={{ maxHeight: 500, marginBottom: 50, backgroundColor: "#211f50", padding: 20 }}>
										{property.img.length > 0 ? (
											<div style={{ margin: "auto" }}>
												<Slider {...settingSlider}>
													{property.img.map((pro) => (
														<div style={{ padding: 10, textAlign: "center" }}>
															<img style={{ maxHeight: 450, width: "auto", margin: "auto" }} src={pro} alt="" />
														</div>
													))}
												</Slider>
											</div>
										) : (
											<div className="mb-8" style={{ padding: 10, textAlign: "center" }}>
												<img src={noImage} style={{ maxHeight: 450, width: "auto", margin: "auto" }} alt="" />
											</div>
										)}
									</div>
									<div
										style={{
											display: "flex",
											width: "100%",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<div className="flex gap-x-6 text-violet-700">
											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faBed} />
												<p className="pt-1 text-xs">{property.nOfBedroom} Phòng ngủ</p>
											</div>

											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faBath} />
												<p className="pt-1 text-xs">{property.nOfBathRoom} phòng tắm</p>
											</div>

											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faSignal} />
												<p className="pt-1 text-xs">{property.nOfFloor} tầng </p>
											</div>
										</div>
										<div
											style={{
												display: "flex",
												width: "100%",
												alignItems: "center",
												justifyContent: "flex-end",
											}}
										>
											<div style={{ width: "20%" }}>
												{user && (
													<Checkbox
														checked={
															favouriteUser.find((item) => item === property._id) !== undefined ? true : false
														}
														onChange={(e) => {
															console.log(e, e.target.checked, "favorite");
															handleAddFavourite(property, e.target.checked);
														}}
														icon={<FavoriteBorder />}
														checkedIcon={<Favorite color="secondary" />}
													/>
												)}
											</div>

											<ButtonUi
												style={{ width: "50%" }}
												onClick={(e) => {
													handleAddCompare(property);
												}}
												variant="outlined"
											>
												So Sánh
											</ButtonUi>
										</div>
									</div>

									<div style={{ paddingBottom: 10 }} className="text-3xl font-semibold text-violet-600">
										{!property.isNegotiate ? <>{moneyFormat(property.price)} VND</> : <>$ Thương lượng</>}
									</div>

									<h3>
										<strong>Thông tin liên hệ:</strong>
									</h3>
									<p>Tên: {property.contactName}</p>
									<p>Số điện thoại: {property.contactPhone}</p>
									<p>Email: {property.contactEmail}</p>
									<p>Địa chỉ liên hệ: {property.contactAddress}</p>
									<h3>
										<strong> Mô tả:</strong>
									</h3>
									<p>{property.desc}</p>
									<br />
									<h3>
										<strong> Đặc điểm cơ bản:</strong>
									</h3>
									<p> Số lượng phòng ngủ: {property.nOfBedroom} </p>
									<p> Số lượng phòng tắm: {property.nOfBathRoom} </p>
									{/* <p> Số lượng ban công: {property.numbacony}</p> */}
									<p> Số lượng tầng: {property.nOfFloor} </p>
									<p>
										Diện tích nhà: {property.area}
										<strong>
											m<sup>2</sup>
										</strong>
									</p>
									{/* <br />
							<h3>
								{" "}
								<strong> Giải pháp bố trí:</strong>
							</h3>
							<p> {property.layoutsolution}</p>
							<br /> */}
									{/* <h3>
								{" "}
								<strong> Thi công và trang bị căn hộ:</strong>
							</h3>
							<p> {property.construction}</p>
							<br /> */}
									<h3>
										<strong>Địa điểm:</strong>
									</h3>
									<p> {property.address}</p>
									{property.license.length > 0 && (
										<>
											<h3>
												<strong>Giấy tờ:</strong>
											</h3>
											<p> {property.license.join(", ")}</p>
										</>
									)}

									<br />
									{/* <h3>
								{" "}
								<strong> Ý kiến:</strong>
							</h3>
							<p> {property.idea}</p>
							<br /> */}
								</Grid>
								<Grid
									item
									md={12}
									xs={12}
									style={{ padding: 30, backgroundColor: "white", borderRadius: 10, marginTop: 20 }}
								>
									<Grid item xs={12} style={{ padding: 10, fontSize: 25, fontWeight: "bold" }}>
										Đánh giá
									</Grid>
									{user && (
										<Grid item xs={12} style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
											<div style={{ padding: 10, width: "100%" }}>
												<span style={{ color: "#ccc" }}>Xếp hạng: </span>

												<Rate
													style={{ color: "#fbff1c" }}
													tooltips={desc}
													value={ratingValue}
													onChange={(newValue) => {
														setRatingValue(newValue);
													}}
												/>
												{ratingValue ? <span className="ant-rate-text">{desc[ratingValue - 1]}</span> : ""}
											</div>
											<div style={{ padding: 10 }}>
												<span style={{ color: "#ccc" }}>Bình luận: </span>
												<TextField
													fullWidth
													value={commentPost}
													onChange={(e) => {
														setCommentPost(e.target.value);
													}}
													multiline
												/>
											</div>

											<div style={{ padding: 10 }}>
												<ButtonUi
													variant="outlined"
													onClick={() => {
														HandleSendRatingPost();
													}}
												>
													Gửi đánh giá
												</ButtonUi>
											</div>
										</Grid>
									)}

									<Grid item xs={12} style={{ padding: 10 }}>
										{arrRating.map((item) => (
											<Grid
												container
												xs={12}
												style={{ padding: 10, margin: 5, backgroundColor: "#d7eefa", borderRadius: 10 }}
											>
												<Grid item xs={3} style={{ padding: 10, borderRight: "2px solid #fff" }}>
													<Grid style={{ margin: "auto", textAlign: "center" }}>
														<img
															src={item.user?.avatar ? item.user?.avatar : noImage}
															style={{ margin: "auto", borderRadius: "100%", height: "40px", width: "auto" }}
														/>
														<a
															href={`/business/${item.user._id}`}
															style={{ textDecoration: "none", color: "#40bfff" }}
														>
															{item.user?.lastName}
														</a>
														<p style={{ color: "#517c91", fontSize: 10 }}>
															{moment(item.date).format("DD-MM-YYYY")}
														</p>
													</Grid>
												</Grid>
												<Grid item xs={8} style={{ padding: 10 }}>
													<Rate disabled value={item.rate} style={{ color: "#fbff1c" }} />

													<p style={{ color: "#3aa9cf", wordBreak: "break-word", width: "100%" }}>
														{item.comment}
													</p>
												</Grid>
											</Grid>
										))}
									</Grid>
									{arrRating.length > 0 && (
										<Grid item xs={12} style={{ padding: 20 }}>
											<Pagination
												count={totalIndexRating}
												page={indexRating}
												variant="outlined"
												color="primary"
												onChange={(e, page) => {
													console.log(page);
													setIndexRating(page);
												}}
											/>
										</Grid>
									)}
								</Grid>
							</Grid>
							<Grid
								className="bg-white border border-gray-300 rounded-lg"
								item
								xs={12}
								md={3}
								style={{ padding: 30, marginTop: 15 }}
							>
								<div className="flex items-center gap-x-4 mb-8">
									<Link
										to={`/business/${contactUser?._id}`}
										className="text-violet-700 text-sm"
										style={{ display: "flex", alignItems: "center" }}
									>
										<div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
											<img
												style={{ borderRadius: "100%" }}
												src={contactUser?.avatar !== "" ? contactUser?.avatar : noImage}
												alt=""
											/>
										</div>
										<div style={{ padding: "0 15px" }}>
											<div className="font-bold text-lg">{contactUser?.lastName}</div>
										</div>
									</Link>
								</div>
								<div>
									<Form
										className="flex flex-col gap-y-4"
										role="form"
										id="contact_form"
										method="post"
										onSubmit="return false"
										{...layout}
										name="nest-messages"
										onFinish={onFinish}
										validateMessages={validateMessages}
									>
										<ul class="row">
											<li class="col-sm-12">
												<Form.Item>
													<label class="font-montserrat">
														Lời nhắn:
														<textarea
															className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
															// class="form-control"
															name="message"
															id="message"
															rows="5"
															placeholder=""
															onChange={(e) => {
																setMesContact(e.target.value);
															}}
															required
														></textarea>
													</label>
												</Form.Item>
											</li>

											<li class="col-sm-12">
												<AlertDialog
													isOpen={isOpenDialog}
													type={isTypeDialog}
													message={isMesssageDialog}
													closable={isClosableDialog}
													onClose={() => {
														setIsOpenDialog(false);
													}}
												/>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => {
															setOpenSubmit(true);
															setTitleDialog("Xác nhận");
															setContentDialog("Bạn xác nhận muốn gửi thông tin cho người này?");
														}}
														htmlType="submit"
													>
														Gửi ngay
													</Button>
												</Form.Item>
											</li>
										</ul>
									</Form>
								</div>
							</Grid>
							{propertyRelate && propertyRelate.length > 0 && (
								<>
									<Grid style={{ width: "100%", textAlign: "center", backgroundColor: "#69b1f9" }}>
										<span
											style={{
												borderRadius: 10,
												padding: 10,
												margin: "10px auto",
												color: "#fff",

												fontSize: 30,
											}}
										>
											CÓ THỂ BẠN QUAN TÂM
										</span>
									</Grid>
									<Grid item xs={12}>
										<CarouselProperties data={propertyRelate} />
									</Grid>
								</>
							)}
						</Grid>

						<DialogCustome
							open={openSubmit}
							handleSubmit={() => {
								setOpenSubmit(false);
								handleSendMailToUser();
							}}
							handleClose={() => {
								setOpenSubmit(false);
							}}
							title={titleDialog}
							content={contentDialog}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default PropertyDetails;
