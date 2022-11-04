import React, { useState } from "react";
import { Typography, Button, Result } from "antd";

import { accountApi } from "../../api/login/loginApi";
const { Title } = Typography;

const SignupForm = () => {
	const accountApiService = accountApi();
	const [signUpSuccess, setSignUpSuccess] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		cfPassword: "",
	});

	const [openPopUp, setOpenPopUp] = useState(false);

	const handleChangeInput = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		const dataRequest = {
			email: formData.email,
			phone: formData.phone,
			firstName: formData.firstName,
			lastName: formData.lastName,
			password: formData.password,
		};
		accountApiService
			.registerUser(dataRequest)
			.then((res) => {
				const value = res.data;
				if(value.success){
					setSignUpSuccess(true)
				}
				else{
					alert(value.mes);
				}
			})
			.catch((e) => {
				alert("somethings wrong")
			});
	};

	return (
		<div className="section section-auth">
			{
					!signUpSuccess?
			
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
						name="firstName"
						placeholder="Tên"
						value={formData.firstName}
						onChange={handleChangeInput}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						name="lastName"
						placeholder="Họ"
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
				<div className="form-group">
					<Button onClick={onSubmit} type="primary" className="btn-submit">
						Đăng ký
					</Button>
				</div>
				<a onClick={() => {window.location = '/Login'}} className="form-link">
					Về trang đăng nhập
				</a>
			</form> :<>
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
			</>}
			
		</div>
	);
};

export default SignupForm;
