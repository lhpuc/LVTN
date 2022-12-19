import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { HeartOutlined } from "@ant-design/icons";
import "./FeaturedProp.css";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import Pagination from "@mui/material/Pagination";
import { noImage } from "../../models/images";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mui/material";
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
	} = useContext(SearchFilterPostContext);
	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
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
			}
		} else {
			localStorage.setItem("property", JSON.stringify([id]));
			setComparePropertyItem([id]);
		}
		console.log(localStorage, "local");
	};

	return (
		<>
			<div className="property-list justify-evenly flex1 flex-row">
				{searchUserOrProperty == "Cá nhân" &&
					userListItem &&
					userListItem.map((item, index) => <>vv</>)}

				{searchUserOrProperty == "Tin đăng" &&
					propertiesItem &&
					propertiesItem.map((property, index) => {
						return (
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

										<div class="absolute w-12 h-12 bottom-44 right-3">
											<img
												class="rounded-full shadow-sm"
												src={property?.owner?.avatar ? property.owner.avatar : noImage}
												alt="Owner"
											/>
										</div>

										<div className="px-3 py-3">
											<h1 className="text-dark text-sm font-bold mb-3">{property.title}</h1>
											<h2 className="text-gray-400 text-xs font-medium">
												{property ? property.area : "?"} m<sup>2</sup>
											</h2>
											<h2 className="text-gray-400 text-xs font-medium">
												Địa chỉ:
												{property.district} - {property.city}
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
											<Checkbox
												onChange={(e) => {
													console.log(e, e.target.checked, "favorite");
												}}
												icon={<FavoriteBorder />}
												checkedIcon={<Favorite color="secondary" />}
											/>
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
						);
					})}
			</div>
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
