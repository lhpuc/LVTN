import React, { useContext, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { HeartOutlined } from "@ant-design/icons";
import "./FeaturedProp.css";
import "../../pages/Ourteam/Ourteam.css";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import Pagination from "@mui/material/Pagination";
import { noImage } from "../../models/images";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import { Autocomplete, Button, TextField } from "@mui/material";
import { message, Rate, Spin } from "antd";
import { PostInfoApi } from "../../api/navbar/NavBarOption";
export const FeaturedProp = () => {
	const {
		propertiesItem,
		currentPage,
		setCurrentPage,
		totalPage,
		setTotalPage,
		userListItem,
		setUserListItem,
		searchUserOrProperty,
		comparePropertyItem,
		setComparePropertyItem,
		user,
		setUser,
		favouriteUser,
		setFavouriteUser,
		selectedSort,
		setSelectedSort,
		setIsSpinProperty,
		isSpinProperty,
	} = useContext(SearchFilterPostContext);

	const [searchUser, setSearchUser] = useState(false);

	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
	};

	const PostInfoService = PostInfoApi();
	const handleAddFavourite = async (id, checked) => {
		setIsSpinProperty(true);
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
				setIsSpinProperty(false);
			})
			.catch(() => {
				message.error("có lỗi");
				setIsSpinProperty(false);
			});
	};
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
	useEffect(() => {
		if (searchUserOrProperty == "Cá nhân") {
			setSearchUser(true);
		} else {
			setSearchUser(false);
		}
	}, [searchUserOrProperty]);

	const arrSort = [
		{
			name: "Đánh giá cao",
			code: 1,
		},
		{
			name: "Lượng truy cập",
			code: 2,
		},
		{
			name: "Giá giảm",
			code: 3,
		},
		{
			name: "Giá tăng",
			code: 4,
		},
	];
	return (
		<>
			<div style={{ margin: "0px auto 20px auto" }}>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={arrSort}
					getOptionLabel={(option) => option.name}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Sắp xếp" />}
					value={selectedSort}
					onChange={(e, value) => {
						setSelectedSort(value);
					}}
				/>
			</div>
			<Spin spinning={isSpinProperty} tip="Chờ xíu nhé...">
				<div className="property-list justify-evenly flex1 flex-row">
					{!searchUser ? (
						<>
							{propertiesItem &&
								propertiesItem.map((property, index) => {
									return (
										<>
											{!isSpinProperty && (
												<div className="property-list-item">
													<div
														className="relative box-content mx-3 w-80 h-fit "
														style={{ backgroundColor: "#fff", borderRadius: 10, boxShadow: "3px 3px 3px #ccc" }}
													>
														<Link to={`/property/${property._id}`} key={index}>
															<div
																className="z-0 m-0 w-fit"
																style={{ textAlign: "center", width: "100%", margin: "auto" }}
															>
																<img
																	style={{ height: 250, width: "auto", margin: "auto" }}
																	className="rounded-t-lg"
																	src={property.img.length > 0 ? property.img[0] : noImage}
																	alt={property.name}
																/>
															</div>

															{/* <div className="text-white bg-danger px-4 py-1 text-xs rounded absolute top-3 left-3 z-10">
											NỔI BẬT
										</div> */}

															<div className="text-white bg-black  px-4 py-1 text-xs rounded absolute top-3 right-3 z-10">
																{property.bussinessType === 1 ? "CHO THUÊ" : "RAO BÁN"}
															</div>

															{/* <div class="absolute w-12 h-12 bottom-44 right-3">
													<img
														class="rounded-full shadow-sm"
														src={property?.owner?.avatar ? property.owner.avatar : noImage}
														alt="Owner"
													/>
												</div> */}

															<div className="px-3 py-3">
																<h1 className="text-dark text-sm font-bold mb-2">{property.title}</h1>
																<div>
																	<Rate disabled allowHalf value={property.rating} style={{ fontSize: 12 }} />
																</div>
																<h2 className="text-gray-400 text-xs font-medium">
																	{property ? property.area : "?"} m<sup>2</sup>
																</h2>
																<h2 className="text-gray-400 text-xs font-medium">
																	Địa chỉ: {property.district} - {property.city}
																</h2>
															</div>

															<div className="flex1 flex-row px-3 pb-3 border-gray-400 border-b justify-between text-gray-400">
																<div className="flex1 flex-col items-center justify-center text-lg font-medium">
																	<FontAwesomeIcon icon={faBed} />
																	<p className="pt-1 text-xs">{property ? property.nOfBedroom : "?"} Phòng ngủ</p>
																</div>

																<div className="flex1 flex-col items-center justify-center text-lg font-medium">
																	<FontAwesomeIcon icon={faBath} />
																	<p className="pt-1 text-xs">{property ? property.nOfBathRoom : "?"} phòng tắm</p>
																</div>

																<div className="flex1 flex-col items-center justify-center text-lg font-medium">
																	<FontAwesomeIcon icon={faSignal} />
																	<p className="pt-1 text-xs">{property ? property.nOfFloor : "? "} tầng </p>
																</div>
															</div>
														</Link>
														<div className="flex1 flex-row justify-between px-3 py-3 items-center">
															<div className="font-bold text-sm " style={{ color: "#00048c" }}>
																{property.price ? <>{moneyFormat(property.price)} VND</> : <>Thỏa thuận</>}
															</div>

															<div className="text-light">
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

																<Button
																	onClick={(e) => {
																		handleAddCompare(property);
																	}}
																>
																	So Sánh
																</Button>
															</div>
														</div>
													</div>
												</div>
											)}
										</>
									);
								})}
						</>
					) : (
						<>
							{userListItem &&
								userListItem.map((user, index) => {
									return (
										<>
											<Link to={`/business/${user._id}`}>
												<div class="member">
													<img src={user.avatar ? user.avatar : noImage} alt="images" />
													<h2>{user.lastName}</h2>
													<p style={{ padding: 10 }}>{user.address}</p>
												</div>
											</Link>
										</>
									);
								})}
						</>
					)}
				</div>
			</Spin>
			{totalPage > 0 && (
				<Pagination
					count={totalPage}
					page={currentPage}
					variant="outlined"
					color="primary"
					onChange={(e, page) => {
						console.log(page);
						setCurrentPage(page);
					}}
				/>
			)}
		</>
	);
};
