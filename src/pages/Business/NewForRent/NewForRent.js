import React from "react";
import { FeaturedProp } from "../../../Components/FeaturedProp/FeaturedProp";
import { SearchFilterPostProvider } from "../../../context/searchFilterContext";

const NewForRent = () => {
  return (
    <SearchFilterPostProvider>
      <section>
        <div>
          <div className="mx-8 mb-8">
            <div className="flex1 flex-col my-24">
              <FeaturedProp />
			  hvsdjbdskhbsdkjnsd
            </div>
          </div>
        </div>
      </section>
    </SearchFilterPostProvider>
  );
};

export default NewForRent;
