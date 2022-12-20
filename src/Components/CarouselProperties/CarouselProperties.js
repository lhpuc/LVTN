import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faSignal, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { HeartOutlined } from "@ant-design/icons";
import { message } from "antd";
import "../FeaturedProp/FeaturedProp.css";
import { noImage } from "../../models/images";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import { PostInfoApi } from "../../api/navbar/NavBarOption";

const CarouselProperties = ({ data }) => {
	const PostInfoService = PostInfoApi();
	const [propertyItem, setPropertyItem] = useState(null);

	const { favouriteUser, setFavouriteUser, user, setUser, setComparePropertyItem } =
		useContext(SearchFilterPostContext);

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

	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
	};
	useEffect(() => {
		setPropertyItem(data);
	}, [data]);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: propertyItem ? (propertyItem?.length > 5 ? 5 : propertyItem.length) : 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
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
	return (
		<>
			<div style={{ width: "100%", padding: "30px 50px" }}>
				{propertyItem && propertyItem.length > 0 && (
					<Slider {...settings}>
						{propertyItem.map((property, index) => (
							<div>
								<div
									className="relative box-content h-fit "
									style={{
										width: "270px",
										backgroundColor: "#fff",
										borderRadius: 10,
										boxShadow: "3px 3px 3px #ccc",
										margin: "auto",
									}}
								>
									<a href={`/property/${property._id}`} key={index}>
										<div className="z-0 m-0 w-fit" style={{ width: "100%", margin: "auto" }}>
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

										<div className="px-3 py-3">
											<h1 className="text-dark text-sm font-bold mb-3">{property.title}</h1>
											<h2 className="text-gray-400 text-xs font-medium">
												{property ? property.area : "?"} m<sup>2</sup>
											</h2>
											<h2 className="text-gray-400 text-xs font-medium">
												Địa chỉ:
												{property.address}, {property.city}
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
									</a>
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
						))}
					</Slider>
				)}
			</div>
		</>
	);
};

export default CarouselProperties;
