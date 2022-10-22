import React from "react";
import Banner from "../../Components/Banner/Banner";
import { FeaturedProp } from "../../Components/FeaturedProp/FeaturedProp";
import { SearchFilterPostProvider } from "../../context/searchFilterContext";

const Home = () => {
	return (
		<SearchFilterPostProvider>
			<div>
				<Banner />
				<div className="mx-8 mb-8">
					<div className="flex1 flex-col my-24">
						<FeaturedProp />
					</div>
				</div>
			</div>
		</SearchFilterPostProvider>
	);
};

export default Home;
