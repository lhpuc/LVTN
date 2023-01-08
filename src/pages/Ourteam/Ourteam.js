import React from "react";
import "./Ourteam.css";
import Back from "../../Components/data/Back/Back";
import img from "../../assets/images/Ourteam/images1.jpg";
import { noImage } from "../../models/images";

const Ourteam = () => {
	return (
		<section className="blog-out mb">
			<Back
				name="Chúng tôi đến từ trường Đại Học Bách Khoa"
				title="Nhóm chúng tôi gồm 3 thành viên"
				cover={img}
			/>

			<h1 class="title">Thành viên nhóm</h1>
			<div class="team-row">
				<div class="member">
					<img src={noImage} alt="images_phuc" />
					<h2>Lê Hoàng Phúc</h2>
					<p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
					<p> Chuyên ngành Khoa Học máy Tính</p>
				</div>
				<div class="member">
					<img src={noImage} alt="images_son" />
					<h2>Hứa Thị Sơn</h2>
					<p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
					<p> Chuyên ngành Khoa Học máy Tính</p>
				</div>
				<div class="member">
					<img src={noImage} alt="images_Minh" />
					<h2>Lê Quang Minh</h2>
					<p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
					<p> Chuyên ngành Khoa Học máy Tính</p>
				</div>
			</div>
		</section>
	);
};

export default Ourteam;
