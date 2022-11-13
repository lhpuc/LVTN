import React, { useContext } from "react";
import { Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { HeartOutlined } from "@ant-design/icons";
import "./FeaturedProp.css";
import { SearchFilterPostContext } from "../../context/searchFilterContext";

import { Link } from "react-router-dom";
export const FeaturedProp = () => {
	const { propertiesItem } = useContext(SearchFilterPostContext);
	return (
		<>
			<div className="property-list justify-evenly flex1 flex-row">
				{propertiesItem &&
					propertiesItem.map((property, index) => {
						console.log(propertiesItem, "fewfe");
						return (
							<div className="property-list-item">
								<div className="relative box-content mx-3 w-80 h-fit rounded-lg border border-gray-400">
									<Link to={`/property/${property._id}`} key={index}>
										<div className="z-0 m-0 w-fit">
											<img
												className="rounded-t-lg"
												src={property.img.length > 0 ? property.img[0] : ""}
												alt={property.name}
											/>
										</div>

										<div className="text-white bg-danger px-4 py-1 text-xs rounded absolute top-3 left-3 z-10">
											NỔI BẬT
										</div>

										<div className="text-white bg-black  px-4 py-1 text-xs rounded absolute top-3 right-3 z-10">
											{property.bussinessType === "rent" ? "CHO THUÊ" : "RAO BÁN"}
										</div>

										<div class="absolute w-12 h-12 bottom-44 right-3">
											<img class="rounded-full shadow-sm" src={property.img[0]} alt="Owner" />
										</div>

										<div className="px-3 py-5">
											<h1 className="text-dark text-sm font-bold mb-3">{property.name}</h1>
											<h2 className="text-gray-400 text-xs font-medium">
												{property.perimeter ? property.perimeter : "?"} m<sup>2</sup> | Địa chỉ:
												{property.address}, {property.cityName}
											</h2>
										</div>

										<div className="flex1 flex-row px-3 pb-5 border-gray-400 border-b justify-between text-gray-400">
											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faBed} />
												<p className="pt-1 text-xs">{property.numBeds ? property.numBeds : "?"} Phòng ngủ</p>
											</div>

											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faBath} />
												<p className="pt-1 text-xs">{property.numBaths ? property.numBaths : "?"} phòng tắm</p>
											</div>

											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faWarehouse} />
												<p className="pt-1 text-xs">{property.numbacony ? property.numbacony : "?"} ban công</p>
											</div>

											<div className="flex1 flex-col items-center justify-center text-lg font-medium">
												<FontAwesomeIcon icon={faSignal} />
												<p className="pt-1 text-xs">{property.numFloor ? property.numFloor : "?"}tầng </p>
											</div>
										</div>
									</Link>
									<div className="flex1 flex-row justify-between px-3 py-3 items-center">
										<div className="font-bold text-sm text-dark">
											{property.price ? property.price : "Thỏa thuận"} VND
										</div>

										<div className="text-light">
											<HeartOutlined />
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
			<Pagination defaultCurrent={6} total={500} />
		</>
	);
};
