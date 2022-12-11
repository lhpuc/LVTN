import React, { useEffect, useState } from "react";
import {
	ContainerOutlined,
	MenuFoldOutlined,
	SaveOutlined,
	PieChartOutlined,
	SecurityScanOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import "./Profile.css";
import { getSidebarItem } from "./utils/configMenu";
import UserInfo from "./UserInfo/UserInfo";
import ChangePassword from "./Password/Password";
import HomeInfo from "./HomeInfo/HomeInfo";
import ManagePost from "./ManagePost/ManagePost";
import ManageRoom from "./ManageRoom/ManagePost";

const items = [
	getSidebarItem("Thông tin cá nhân", "user-info", <PieChartOutlined />),
	// getSidebarItem('Các tin đã lưu', 'posts-saved', <SaveOutlined />),
	getSidebarItem("Các tin đã lưu", "favorite", <ContainerOutlined />),
	getSidebarItem("Quản lý tin đăng", "manage-room", <ContainerOutlined />),
	getSidebarItem("Đổi mật khẩu", "change-password", <SecurityScanOutlined />),
];

const Profile = () => {
	const [styledButtonToggle, setStyledButtonToggle] = useState(
		window.innerWidth < 415
			? {
					transform: `translateY(100%)`,
			  }
			: {},
	);
	const [closed, setClosed] = useState(true);
	const [selectedSection, setSelectedSection] = useState("user-info");

	const toggleMenu = (c) => {
		setClosed(c);
		if (c) {
			setStyledButtonToggle({
				transform: `translateY(100%)`,
				animation: `closedMenu 0.2s ease-in`,
			});
		} else {
			setStyledButtonToggle({
				transform: `translateY(0)`,
				animation: `openedMenu 0.2s ease-in`,
			});
		}
	};

	const onChangeSection = ({ item, key, keyPath, domEvent }) => {
		setSelectedSection(key);
	};

	return (
		<div className="profile">
			<div className="profile-sidebar">
				{window.innerWidth >= 415 && (
					<Button type="text" className="sidebar-toggle">
						<MenuFoldOutlined />
						Trang cá nhân
					</Button>
				)}
				<Menu
					defaultSelectedKeys={["user-info"]}
					mode="inline"
					theme="dark"
					items={items}
					onSelect={onChangeSection}
					inlineCollapsed={window.innerWidth < 415}
					style={styledButtonToggle}
				/>
				{window.innerWidth < 415 && (
					<Button type="text" className="sidebar-toggle" onClick={() => toggleMenu(!closed)}>
						<MenuFoldOutlined />
					</Button>
				)}
			</div>

			<div className="profile-container">
				{selectedSection === "user-info" && <HomeInfo />}
				{/* {selectedSection === 'posts-saved' && <UserInfo/>} */}
				{selectedSection === "favorite" && <ManagePost />}
				{selectedSection === "manage-room" && <ManageRoom />}

				{selectedSection === "change-password" && <ChangePassword />}
				{selectedSection === undefined && <HomeInfo />}
			</div>
		</div>
	);
};

export default Profile;
