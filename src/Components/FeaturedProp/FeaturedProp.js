import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { HeartOutlined } from "@ant-design/icons";
import "./FeaturedProp.css";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import Pagination from "@mui/material/Pagination";
import { noImage } from "../../models/images";
import { Link } from "react-router-dom";
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
	} = useContext(SearchFilterPostContext);
	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
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
								<div className="relative box-content mx-3 w-80 h-fit rounded-lg border border-gray-400">
									<Link to={`/property/${property._id}`} key={index}>
										<div className="z-0 m-0 w-fit">
											<img
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
												src={property.img.length > 0 ? property.img[0] : noImage}
												alt="Owner"
											/>
										</div>

										<div className="px-3 py-5">
											<h1 className="text-dark text-sm font-bold mb-3">{property.title}</h1>
											<h2 className="text-gray-400 text-xs font-medium">
												{property ? property.area : "?"} m<sup>2</sup> | Địa chỉ:
												{property.address}, {property.city}
											</h2>
										</div>

										<div className="flex1 flex-row px-3 pb-5 border-gray-400 border-b justify-between text-gray-400">
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
										<div className="font-bold text-sm text-dark">
											{property.price ? <>{moneyFormat(property.price)} VND</> : <>Thỏa thuận</>}
										</div>

										<div className="text-light">
											<HeartOutlined
												onclick={() => {
													console.log("tim");
												}}
											/>
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
