import React, { useState } from "react";
import "./RealEstateInformation.css";

import { Typography, Table } from "antd";
import { postColumns } from "../Utils/ConfigInformation";

const { Title } = Typography;

const RealEstateInfomation = ({ post }) => {
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
				<Title className="container_info_section_manager ">Tin Đăng</Title>
				<div className="content-section manage-post">
					<Table
						columns={postColumns(deletePost)}
						dataSource={post}
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
