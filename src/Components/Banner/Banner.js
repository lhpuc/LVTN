import "./Banner.css";
import React, { useState, useEffect, useContext } from "react";
import { Slider, Input, Space, Select, Button } from "antd";
import { FilterInfoOfPost } from "../../api/home/InfoOfFilter";
import { SearchFilterPostContext } from "../../context/searchFilterContext";

const Banner = () => {
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
	const [districtFilter, setDistrictFilter] = useState([]);
	const onSearch = (value) => {
		setSearchStringFilter(value);
	};

	useEffect(() => {
		FilterInfoOfPost.getOptionFilter().then((value) => {
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

	const searchProperties = () => {
		const cityDataSearch = filterData.find((value) => value.name === selectedCity);
		let cityCodeFilter = "";
		if (cityDataSearch !== undefined && cityDataSearch !== null) {
			cityCodeFilter = cityDataSearch.code.toString();
		}
		const districtDataSearch = cityDataSearch.districts.find((value) => value.name === selectedDistrict);
		let districtCodeFilter = "";
		if (districtDataSearch !== undefined && districtDataSearch !== null) {
			districtCodeFilter = districtDataSearch.code.toString();
		}

		const dataRequest = {
			name: searchStringFilter,
			cityCode: cityCodeFilter,
			districtCode: districtCodeFilter,
		};
		console.log(dataRequest,'datarequest')

		FilterInfoOfPost.searchPropertiesWithFilter(dataRequest)
			.then((value) => {

				console.log(value,value.statusText);
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
		FilterInfoOfPost.getAllProperties()
			.then((value) => {
				if (value.statusText === "OK") {
					setPropertiesItem(value.data.property);
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
							<select class="form-select">
								<option value="volvo" hidden selected>
									Loại nhà
								</option>
								<option value="volvo">huathisonsdsfsdf</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
							</select>
						</div>
						<div className="box">
							<select class="form-select">
								<option value="volvo" hidden selected>
									Dự án
								</option>
								<option value="volvo">huathisonsdsfsdf</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
							</select>
						</div>
						<div className="box">
							<select class="form-select">
								<option value="volvo" hidden selected>
									Số phòng
								</option>
								<option value="volvo">huathisonsdsfsdf</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
							</select>
						</div>
						<div className="box">
							<select class="form-select">
								<option value="volvo" hidden selected>
									Diện tích
								</option>
								<option value="volvo">huathisonsdsfsdf</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
							</select>
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
							<Button onClick={() => searchProperties()}>
								<i className="fa fa-search"></i>
							</Button>
							<Button onClick={() => clearFilter()}>Hủy lọc</Button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Banner;
