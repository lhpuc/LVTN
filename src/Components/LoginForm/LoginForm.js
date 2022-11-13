import { Typography, Button, Result } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { accountApi } from "../../api/login/loginApi";
import AuthContext from "../../context/AuthProvider";
const { Title } = Typography;

const LoginForm = () => {
	const { auth, setAuth, setIsLogin, isLogin } = useContext(AuthContext);

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

	useEffect(() => {
		console.log(localStorage.token, "cêc", isLogin, "islogin", auth);
	}, [isLogin]);

	const onSubmit = (e) => {
		e.preventDefault();
		const dataRequest = { email: formData.email, password: formData.password };
		accountApiService
			.logInUser(dataRequest)
			.then((res) => {
				if (res.status === 200) {
					const result = res.data;
					if (result.success) {
						console.log(result);
						localStorage.setItem("token", result.token);
						const accessToken = result.token;
						setAuth({ accessToken: accessToken });
					} else {
						alert(result.mes);
						setFormData({
							email: "",
							password: "",
						});
					}
				} else {
					alert("lỗi khi xác thực");
				}
			})
			.catch(() => {
				alert("server bị lỗi");
			});
	};

	return (
		<div className="section section-auth">
			{!isLogin ? (
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
					<a href="/Signup" className="form-link">
						Tạo tài khoản
					</a>
				</form>
			) : (
				<>
					<Result
						style={{ backgroundColor: "white", borderRadius: 10 }}
						status="success"
						title="Đăng nhập thành công"
						subTitle="Quay lại trang chủ"
						extra={[
							<Button
								onClick={() => {
									window.location = "/";
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

export default LoginForm;
