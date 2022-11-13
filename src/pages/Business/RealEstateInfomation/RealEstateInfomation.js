import React, { useState } from "react";
import "./RealEstateInformation.css";

import { Typography, Table } from "antd";
import { postColumns } from "../Utils/ConfigInformation";

const { Title } = Typography;

const data = [
  {
    id: "1",
    name: "Nhà trọ 1",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cần bán",
    price: 1000000000,
    area: 20,
    empty: ["10", "100"],
  },
  {
    id: "2",
    name: "Nhà trọ 2",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cho thuê",
    price: 2000000000,
    area: 20,
    empty: ["10", "100"],
  },
  {
    id: "3",
    name: "Nhà trọ 3",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cần bán",
    price: 10000,
    area: 20,
    empty: ["10", "100"],
  },
  {
    id: "1",
    name: "Nhà trọ 1",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cho thuê",
    price: 1000000000,
    area: 20,
    empty: ["10", "100"],
  },
  {
    id: "2",
    name: "Nhà trọ 2",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cần bán",
    price: 2000000000,
    area: 20,
    empty: ["10", "100"],
  },
  {
    id: "3",
    name: "Nhà trọ 3",
    img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
    address: "New York No. 1 Lake Park",
    status: "Cho thuê",
    price: 10000,
    area: 20,
    empty: ["10", "100"],
  },
];
const RealEstateInfomation = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const deletePost = (id) => {
    console.log(id);
  };

  return (
    <section className="container_info container-section manage-post">
      <div className="container_info_section title-section ">
        <Title className="container_info_section_manager ">
          Quản lý tin đăng
        </Title>
        <div className="content-section manage-post">
          <Table
            columns={postColumns(deletePost)}
            dataSource={data}
            pagination={{
              defaultPageSize: pagination.limit,
              pageSizeOptions: [5, 10, 20],
              showSizeChanger: true,
              position: ["bottomRight"],
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RealEstateInfomation;
