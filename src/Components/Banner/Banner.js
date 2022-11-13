import "./Banner.css";
import React, { useState, useEffect, useContext } from "react";
import { Slider, Input, Space, Select, Button } from "antd";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import { SearchFilterPostContext } from "../../context/searchFilterContext";

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
	} = useContext(SearchFilterPostContext);
	const [disabled] = useState(false);
	const [filterData, setFilterData] = useState([]);
	const [cityFilter, setCityFilter] = useState([]);
	const [isDisplayFilter, setIsDisplayFilter] = useState(false);
	const [districtFilter, setDistrictFilter] = useState([]);
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
					<form className="flex">
						<div className="search-container">
							<Space direction="vertical" className="search_space">
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
								placeholder="Dự án"
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
						<div className="box">
							<Select
								style={{ width: "100%", fontSize: 8 }}
								size="large"
								value={selectedCity !== "" ? selectedCity : null}
								showSearch
								placeholder="Diện tích"
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
						<div className="box">
							<Select
								size="large"
								style={{ width: "100%" }}
								showSearch
								placeholder="Đường Xá"
								optionFilterProp="children"
								onChange={(value) => {
									console.log(value);
								}}
								filterOption={(input, option) => option.value.includes(input.toString().toLowerCase())}
							>
								{cityFilter && cityFilter.map((value) => <Option value={value}>{value.name}</Option>)}
							</Select>
						</div>
						<div className="range-container">
							<span className="number">0</span>
							<Slider range defaultValue={[20, 100]} disabled={disabled} />
							<span className="number">100</span>
						</div>

						<div className="btn1">
							<Button onClick={() => clearFilter()}>Hủy lọc</Button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Banner;
