import React, { useState, useEffect } from "react";
import { Typography, Input, Button, Form, Spin } from "antd";
import { PostInfoApi } from "../../../api/navbar/NavBarOption";
import AlertDialog from "../../Dialog/AleartDialog";

const { Title } = Typography;

const ChangePassword = () => {
	const PostInfoService = PostInfoApi();
	const [isSpin, setIsSpin] = useState(false);
	// const [userInfo, setUserInfo] = useState(null);
	const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", acceptPassword: "" });
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);
	// useEffect(() => {
	// 	setIsSpin(true);
	// 	PostInfoService.getPersonalInfo(localStorage.getItem("token"))
	// 		.then((value) => {
	// 			const data = value.data;
	// 			if (data.success) {
	// 				console.log(data.user);
	// 				setUserInfo(data.user);
	// 			} else {
	// 				console.log("có lỗi xảy ra khi lấy thông tin người dùng");
	// 			}
	// 			setIsSpin(false);
	// 		})
	// 		.catch(() => {
	// 			setIsSpin(false);
	// 			console.log("có lỗi xảy ra khi lấy thông tin người dùng");
	// 		});
	// }, []);

	const handleChangePassword = () => {
		setIsSpin(true);
		if (formData.newPassword === formData.acceptPassword) {
			const dataRequest = {
				oldPassword: formData.oldPassword,
				newPassword: formData.newPassword,
			};
			PostInfoService.updateUserPassword(dataRequest, localStorage.getItem("token")).then((value) => {
				console.log(value, "pass");
				const data = value.data;
				if (data.success) {
					setIsClosableDialog(true);
					setIsMessageDialog("Đổi mật khẩu thành công.");
					setIsTypeDialog("success");
					setIsOpenDialog(true);
				} else {
					setIsClosableDialog(true);
					setIsMessageDialog(data.mes);
					setIsTypeDialog("error");
					setIsOpenDialog(true);
				}
				setIsSpin(false);
			});
		} else {
			setIsClosableDialog(true);
			setIsMessageDialog("Mật khẩu xác nhận không trùng khớp.");
			setIsTypeDialog("error");
			setIsOpenDialog(true);
			setIsSpin(false);
		}
	};
	return (
		<div className="container-section change-password">
			<Spin spinning={isSpin} tip="Chờ xíu nhé...">
				<Title className="title-section">Đổi mật khẩu</Title>

				<div className="content-section">
					<Form className="section-form" name="complex-form" style={{ margin: "0 auto" }}>
						<Form.Item
							name="oldPassword"
							rules={[
								{
									required: true,
									message: "Không được bỏ trống mục này",
								},
							]}
							style={{ width: "100%" }}
						>
							<Input.Password
								onChange={(e) => {
									setFormData({ ...formData, ["oldPassword"]: e.target.value });
								}}
								placeholder="Mật khẩu cũ"
								className="form-input"
							/>
						</Form.Item>
						<Form.Item
							name="newPassword"
							rules={[
								{
									required: true,
									message: "Không được bỏ trống mục này",
								},
							]}
							style={{
								display: "inline-block",
								width: "100%",
							}}
						>
							<Input.Password
								onChange={(e) => {
									setFormData({ ...formData, ["newPassword"]: e.target.value });
								}}
								placeholder="Mật khẩu mới"
								className="form-input"
							/>
						</Form.Item>
						<Form.Item
							name="cfNewPassword"
							rules={[
								{
									required: true,
									message: "Không được bỏ trống mục này",
								},
							]}
							style={{ width: "100%" }}
						>
							<Input.Password
								onChange={(e) => {
									setFormData({ ...formData, ["acceptPassword"]: e.target.value });
								}}
								placeholder="Xác nhận mật khẩu mới"
								className="form-input"
							/>
						</Form.Item>
						<div>
							<AlertDialog
								isOpen={isOpenDialog}
								type={isTypeDialog}
								message={isMesssageDialog}
								closable={isClosableDialog}
								onClose={() => {
									setIsOpenDialog(false);
								}}
							/>
						</div>
						<Form.Item colon={false}>
							<Button
								htmlType="submit"
								onClick={() => {
									handleChangePassword();
								}}
								className="btn-section-form"
							>
								Lưu thông tin
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Spin>
		</div>
	);
};

export default ChangePassword;
