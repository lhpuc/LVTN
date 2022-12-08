import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "antd";
import "./Home.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { noImage } from "../../models/images";
import { Grid } from "@mui/material";

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

	useEffect(() => {
		FilterInfoOfPostService.getPostInfoById(id)
			.then((value) => {
				console.log(value, "property");
				const data = value.data;
				if (data.success) {
					setProperty(data.property);
				} else {
					setProperty(null);
				}
			})
			.catch(() => {
				setProperty(null);
			});
	}, []);

	return (
		<>
			{property && (
				<div className="container mx-auto min-h-[800px] mb-14">
					<Grid
						container
						spacing={2}
						className="flex flex-col items-center gap-6 lg:flex-row"
						style={{ alignItems: "flex-start", justifyContent: "space-between" }}
					>
						<Grid item md={7} xs={12} style={{ padding: 30, backgroundColor: "white", borderRadius: 10 }}>
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
										<Carousel>
											{property.img.map((pro) => (
												<div style={{ padding: 10, textAlign: "center" }}>
													<img style={{ maxHeight: 450, width: "auto", margin: "auto" }} src={pro} alt="" />
												</div>
											))}
										</Carousel>
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
								{!property.isNegotiate ? <>{property.price} VND</> : <>$ Thương lượng</>}
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
								<div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
									<img src={noImage} alt="" />
								</div>
								<div>
									<div className="font-bold text-lg">property.agent.name</div>
									<Link to="/" className="text-violet-700 text-sm">
										View listings
									</Link>
								</div>
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
										<li class="col-sm-6">
											<Form.Item
												class="font-montserrat"
												name={["tài khoản", "tên"]}
												rules={[
													{
														required: true,
													},
												]}
											>
												<label class="font-montserrat">
													Tên *
													<Input
														className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
														type="text"
														name="name"
														id="name"
														placeholder=""
													/>
												</label>
											</Form.Item>
										</li>
										<li class="col-sm-6">
											<Form.Item
												name={["tài khoản", "email"]}
												rules={[
													{
														type: "email",
													},
												]}
											>
												<label class="font-montserrat">
													E-mail *
													<Input
														className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
														type="text"
														name="email"
														id="email"
														placeholder=""
													/>
												</label>
											</Form.Item>
										</li>

										<li class="col-sm-6">
											<Form.Item
												name={["tài khoản", "số điện thoại"]}
												rules={[
													{
														required: true,
													},
												]}
											>
												<label class="font-montserrat">
													Số điện thoại *
													<Input
														className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
														type="text"
														name="company"
														id="company"
														placeholder=""
													/>
												</label>
											</Form.Item>
										</li>
										<li class="col-sm-6">
											<Form.Item
												name={["tài khoản", "chủ đề"]}
												rules={[
													{
														required: true,
													},
												]}
											>
												<label class="font-montserrat">
													Chủ đề
													<Input
														className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
														type="text"
														name="website"
														id="website"
														placeholder=""
													/>
												</label>
											</Form.Item>
										</li>

										<li class="col-sm-12">
											<Form.Item name={["tài khoản", "thông tin"]}>
												<label class="font-montserrat">
													Thông tin
													<textarea
														className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
														// class="form-control"
														name="message"
														id="message"
														rows="5"
														placeholder=""
													></textarea>
												</label>
											</Form.Item>
										</li>

										<li class="col-sm-12">
											<Form.Item>
												<Button type="primary" htmlType="submit">
													Gửi ngay
												</Button>
											</Form.Item>
										</li>
									</ul>
								</Form>
							</div>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default PropertyDetails;
