import { Typography, Button, Result } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { accountApi } from "../../api/login/loginApi";
import AuthContext from "../../context/AuthProvider";
import AlertDialog from "../Dialog/AleartDialog";
const { Title } = Typography;

const LoginForm = () => {
	const { auth, setAuth, setIsLogin, isLogin } = useContext(AuthContext);
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isTypeDialog, setIsTypeDialog] = useState("warning");
	const [isMesssageDialog, setIsMessageDialog] = useState("");
	const [isClosableDialog, setIsClosableDialog] = useState(true);

	const [forgetPassword, setForgetPassword] = useState(false);
	const [sendRequestGet, setSendRequestGet] = useState(false);

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
						setIsOpenDialog(true);
						setIsTypeDialog("error");
						setIsMessageDialog(result.mes);
						setIsClosableDialog(false);

						setFormData({
							email: "",
							password: "",
						});
					}
				} else {
					setIsOpenDialog(true);
					setIsTypeDialog("error");
					setIsMessageDialog("Có lỗi khi xác thực");
					setIsClosableDialog(false);
				}
			})
			.catch(() => {
				setIsOpenDialog(true);
				setIsTypeDialog("error");
				setIsMessageDialog("Server bị lỗi");
				setIsClosableDialog(false);
			});
	};

	useEffect(() => {
		if (sendRequestGet) {
			setTimeout(() => {
				setSendRequestGet(false);
			}, [10000]);
		}
	}, [sendRequestGet]);

	const handleGetPassword = () => {
		console.log("getpasswoed");

		const dataRequest = {
			email: formData.email,
		};
		accountApiService
			.getForgetPassword(dataRequest)
			.then((value) => {
				console.log(value, "folor");
				const data = value.data;
				if (data.success) {
					setIsOpenDialog(true);
					setIsClosableDialog(true);
					setIsMessageDialog(data.mes);
					setIsTypeDialog("success");
				} else {
					setIsOpenDialog(true);
					setIsClosableDialog(true);
					setIsMessageDialog(data.mes);
					setIsTypeDialog("error");
				}
			})
			.catch(() => {
				setIsOpenDialog(true);
				setIsClosableDialog(true);
				setIsMessageDialog("Có lỗi xảy ra.");
				setIsTypeDialog("error");
			});
	};

	return (
		<div className="section section-auth">
			{!isLogin ? (
				<>
					{!forgetPassword ? (
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
							<AlertDialog
								isOpen={isOpenDialog}
								type={isTypeDialog}
								message={isMesssageDialog}
								closable={isClosableDialog}
								onClose={() => {
									setIsOpenDialog(false);
								}}
							/>
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
							<a
								onClick={(e) => {
									e.preventDefault();
									setForgetPassword(true);
								}}
								className="form-link"
							>
								Quên mật khẩu
							</a>
							<NavLink to="/Signup" className="form-link">
								Tạo tài khoản
							</NavLink>
						</form>
					) : (
						<>
							<form onSubmit={handleGetPassword} className="form-auth">
								<Title className="form-title" level={1}>
									Quên mật khẩu
								</Title>
								<div className="form-group" style={{ padding: "30px 0px 20px 0px" }}>
									<input
										type="email"
										name="email"
										placeholder="Nhập email"
										value={formData.email}
										onChange={handleChangeInput}
									/>
								</div>
								<AlertDialog
									isOpen={isOpenDialog}
									type={isTypeDialog}
									message={isMesssageDialog}
									closable={isClosableDialog}
									onClose={() => {
										setIsOpenDialog(false);
									}}
								/>
								<div className="form-group">
									<Button
										disabled={sendRequestGet}
										type="primary"
										className="btn-submit"
										style={{ color: "#fff" }}
										onClick={(e) => {
											e.preventDefault();
											if (formData.email !== "" && formData.email !== null && formData.email !== undefined) {
												setSendRequestGet(true);

												setIsOpenDialog(true);
												setIsClosableDialog(true);
												setIsMessageDialog("Đang gửi yêu cầu...");
												setIsTypeDialog("warning");

												handleGetPassword();
											} else {
												setIsOpenDialog(true);
												setIsClosableDialog(true);
												setIsMessageDialog("Vui lòng nhập email.");
												setIsTypeDialog("error");
											}
										}}
									>
										{!sendRequestGet ? "Lấy lại mật khẩu" : "Gửi lại yêu cầu sau giây lát..."}
									</Button>
								</div>
								<a
									onClick={(e) => {
										e.preventDefault();
										setForgetPassword(false);
									}}
									className="form-link"
								>
									Quay lại đăng nhập
								</a>
							</form>
						</>
					)}
				</>
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
