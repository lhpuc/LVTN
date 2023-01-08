import "./Banner.css";
import React, { useState, useEffect, useContext } from "react";
import { Slider, Input, Space, Select } from "antd";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import { InputNumber, Spin } from "antd";
import { Button } from "@mui/material";

const Banner = () => {
	const FilterInfoOfPostService = FilterInfoOfPostApi();
	const { Search } = Input;

	const { Option } = Select;
	const {
		searchUserOrProperty,
		setSearchUserOrProperty,
		propertiesItem,
		setPropertiesItem,
		userListItem,
		setUserListItem,
		searchStringFilter,
		setSearchStringFilter,
		selectedDistrict,
		setSelectedDistrict,
		selectedCity,
		setSelectedCity,
		selectMinPrice,
		setSelectedMinPrice,
		selectMaxPrice,
		setSelectedMaxPrice,
		clearFilter,
		selectMinArea,
		setSelectedMinArea,
		selectMaxArea,
		setSelectedMaxArea,
		selectedWard,
		setSelectedWard,
		selectedKindOfBDS,
		setSelectedKindOfBDS,
		selectedNumOfRoom,
		setSelectedNumOfRoom,
		selectedDistrictCode,
		setSelectedDistrictCode,
		selectedCityCode,
		setSelectedCityCode,
		selectedWardCode,
		setSelectedWardCode,
		currentPage,
		setCurrentPage,
		totalPage,
		setTotalPage,
		selectedKindOfPost,
		setSelectedKindOfPost,
		sortBy,
		setSortBy,
	} = useContext(SearchFilterPostContext);

	const [isApplyFilter, setIsApplyFilter] = useState(false);
	const [filterData, setFilterData] = useState([]);
	const [cityFilter, setCityFilter] = useState([]);
	const [districtFilter, setDistrictFilter] = useState([]);
	const [wardFilter, setWardFilter] = useState([]);
	const [selectRangePriceDefault, setSelectRangePriceDefault] = useState([0, 10000000]);
	const [selectRangeAreaDefault, setSelectRangeAreaDefault] = useState([0, 200]);

	const [searchTypeList, setSearchTypeList] = useState(["Cá nhân", "Tin đăng"]);
	const [kindOfPost, setKindOfPost] = useState(["Cho thuê", "Bán"]);
	const [numberOfRoomList, setNumberOfRoomList] = useState([1, 2, 3, 4, 5]);

	const [kindOfBDS, setKindOfBDS] = useState([]);

	const [searchUser, setSearchUser] = useState(false);
	const [isSpin, setIsSpin] = useState(false);

	useEffect(() => {
		if (selectMinPrice < selectRangePriceDefault[0]) {
			setSelectRangePriceDefault([selectMinPrice, selectRangePriceDefault[1]]);
		}
		if (selectMaxPrice > selectRangePriceDefault[1]) {
			setSelectRangePriceDefault([selectRangePriceDefault[1], selectMaxPrice]);
		}
	}, [selectMinPrice, selectMaxPrice]);

	useEffect(() => {
		if (selectMinArea < selectRangeAreaDefault[0]) {
			setSelectRangeAreaDefault([selectMinArea, selectRangeAreaDefault[1]]);
		}
		if (selectMaxArea > selectRangeAreaDefault[1]) {
			setSelectRangeAreaDefault([selectRangeAreaDefault[1], selectMaxArea]);
		}
	}, [selectMinArea, selectMaxArea]);

	const handleFilterProperty = (page, isFilter) => {
		setIsSpin(true);
		setCurrentPage(page);
		setTotalPage(0);
		const dataRequest = {
			name: searchStringFilter,
			page: page,
			limit: 30,
			popularSort: true,
		};
		if (isFilter) {
			console.log("vdsv");
			if (
				selectedKindOfPost !== null &&
				selectedKindOfPost !== undefined &&
				selectedKindOfPost !== "" &&
				selectedKindOfPost != "Tất cả"
			) {
				dataRequest.bussinessType = selectedKindOfPost == "Cho thuê" ? 1 : 2;
			}
			if (selectedKindOfBDS !== null && selectedKindOfBDS !== undefined && selectedKindOfBDS !== "") {
				dataRequest.propertyType = selectedKindOfBDS;
			}

			if (
				selectedNumOfRoom !== null &&
				selectedNumOfRoom !== undefined &&
				selectedNumOfRoom !== "" &&
				selectedNumOfRoom !== 0
			) {
				dataRequest.nOfBedroom = selectedNumOfRoom;
			}
			if (selectedCityCode !== null && selectedCityCode !== undefined && selectedCityCode !== "") {
				dataRequest.cityCode = selectedCityCode;
			}
			if (
				selectedDistrictCode !== null &&
				selectedDistrictCode !== undefined &&
				selectedDistrictCode !== ""
			) {
				dataRequest.districtCode = selectedDistrictCode;
			}
			if (selectedWardCode !== null && selectedWardCode !== undefined && selectedWardCode !== "") {
				dataRequest.wardCode = selectedWardCode;
			}

			if (
				selectMinPrice !== null &&
				selectMinPrice !== undefined &&
				selectMinPrice !== "" &&
				selectMinPrice !== 0 &&
				selectMaxPrice !== 0
			) {
				console.log(selectMinPrice, "min");
				dataRequest.lowPrice = selectMinPrice;
			}

			if (
				selectMaxPrice !== null &&
				selectMaxPrice !== undefined &&
				selectMaxPrice !== "" &&
				selectMaxPrice !== 0
			) {
				dataRequest.highPrice = selectMaxPrice;
				if (selectMinPrice === 0) {
					dataRequest.lowPrice = 1;
				}
			}

			if (
				selectMinArea !== null &&
				selectMinArea !== undefined &&
				selectMinArea !== "" &&
				selectMinArea !== 0 &&
				selectMaxArea !== 0
			) {
				dataRequest.areaLow = selectMinArea;
			}

			if (
				selectMaxArea !== null &&
				selectMaxArea !== undefined &&
				selectMaxArea !== "" &&
				selectMaxArea !== 0
			) {
				dataRequest.areaHigh = selectMaxArea;
				if (selectMinArea !== 0) {
					dataRequest.areaLow = 1;
				}
			}
		}
		console.log(dataRequest, "datarequest");

		if (!searchUser) {
			FilterInfoOfPostService.searchPropertiesWithFilter(dataRequest)
				.then((value) => {
					setIsSpin(false);
					const data = value.data;
					if (data.success) {
						const propertyList = data.propertyList[0];
						if (propertyList.count.length > 0) {
							setTotalPage(Math.ceil(propertyList.count[0].count / 30));

							setPropertiesItem(propertyList.pList);
						} else {
							setPropertiesItem([]);
						}
					} else {
						setPropertiesItem([]);
					}
				})
				.catch((e) => {
					setIsSpin(false);
					setPropertiesItem([]);
					console.log("không lấy được data property", e);
				});
		} else {
			FilterInfoOfPostService.searchUser(dataRequest)
				.then((value) => {
					setIsSpin(false);
					const data = value.data;
					if (data.success) {
						const userList = data.userList[0];
						if (userList.count.length > 0) {
							setTotalPage(Math.ceil(userList.count[0].count / 30));

							setUserListItem(userList.pList);
						} else {
							setUserListItem([]);
						}
					} else {
						setUserListItem([]);
					}
				})
				.catch(() => {
					setIsSpin(false);
					setUserListItem([]);
				});
		}
	};
	const onSearch = () => {
		clearFilter();
		setIsApplyFilter(false);
		handleFilterProperty(1, false);
	};

	useEffect(() => {
		handleFilterProperty(currentPage, isApplyFilter);
	}, [currentPage]);

	useEffect(() => {
		FilterInfoOfPostService.getOptionFilter().then((value) => {
			const cityData = [];
			value.data.cityList.forEach((item) => {
				cityData.push(item.name);
			});
			setFilterData(value.data.cityList);
			setCityFilter(cityData);
		});

		FilterInfoOfPostService.getAllPropertiesType()
			.then((value) => {
				console.log(value, "loại");
				if (value.data.success) {
					setKindOfBDS(value.data.list);
				} else {
					setKindOfBDS([]);
				}
			})
			.catch(() => {
				setKindOfBDS([]);
			});
	}, []);

	useEffect(() => {
		setSelectedDistrict("");
		setSelectedDistrictCode(null);
		if (selectedCity !== "") {
			const cityDataSearch = filterData.find((value) => value.name === selectedCity);
			setSelectedCityCode(cityDataSearch.code);
			console.log(cityDataSearch);
			const nameOfDistricts = [];
			cityDataSearch.districts.forEach((value) => {
				nameOfDistricts.push(value.name);
			});
			setDistrictFilter(nameOfDistricts);
		} else {
			setDistrictFilter([]);
		}
	}, [selectedCity]);

	useEffect(() => {
		let wardsData = [];
		setSelectedWard("");
		setSelectedWardCode(null);
		if (selectedCity !== "" && selectedCity !== null) {
			const cityData = filterData.find((value) => value.name === selectedCity);
			if (
				selectedDistrict !== "" &&
				selectedDistrict !== null &&
				cityData !== null &&
				cityData !== undefined
			) {
				setSelectedCityCode(cityData.code);
				const districtsData = cityData.districts.find((value) => value.name === selectedDistrict);
				if (districtsData !== null && districtsData !== undefined) {
					setSelectedDistrictCode(districtsData.code);
					console.log(districtsData);
					districtsData.wards.forEach((value) => {
						wardsData.push(value.name);
					});
				}
			}
		}
		setWardFilter(wardsData);
	}, [selectedDistrict]);

	useEffect(() => {
		if (selectedCity !== "" && selectedCity !== null) {
			const cityData = filterData.find((value) => value.name === selectedCity);
			if (
				selectedDistrict !== "" &&
				selectedDistrict !== null &&
				cityData !== null &&
				cityData !== undefined
			) {
				setSelectedCityCode(cityData.code);
				const districtsData = cityData.districts.find((value) => value.name === selectedDistrict);
				if (districtsData !== null && districtsData !== undefined) {
					setSelectedDistrictCode(districtsData.code);
					const wardData = districtsData.wards.find((value) => value.name === selectedWard);
					if (wardData) {
						setSelectedWardCode(wardData.code);
					}
				}
			}
		}
	}, [selectedWard]);

	useEffect(() => {
		handleFilterProperty(1, false);
	}, [searchUser]);

	useEffect(() => {
		setCurrentPage(1);
		setTotalPage(0);
		setSearchStringFilter("");
		clearFilter();

		if (searchUserOrProperty == "Cá nhân") {
			setIsApplyFilter(false);
			setSearchUser(true);
		} else {
			setSearchUser(false);
		}
	}, [searchUserOrProperty]);

	return (
		<>
			<Spin spinning={isSpin} tip="chờ xíu nhé...">
				<section className="hero">
					<div className="container">
						<span className="titleName"> Cho sự lựa chọn của bạn</span>
						<h3 className="titleH3"> Chọn những ưu đãi phù hợp nhất</h3>
						<form style={{ padding: "20px 0", width: "100%" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									margin: "auto",
									width: "100%",
								}}
							>
								<Space className="search_space" style={{ width: "100%" }}>
									<div style={{ width: "20%" }}>
										<Select
											fullWidth
											style={{ fontSize: 8 }}
											size="large"
											value={searchUserOrProperty}
											placeholder="Tìm kiếm theo"
											onChange={(value) => {
												setSearchUserOrProperty(value);
											}}
										>
											{searchTypeList && searchTypeList.map((value) => <Option value={value}>{value}</Option>)}
										</Select>
									</div>
									<div style={{ width: "100%" }}>
										<Search
											placeholder="Nhập từ khóa"
											allowClear
											enterButton="Tìm kiếm"
											size="large"
											fullWidth
											value={searchStringFilter}
											onChange={(e) => setSearchStringFilter(e.target.value)}
											onSearch={onSearch}
										/>
									</div>
								</Space>
							</div>
							{searchUserOrProperty == "Tin đăng" && (
								<div style={{ backgroundColor: "#f5f5ff", margin: "auto", width: "100%" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											margin: "auto",
											width: "100%",
										}}
									>
										<div className="box">
											<Select
												style={{ width: "100%", fontSize: 8 }}
												size="large"
												value={selectedKindOfPost !== "" ? selectedKindOfPost : null}
												showSearch
												placeholder="Loại tin"
												optionFilterProp="children"
												onChange={(value) => {
													setSelectedKindOfPost(value);
												}}
												filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
											>
												{kindOfPost && kindOfPost.map((value) => <Option value={value}>{value}</Option>)}
											</Select>
										</div>

										<div className="box">
											<Select
												style={{ width: "100%", fontSize: 8 }}
												size="large"
												value={selectedKindOfBDS !== "" ? selectedKindOfBDS : null}
												showSearch
												placeholder="Loại Nhà"
												optionFilterProp="children"
												onChange={(value) => {
													setSelectedKindOfBDS(value);
												}}
												filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
											>
												{kindOfBDS && kindOfBDS.map((value) => <Option value={value}>{value}</Option>)}
											</Select>
										</div>

										<div className="box">
											<Select
												style={{ width: "100%", fontSize: 8 }}
												size="large"
												value={selectedNumOfRoom !== "" ? selectedNumOfRoom : null}
												placeholder="Số phòng"
												onChange={(value) => {
													setSelectedNumOfRoom(value);
												}}
											>
												{numberOfRoomList &&
													numberOfRoomList.map((value) => (
														<Option value={value}>{value === 5 ? ">4" : value}</Option>
													))}
											</Select>
										</div>
									</div>

									<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
										<div className="box">
											<Select
												style={{ width: "100%", fontSize: 8 }}
												size="large"
												value={selectedCity !== "" ? selectedCity : null}
												showSearch
												placeholder="Thành phố/ Tỉnh"
												optionFilterProp="children"
												onChange={(value) => {
													setSelectedCity(value);
												}}
												filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
											>
												{cityFilter && cityFilter.map((value) => <Option value={value}>{value}</Option>)}
											</Select>
										</div>
										<div className="box">
											<Select
												style={{ width: "100%" }}
												size="large"
												showSearch
												value={selectedDistrict !== "" ? selectedDistrict : null}
												placeholder="Quận Huyện"
												optionFilterProp="children"
												onChange={(value) => {
													setSelectedDistrict(value);
												}}
												filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
											>
												{districtFilter &&
													districtFilter.map((value) => <Option value={value}>{value}</Option>)}
											</Select>
										</div>
										<div className="box">
											<Select
												size="large"
												style={{ width: "100%" }}
												showSearch
												placeholder="Phường/Xã"
												optionFilterProp="children"
												value={selectedWard !== "" ? selectedWard : null}
												onChange={(value) => {
													setSelectedWard(value);
												}}
												filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
											>
												{wardFilter && wardFilter.map((value) => <Option value={value}>{value}</Option>)}
											</Select>
										</div>
									</div>
									<div
										className="range-container"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: 10,
											margin: "auto",
										}}
									>
										<p style={{ padding: 0, margin: 0 }}>Mức giá:</p>
										<div>
											<InputNumber
												value={selectMinPrice}
												onChange={(e) => {
													setSelectedMinPrice(Number(e));
													setSelectRangePriceDefault([selectMinPrice, selectRangePriceDefault[0]]);
												}}
											/>
										</div>
										<div style={{ width: "60%" }}>
											<Slider
												range
												min={selectRangePriceDefault[0]}
												max={selectRangePriceDefault[1]}
												value={[selectMinPrice, selectMaxPrice]}
												onChange={(e) => {
													console.log(e, "price");
													setSelectedMinPrice(e[0]);
													setSelectedMaxPrice(e[1]);
												}}
											/>
										</div>
										<div>
											<InputNumber
												value={selectMaxPrice}
												onChange={(e) => {
													setSelectedMaxPrice(Number(e));
													setSelectRangePriceDefault([selectRangePriceDefault[0], selectMaxPrice]);
												}}
											/>
										</div>
									</div>

									<div
										className="range-container"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: 10,
											margin: "auto",
										}}
									>
										<p style={{ padding: 0, margin: 0 }}>Diện tích:</p>
										<div>
											<InputNumber
												value={selectMinArea}
												onChange={(e) => {
													setSelectedMinArea(Number(e));
													setSelectRangeAreaDefault([selectMinArea, selectRangeAreaDefault[0]]);
												}}
											/>
										</div>
										<div style={{ width: "60%" }}>
											<Slider
												range
												min={selectRangeAreaDefault[0]}
												max={selectRangeAreaDefault[1]}
												value={[selectMinArea, selectMaxArea]}
												onChange={(e) => {
													console.log(e, "Area");
													setSelectedMinArea(e[0]);
													setSelectedMaxArea(e[1]);
												}}
											/>
										</div>
										<div>
											<InputNumber
												value={selectMaxArea}
												onChange={(e) => {
													setSelectedMaxArea(Number(e));
													setSelectRangeAreaDefault([selectRangeAreaDefault[0], selectMaxArea]);
												}}
											/>
										</div>
									</div>
									<div
										style={{
											width: "100%",
											textAlign: "center",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div style={{ padding: 30 }}>
											<Button
												color="secondary"
												variant="contained"
												onClick={() => {
													setIsApplyFilter(true);
													handleFilterProperty(1, true);
												}}
											>
												Áp dụng
											</Button>
										</div>
										<div style={{ padding: 30 }}>
											<Button
												color="primary"
												variant="contained"
												onClick={() => {
													clearFilter();
													handleFilterProperty(1, false);
													setIsApplyFilter(false);
												}}
											>
												Hủy lọc
											</Button>
										</div>
									</div>
								</div>
							)}
						</form>
					</div>
				</section>
			</Spin>
		</>
	);
};

export default Banner;
