import React, { useState } from "react";
import { Typography, Button, Result, Alert } from "antd";

import { accountApi } from "../../api/login/loginApi";
import AlertDialog from "../Dialog/AleartDialog";
const { Title } = Typography;

const SignupForm = () => {
	const accountApiService = accountApi();
	const [signUpSuccess, setSignUpSuccess] = useState(false);
	const [formData, setFormData] = useState({
		lastName: "",
		email: "",
		phone: "",
		password: "",
		cfPassword: "",
	});

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);

	const handleChangeInput = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		if (formData.password === formData.cfPassword) {
			const dataRequest = {
				email: formData.email,
				phone: formData.phone,

				lastName: formData.lastName,
				password: formData.password,
			};
			accountApiService
				.registerUser(dataRequest)
				.then((res) => {
					const value = res.data;
					if (value.success) {
						setSignUpSuccess(true);
					} else {
						setIsOpenDialog(true);
						setIsTypeDialog("error");
						setIsMessageDialog(value.mes);
						setIsClosableDialog(false);
					}
				})
				.catch((e) => {
					setIsOpenDialog(true);
					setIsTypeDialog("error");
					setIsMessageDialog("Có lỗi xảy ra");
					setIsClosableDialog(false);
				});
		} else {
			setIsOpenDialog(true);
			setIsTypeDialog("error");
			setIsMessageDialog("Mật khẩu không trùng khớp");
			setIsClosableDialog(false);
		}
	};

	return (
		<div className="section section-auth">
			{!signUpSuccess ? (
				<form onSubmit={onSubmit} className="form-auth">
					<Title className="form-title" level={1}>
						Đăng ký
					</Title>
					<Title className="form-sub-title" level={5}>
						Tạo một tài khoản để tận hưởng tất cả các dịch vụ mà không có bất kỳ quảng cáo miễn phí!
					</Title>
					<div className="form-group">
						<input
							type="text"
							name="lastName"
							placeholder="Họ tên"
							value={formData.lastName}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Địa chỉ email"
							value={formData.email}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group">
						<input
							type="tel"
							name="phone"
							placeholder="Số điện thoại"
							value={formData.phone}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							placeholder="Mật khẩu"
							value={formData.password}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="cfPassword"
							placeholder="Nhập lại mật khẩu"
							value={formData.cfPassword}
							onChange={handleChangeInput}
						/>
					</div>
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
					<div className="form-group">
						<Button onClick={onSubmit} type="primary" className="btn-submit">
							Đăng ký
						</Button>
					</div>
					<a
						onClick={() => {
							window.location = "/Login";
						}}
						className="form-link"
					>
						Về trang đăng nhập
					</a>
				</form>
			) : (
				<>
					<Result
						style={{ backgroundColor: "white", borderRadius: 10 }}
						status="success"
						title="Đăng kí thành công"
						subTitle="Quay lại trang đăng nhập"
						extra={[
							<Button
								onClick={() => {
									window.location = "/Login";
								}}
								type="primary"
								key="console"
							>
								Quay lại
							</Button>,
						]}
					/>
				</>
			)}
		</div>
	);
};

export default SignupForm;
