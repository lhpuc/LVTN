import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { noImage } from "../../models/images";
import { Grid } from "@mui/material";
import CarouselProperties from "../../Components/CarouselProperties/CarouselProperties";
import DialogCustome from "../../Components/DialogCustome/DialogCustome";
import AlertDialog from "../../Components/Dialog/AleartDialog";

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

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		if (property) {
			setContactUser(property.owner);
		}
	}, [property]);

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
							<Grid
								item
								md={7}
								xs={12}
								style={{ padding: 30, backgroundColor: "white", borderRadius: 10 }}
							>
								<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
									<div>
										<h2 className="text-2xl font-semibold">{property.title}</h2>
									</div>
									<div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
										<div className="bg-green-500 rounded-full text-white px-3 inline-block">
											{property.bussinessType === 2 ? "Bán" : "Cho thuê"}
										</div>
										<div className="bg-violet-500 rounded-full text-white px-3 inline-block">
											{property.city}
										</div>
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

								<div className="flex gap-x-6 text-violet-700 mb-6">
									<div className="flex1 flex-col items-center justify-center text-lg font-medium">
										<FontAwesomeIcon icon={faBed} />
										<p className="pt-1 text-xs">{property.nOfBedroom} Phòng ngủ</p>
									</div>

									<div className="flex1 flex-col items-center justify-center text-lg font-medium">
										<FontAwesomeIcon icon={faBath} />
										<p className="pt-1 text-xs">{property.nOfBathRoom} phòng tắm</p>
									</div>

									{/* <div className="flex1 flex-col items-center justify-center text-lg font-medium">
									<FontAwesomeIcon icon={faWarehouse} />
									<p className="pt-1 text-xs">{property.numbacony} ban công</p>
								</div> */}

									<div className="flex1 flex-col items-center justify-center text-lg font-medium">
										<FontAwesomeIcon icon={faSignal} />
										<p className="pt-1 text-xs">{property.nOfFloor} tầng </p>
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
									Diện tích nhà: {property.area}{" "}
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
										<p> {property.license.join(", ")}</p>{" "}
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
								className="bg-white border border-gray-300 rounded-lg"
								item
								xs={12}
								md={4}
								style={{ padding: 30 }}
							>
								<div className="flex items-center gap-x-4 mb-8">
									<Link
										to="/"
										className="text-violet-700 text-sm"
										style={{ display: "flex", alignItems: "center" }}
									>
										<div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
											<img src={contactUser?.avatar !== "" ? contactUser?.avatar : noImage} alt="" />
										</div>
										<div style={{ padding: "0 15px" }}>
											<div className="font-bold text-lg">{contactUser?.lastName}</div>
										</div>
									</Link>
								</div>
								<div className=" ">
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
