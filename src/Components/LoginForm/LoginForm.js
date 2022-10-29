import { Typography, Button } from "antd";
import React, { useState } from "react";
import { accountApi } from "../../api/login/loginApi";
const { Title } = Typography;

const LoginForm =()=> {
	const accountApiService = accountApi();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChangeInput = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		fetch("https://lvtn2022real.herokuapp.com/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: formData.email, password: formData.password }),
		})
			.then((res) => {
				if (res.ok) return res.json();
			})
			.then((result) => {
				if (result.success) {
					localStorage.setItem("token", result.token);
					alert(result.mes);
				} else {
					alert(result.mes);
				}
			});
	};

	return (
		<div className="section section-auth">
			<form onSubmit={onSubmit} className="form-auth">
				<Title className="form-title" level={1}>
					Đăng nhập
				</Title>
				<Title className="form-sub-title" level={5}>
					Hãy đăng nhập để có thể sử dụng tất cả các tính năng của trang web!
				</Title>
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
						type="password"
						name="password"
						placeholder="Mật khẩu"
						value={formData.password}
						onChange={handleChangeInput}
					/>
				</div>
				<div className="form-group">
					<Button
						type="primary"
						className="btn-submit"
						onClick={(e) => {
							onSubmit(e);
						}}
					>
						Đăng nhập
					</Button>
				</div>
				<a onClick={(e) => e.preventDefault()} className="form-link">
					Quên mật khẩu
				</a>
				<a onClick={(e) => e.preventDefault()} className="form-link">
					Tạo tài khoản
				</a>
			</form>
		</div>
	);
}

export default LoginForm;
