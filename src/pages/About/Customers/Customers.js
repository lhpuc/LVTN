import React from "react";
import { customersData } from "../../../Components/data/customersSay";
// import avatar1 from "../assets/avatar1.jpeg";
import "./Customers.css";

export default function Customers() {
  return (
    <section id="testimonials" className="section1">
      <div className="container1">
        <h4 className="BlogHeading">Chúng tôi</h4>
        <div className="testimonials">
          {customersData.map((testimonials) => {
            return (
              <div className="testimonial">
                <div className="image">
                  <img src={testimonials.image} alt="" />
                </div>
                <p>
                  {testimonials.description}
                  <span>{testimonials.title}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
