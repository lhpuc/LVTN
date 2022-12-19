import React from "react";
import { Col, Row } from "antd";
import { PhoneOutlined, FacebookOutlined, MailOutlined, HeatMapOutlined } from "@ant-design/icons";
import "./Introduce.css";
import { introduceData } from "../../../Components/data/IntroduceData/IntroduceData";

const Introduce = ({ user }) => {
	return (
		<>
			<Row className="Introduce_container">
				<Col
					className=" introduce_container_infomation"
					lg={{ span: 7, offset: 1 }}
					style={{ border: "10px solid #fff", color: "#fff", backgroundColor: "#1f394d" }}
				>
					<div style={{ textAlign: "center", fontWeight: "bolder", fontSize: 30 }}>Liên hệ</div>

					<div>
						<div className="icon_infomation">
							<PhoneOutlined />
							<p>{user?.phone}</p>
						</div>

						<div className="icon_infomation">
							<MailOutlined />
							<p>{user?.email}</p>
						</div>
						<div className="icon_infomation">
							<HeatMapOutlined />
							<p>{user?.address}</p>
						</div>
						<div className="icon_infomation">
							<iframe src={user?.mapAddress} />
						</div>
					</div>
				</Col>
				<Col
					className=" introduce_container_infomation"
					lg={{ span: 14, offset: 1 }}
					style={{
						border: "10px solid #1f394d",
						backgroundColor: "#fff",
						color: "#1f394d",
					}}
				>
					<h4 style={{ textAlign: "center", fontWeight: "bolder", fontSize: 30, color: "#1f394d" }}>
						Giới thiệu doanh nghiệp
					</h4>

					<div>{user?.desc}</div>
				</Col>
			</Row>
		</>
	);
};

export default Introduce;
