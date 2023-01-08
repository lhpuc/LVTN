import React from "react";
import { Col, Row } from "antd";
import "./Review.css";
import Rating from "../../../Components/Rating/Rating";
import Comments from "../../../Components/Comments/Comments";

const Review = ({ id }) => {
	return (
		<>
			<Row className="Introduce_container">
				<Col className=" introduce_container_infomation" lg={{ span: 14, offset: 1 }}>
					<h4> Đánh giá</h4>
					<Comments />
				</Col>
			</Row>
		</>
	);
};

export default Review;
