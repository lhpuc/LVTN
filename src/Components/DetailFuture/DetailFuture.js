import React from "react";
import "./FeaturedProp.css";
export const DetailFuture = ({ properties }) => {
  return (
    <div className="property-list justify-evenly flex1 flex-row">
      {properties.map((property) => (
        <div className="relative box-content mx-3 w-80 h-fit rounded-lg border border-gray-400">
          <div className="z-0 m-0 w-fit">
            <img
              className="rounded-t-lg"
              src={property.propertyImage}
              alt={property.propAlt}
              srcset=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};
