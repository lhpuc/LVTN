import React from "react";
// import Zoom from "react-reveal/Zoom";
import "./maketing.css";
const Marketing = () => {
  return (
    <>
      <div className="MarketingSection" id="/Marketing">
        <h3 className="MarketingHeading">Marketing</h3>
        <div className="MarketingWrap">
          <img
            style={{ width: "50%", maxWidth: "50%" }}
            src="https://thietkenoithatktv.com/wp-content/uploads/thiet-ke-biet-thu-dep-2-tang-01.jpg"
            alt="#"
          />
          {/* <Zoom> */}

          <div className="MarketingContent">
            <h3>Chiến lược maketing</h3>
            <h5>PSM</h5>
            <p>
              Marketing bất động sản là thuật ngữ chuyên dùng để chỉ những người
              làm marketing trong lĩnh vực kinh doanh bất động sản, mua bán và
              cho thuê nhà đất.Người làm marketing ngành bất động sản phải có
              những hiểu biết tổng thể về nền kinh tế; sự phát triển của cơ sở
              hạ tầng; đặc điểm của vị trí, xu hướng của xã hội trong quá khứ,
              hiện tại và tương lai
            </p>
          </div>
          {/* </Zoom> */}
        </div>
      </div>
    </>
  );
};

export default Marketing;
