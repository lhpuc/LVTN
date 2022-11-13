import React from "react";
import "./Important.css";
import { productdata } from "../../../Components/data/importantData";
import Flash from "react-reveal/Flash";

export default function Important() {
  return (
    <section className=" Section2" id="/Product">
      <div className="title2">
        {/* <h1>
          <span>Prominent House</span> All the time!
        </h1> */}
      </div>
      <div className="products">
        {productdata.map((product) => {
          return (
            <div className="product">
              <Flash>
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
              </Flash>
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <p>{product.decription}</p>
              <button>Thuê ngay</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
