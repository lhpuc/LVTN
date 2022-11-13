import React from "react";
import Back from "../../Components/data/Back/Back";
import img from "../../assets/images/About/images1.jpg";
import Customers from "../About/Customers/Customers";
import Blog from "../About/Blog/Blog";
import Important from "../About/Important/Important";
import Marketing from "../About/Maketing/Maketing";
import "./about.css";
import Bounce from "react-reveal/Bounce";
const About = () => {
  return (
    <>
      <section className="blog-out mb">
        <Bounce left>
          <Back
            name=" Giới thiệu"
            title="Đồng hành cùng chúng tôi - PSM"
            cover={img}
          />
        </Bounce>
      </section>
      <Marketing />
      <Customers />
      <Blog />
      <Important />
    </>
  );
};

export default About;
