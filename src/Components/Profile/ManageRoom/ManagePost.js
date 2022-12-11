import React, { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Typography, Table, Button, Spin } from "antd";
import { roomColumns } from "../utils/configMenu";
import { PostInfoApi } from "../../../api/navbar/NavBarOption";
import { FilterInfoOfPostApi } from "../../../api/home/InfoOfFilter";
import DialogCustome from "../../DialogCustome/DialogCustome";
import AlertDialog from "../../Dialog/AleartDialog";

const { Title } = Typography;

const ManageRoom = () => {
	const [useInfoInital, setuseInfoInital] = useState({});
	const PostInfoService = PostInfoApi();
	const FilterInfoOfPostService = FilterInfoOfPostApi();

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
	const [isDeleteProperty, setIsDeleteProperty] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

	const editRoom = (data) => {
		window.location = `/edit-post?id=${data}`;
	};
	const deleteRoom = (id) => {
		setOpenSubmit(true);
		setTitleDialog("Xóa bài đăng");
		setContentDialog("Bạn có chắc muốn xóa bài đăng này?");
		setDeleteId(id);
		setIsDeleteProperty(true);
	};

	const handleDeleteProperty = () => {
		if (deleteId !== "" && deleteId !== null && deleteId !== undefined) {
			FilterInfoOfPostService.deletePostInfoById(deleteId, localStorage.getItem("token"))
				.then((json) => {
					console.log(json);
					const data = json.data;
					if (data.success) {
						setIsOpenDialog(true);
						setIsMessageDialog("Xóa tin đăng thành công.");
						setIsClosableDialog(true);
						setIsTypeDialog("success");
						setIsDeleteProperty(false);
						setDeleteId("");
						setIsDeleteSuccess(true);
					} else {
						setIsOpenDialog(true);
						setIsMessageDialog("Xóa tin đăng không thành công.");
						setIsClosableDialog(true);
						setIsTypeDialog("error");
					}
				})
				.catch(() => {
					setIsOpenDialog(true);
					setIsMessageDialog("Xóa tin đăng không thành công.");
					setIsClosableDialog(true);
					setIsTypeDialog("error");
				});
		}
	};
	useEffect(() => {
		if (isDeleteSuccess) {
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
		}
	}, [isDeleteSuccess]);

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
				<AlertDialog
					isOpen={isOpenDialog}
					type={isTypeDialog}
					message={isMesssageDialog}
					closable={isClosableDialog}
					onClose={() => {
						setIsOpenDialog(false);
					}}
				/>
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
			<DialogCustome
				open={openSubmit}
				handleSubmit={() => {
					if (isDeleteProperty) {
						handleDeleteProperty();
					}
					setOpenSubmit(false);
				}}
				handleClose={() => {
					setOpenSubmit(false);
				}}
				title={titleDialog}
				content={contentDialog}
			/>
		</div>
	);
};

export default ManageRoom;
