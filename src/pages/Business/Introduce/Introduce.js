import React from "react";
import { Col, Row } from "antd";
import {
  PhoneOutlined,
  FacebookOutlined,
  MailOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import "./Introduce.css";
import { introduceData } from "../../../Components/data/IntroduceData/IntroduceData";


const Introduce = () => {
  return (
    <>
      <Row className="Introduce_container">
        <Col
          className=" introduce_container_infomation"
          lg={{ span: 7, offset: 1 }}
        >
          <h4> Liên hệ</h4>
          {introduceData.map((infomation) => {
            return (
              <div>
                <div className="icon_infomation">
                  {" "}
                  <PhoneOutlined />
                  <p>{infomation.phoneNumber}</p>
                </div>
                <div className="icon_infomation">
                  <FacebookOutlined />
                  <p>{infomation.facebook}</p>
                </div>
                <div className="icon_infomation">
                  <MailOutlined />
                  <p>{infomation.email}</p>
                </div>
                <div className="icon_infomation">
                  <HeatMapOutlined />
                  <p>{infomation.location}</p>
                </div>
              </div>
            );
          })}
        </Col>
        <Col
          className=" introduce_container_infomation"
          lg={{ span: 14, offset: 1 }}
        >
          <h4> Giới thiệu doanh nghiệp</h4>
          {introduceData.map((infomation) => {
            return (
              <div>
                <p>{infomation.infomation}</p>
                <h1> Tầm nhìn</h1>
                <p>{infomation.view}</p>
                <h1>Nhiệm vụ</h1>
                <p>{infomation.mission}</p>
              </div>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Introduce;
