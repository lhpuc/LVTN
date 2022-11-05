import React from "react";
import { Col, Row } from "antd";
import "./Review.css";
import Rating from "../../../Components/Rating/Rating";
import Comments from "../../../Components/Comments/Comments";

const Review = () => {
  return (
    <>
      <Row className="Introduce_container">
        <Col
          className=" introduce_container_infomation"
          lg={{ span: 14, offset: 1 }}
        >
          <h4> Đánh giá</h4>
          <Comments />
        </Col>
        <Col
          className=" introduce_container_infomation"
          lg={{ span: 7, offset: 1 }}
        >
          <h4> Bình luận</h4>
          <div className="totalstart">4/5</div>
          <Rating />
        </Col>
      </Row>
    </>
  );
};

export default Review;
