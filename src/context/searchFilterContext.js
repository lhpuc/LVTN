import React, { useState, createContext } from "react";

export const SearchFilterPostContext = createContext();

export const SearchFilterPostProvider = ({ children }) => {
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	const [searchStringFilter, setSearchStringFilter] = useState("");
	const [selectMinPrice, setSelectedMinPrice] = useState(0);
	const [selectMaxPrice, setSelectedMaxPrice] = useState(0);
	const [selectMinArea, setSelectedMinArea] = useState(0);
	const [selectMaxArea, setSelectedMaxArea] = useState(0);
	const [propertiesItem, setPropertiesItem] = useState([]);
	const [searchUserOrProperty, setSearchUserOrProperty] = useState(false); //false: property , true: user
	const [userListItem, setUserListItem] = useState([]);
	const clearFilter = () => {
		setSelectedDistrict("");
		setSelectedCity("");
		setSelectedMinPrice(0);
		setSelectedMaxPrice(0);
		setSelectedMinArea(0);
		setSelectedMaxArea(0);
	};
	return (
		<>
			<SearchFilterPostContext.Provider
				value={{
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
				}}
			>
				{children}
			</SearchFilterPostContext.Provider>
		</>
	);
};
