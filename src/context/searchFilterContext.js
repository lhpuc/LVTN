import React, { useState, createContext } from "react";

export const SearchFilterPostContext = createContext();

export const SearchFilterPostProvider = ({ children }) => {
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	const [searchStringFilter, setSearchStringFilter] = useState("");
	const [selectMinPrice, setSelectedMinPrice] = useState(0);
	const [selectMaxPrice, setSelectedMaxPrice] = useState(0);
	const [propertiesItem,setPropertiesItem] = useState([]);
	const clearFilter = () => {
		setSelectedDistrict("");
		setSelectedCity("");
		setSelectedMinPrice(0);
		setSelectedMaxPrice(0);
	};

	return (
		<>
			<SearchFilterPostContext.Provider
				value={{
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
				}}
			>
				{children}
			</SearchFilterPostContext.Provider>
		</>
	);
};
