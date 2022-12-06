import "./Banner.css";
import React, { useState, useEffect, useContext } from "react";
import { Slider, Input, Space, Select } from "antd";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import { InputNumber } from "antd";
import { Button } from "@mui/material";

const Banner = () => {
	const FilterInfoOfPostService = FilterInfoOfPostApi();
	const { Search } = Input;

	const { Option } = Select;
	const {
		propertiesItem,
		setPropertiesItem,
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
	} = useContext(SearchFilterPostContext);
	const [disabled] = useState(false);
	const [filterData, setFilterData] = useState([]);
	const [cityFilter, setCityFilter] = useState([]);
	const [isDisplayFilter, setIsDisplayFilter] = useState(false);
	const [districtFilter, setDistrictFilter] = useState([]);
	const [selectRangePriceDefault, setSelectRangePriceDefault] = useState([0, 10000000]);
	const [selectRangeAreaDefault, setSelectRangeAreaDefault] = useState([0, 200]);

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
	const onSearch = (value) => {
		setSearchStringFilter(value);
		const dataRequest = {
			name: value,
			city: selectedCity,
			district: selectedDistrict,
		};
		console.log(dataRequest, "datarequest");

		FilterInfoOfPostService.searchPropertiesWithFilter(dataRequest)
			.then((value) => {
				console.log(value, value.statusText);
				if (value.statusText == "OK") {
					console.log("phuc");
					setPropertiesItem(value.data.property);
				}
			})
			.catch((e) => {
				console.log("không lấy được data property", e);
			});
	};

	useEffect(() => {
		FilterInfoOfPostService.getOptionFilter().then((value) => {
			const cityData = [];
			value.data.cityList.forEach((item) => {
				cityData.push(item.name);
			});
			setFilterData(value.data.cityList);
			setCityFilter(cityData);
		});
	}, []);

	useEffect(() => {
		setSelectedDistrict("");
		if (selectedCity !== "") {
			const cityDataSearch = filterData.find((value) => value.name === selectedCity);
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
		FilterInfoOfPostService.getAllProperties()
			.then((value) => {
				if (value.statusText === "OK") {
					setPropertiesItem(value.data.property);
				} else {
					setPropertiesItem([]);
				}
			})
			.catch((e) => {
				console.log("unsuccessful");
			});
	}, []);

	return (
		<>
			<section className="hero">
				<div className="container">
					<span className="titleName"> Cho sự lựa chọn của bạn</span>
					<h3 className="titleH3"> Chọn những ưu đãi phù hợp nhất</h3>
					<form style={{ padding: "20px 0" }}>
						<div className="search-container">
							<Space className="search_space">
								<Select
									style={{ width: "100%", fontSize: 8 }}
									size="large"
									value={selectedCity !== "" ? selectedCity : null}
									showSearch
									placeholder="Tìm kiếm theo"
									optionFilterProp="children"
									onChange={(value) => {
										setSelectedCity(value);
									}}
									filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
								>
									{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
								</Select>
								<Search
									className="search"
									placeholder="Nhập từ khóa"
									allowClear
									enterButton="Tìm kiếm"
									size="large"
									onSearch={onSearch}
								/>
							</Space>
						</div>
						<div style={{ backgroundColor: "#f5f5ff" }}>
							<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<div className="box">
									<Select
										style={{ width: "100%", fontSize: 8 }}
										size="large"
										value={selectedCity !== "" ? selectedCity : null}
										showSearch
										placeholder="Loại Nhà"
										optionFilterProp="children"
										onChange={(value) => {
											setSelectedCity(value);
										}}
										filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
									>
										{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
									</Select>
								</div>

								<div className="box">
									<Select
										style={{ width: "100%", fontSize: 8 }}
										size="large"
										value={selectedCity !== "" ? selectedCity : null}
										showSearch
										placeholder="Số phòng"
										optionFilterProp="children"
										onChange={(value) => {
											setSelectedCity(value);
										}}
										filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
									>
										{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
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
										{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
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
											districtFilter.map((value) => <Option value={value}>{value.name}</Option>)}
									</Select>
								</div>
								<div className="box">
									<Select
										size="large"
										style={{ width: "100%" }}
										showSearch
										placeholder="Phường/Xã"
										optionFilterProp="children"
										onChange={(value) => {
											console.log(value);
										}}
										filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
									>
										{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
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
								<InputNumber
									value={selectMinPrice}
									onChange={(e) => {
										setSelectedMinPrice(Number(e));
										setSelectRangePriceDefault([selectMinPrice, selectRangePriceDefault[0]]);
									}}
								/>
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
								<InputNumber
									value={selectMaxPrice}
									onChange={(e) => {
										setSelectedMaxPrice(Number(e));
										setSelectRangePriceDefault([selectRangePriceDefault[0], selectMaxPrice]);
									}}
								/>
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
								<InputNumber
									value={selectMinArea}
									onChange={(e) => {
										setSelectedMinArea(Number(e));
										setSelectRangeAreaDefault([selectMinArea, selectRangeAreaDefault[0]]);
									}}
								/>
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
								<InputNumber
									value={selectMaxArea}
									onChange={(e) => {
										setSelectedMaxArea(Number(e));
										setSelectRangeAreaDefault([selectRangeAreaDefault[0], selectMaxArea]);
									}}
								/>
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
									<Button color="secondary" variant="contained" onClick={() => clearFilter()}>
										Áp dụng
									</Button>
								</div>
								<div style={{ padding: 30 }}>
									<Button color="primary" variant="contained" onClick={() => clearFilter()}>
										Hủy lọc
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Banner;
