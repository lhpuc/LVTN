import React from "react";
import Back from "../../Components/data/Back/Back";
import img from "../../assets/images//Business/phong-khach-dep.jpg";
import { HeartOutlined } from "@ant-design/icons";
import Introduce from "../Business/Introduce/Introduce";
import RealEstateInfomation from "./RealEstateInfomation/RealEstateInfomation";
import "./Business.css";
import NewForRent from "./NewForRent/NewForRent";
import Review from "./Review/Review";

const Business = () => {
  return (
    <>
      <section className="blog-out mb">
        <Back
          // name="Hãy liên hệ với chúng tôi"
          // title="Cần được tư vấn?"
          cover={img}
        />
        <div className="business">
          <div className="action">
            <div className="introduce">
              <h1>Nhà trọ sinh viên</h1>
            </div>
            <div className="action_heart">
              <div>
                <p> Theo dõi</p>
                <HeartOutlined />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Introduce />
      <RealEstateInfomation />
      <NewForRent />
      <Review />
    </>
  );
};

export default Business;
