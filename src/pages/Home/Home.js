import React from "react";
import Banner from "../../Components/Banner/Banner";
import { FeaturedProp } from "../../Components/FeaturedProp/FeaturedProp";

const Home = () => {
	return (
		<div>
			<Banner />
			<div className="mx-8 mb-8">
				<div className="flex1 flex-col my-24">
					<FeaturedProp />
				</div>
			</div>
		</div>
	);
};

export default Home;
