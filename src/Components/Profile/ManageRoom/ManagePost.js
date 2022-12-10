import React, { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Typography, Table, Button, Spin } from "antd";
import { roomColumns } from "../utils/configMenu";
import { PostInfoApi } from "../../../api/navbar/NavBarOption";

const { Title } = Typography;

const data = [
	{
		id: "1",
		name: "Cho thuê phòng cao cấp các kểu con đà đểu",
		img: "https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png",
		quantity: 20,
		available: 10,
		price: 1000000000,
		active: true,
	},
];

const ManageRoom = () => {
	const [useInfoInital, setuseInfoInital] = useState({});
	const PostInfoService = PostInfoApi();

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);

	const [openSubmit, setOpenSubmit] = useState(false);
	const [titleDialog, setTitleDialog] = useState("");
	const [contentDialog, setContentDialog] = useState("");

	const [isSpin, setIsSpin] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 5,
	});

	const [propertyTable, setPropertyTable] = useState([]);

	const editRoom = (data) => {
		console.log(data);
	};
	const deleteRoom = (id) => {
		console.log(id);
	};
	useEffect(() => {
		setIsSpin(true);
		PostInfoService.getPersonalInfo(localStorage.getItem("token"))
			.then((value) => {
				const data = value.data;
				if (data.success) {
					console.log(data.user);
					setUserInfo(data.user);
					setuseInfoInital(data.user);
				} else {
					console.log("có lỗi xảy ra khi lấy thông tin người dùng");
				}
				setIsSpin(false);
			})
			.catch(() => {
				setIsSpin(false);
				console.log("có lỗi xảy ra khi lấy thông tin người dùng");
			});
	}, []);

	useEffect(() => {
		if (userInfo !== null && userInfo !== undefined && userInfo !== {}) {
			const properties = userInfo.properties;
			setPropertyTable(properties);
		}
	}, [userInfo]);

	return (
		<div className="container-section manage-room">
			<Spin spinning={isSpin} tip="Đợi xíu nhé...">
				<Title className="title-section">Quản lý phòng ở</Title>
				<Button className="btn-add-room" type="default">
					<PlusCircleOutlined /> Thêm phòng
				</Button>
				<div className="content-section manage-room">
					<Table
						columns={roomColumns(editRoom, deleteRoom)}
						dataSource={propertyTable}
						pagination={{
							defaultPageSize: pagination.limit,
							pageSizeOptions: [5, 10, 20],
							showSizeChanger: true,
							position: ["topLeft"],
						}}
					/>
				</div>
			</Spin>
		</div>
	);
};

export default ManageRoom;
