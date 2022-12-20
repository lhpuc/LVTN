import React, { useState, createContext } from "react";

export const SearchFilterPostContext = createContext();

export const SearchFilterPostProvider = ({ children }) => {
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedWard, setSelectedWard] = useState("");

	const [selectedDistrictCode, setSelectedDistrictCode] = useState(null);
	const [selectedCityCode, setSelectedCityCode] = useState(null);
	const [selectedWardCode, setSelectedWardCode] = useState(null);

	const [searchStringFilter, setSearchStringFilter] = useState("");
	const [selectMinPrice, setSelectedMinPrice] = useState(0);
	const [selectMaxPrice, setSelectedMaxPrice] = useState(0);
	const [selectMinArea, setSelectedMinArea] = useState(0);
	const [selectMaxArea, setSelectedMaxArea] = useState(0);
	const [propertiesItem, setPropertiesItem] = useState([]);
	const [searchUserOrProperty, setSearchUserOrProperty] = useState("Tin đăng"); //false: property , true: user
	const [userListItem, setUserListItem] = useState([1, 2, 3]);
	const [selectedKindOfBDS, setSelectedKindOfBDS] = useState("");
	const [selectedNumOfRoom, setSelectedNumOfRoom] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [comparePropertyItem, setComparePropertyItem] = useState([]);
	const [user, setUser] = useState(null);

	const clearFilter = () => {
		setSelectedDistrict("");
		setSelectedCity("");
		setSelectedMinPrice(0);
		setSelectedMaxPrice(0);
		setSelectedMinArea(0);
		setSelectedMaxArea(0);
		setSelectedKindOfBDS("");
		setSelectedNumOfRoom(null);
		setSelectedWard("");
		setSelectedCityCode(null);
		setSelectedDistrictCode(null);
		setSelectedWardCode(null);
	};
	return (
		<>
			<SearchFilterPostContext.Provider
				value={{
					selectedWard,
					setSelectedWard,
					selectedKindOfBDS,
					setSelectedKindOfBDS,
					selectedNumOfRoom,
					setSelectedNumOfRoom,
					userListItem,
					setUserListItem,
					searchUserOrProperty,
					setSearchUserOrProperty,
					propertiesItem,
					setPropertiesItem,
					searchStringFilter,
					setSearchStringFilter,
					clearFilter,
					selectedDistrict,
					setSelectedDistrict,
					selectedCity,
					setSelectedCity,
					selectMinPrice,
					setSelectedMinPrice,
					selectMaxPrice,
					setSelectedMaxPrice,
					selectMinArea,
					setSelectedMinArea,
					selectMaxArea,
					setSelectedMaxArea,
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
					comparePropertyItem,
					setComparePropertyItem,
					user,
					setUser,
				}}
			>
				{children}
			</SearchFilterPostContext.Provider>
		</>
	);
};
