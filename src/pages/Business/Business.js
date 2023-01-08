import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, message } from "antd";
import Back from "../../Components/data/Back/Back";
import Introduce from "../Business/Introduce/Introduce";
import RealEstateInfomation from "./RealEstateInfomation/RealEstateInfomation";
import "./Business.css";
import { PostInfoApi } from "../../api/navbar/NavBarOption";
import { noImage } from "../../models/images";
import { Grid } from "@mui/material";
import Review from "./Review/Review";

const Business = () => {
	const { id } = useParams();

	const PostInfoService = PostInfoApi();
	const [userInfo, setUserInfo] = useState(null);
	const [isSpin, setIsSpin] = useState(false);

	useEffect(() => {
		setIsSpin(true);
		PostInfoService.getUserInfo(id)
			.then((value) => {
				const data = value.data;
				if (data.success) {
					console.log(data.user);
					setUserInfo(data.user);
					message.success("thành công");
				} else {
					message.error("có lỗi xảy ra khi lấy thông tin người dùng");
				}
				setIsSpin(false);
			})
			.catch(() => {
				setIsSpin(false);
				message.error("có lỗi xảy ra khi lấy thông tin");
			});
	}, [id]);
	return (
		<>
			<Spin spinning={isSpin} tip="Chờ xíu nhé...">
				{userInfo && (
					<>
						<section className="blog-out mb">
							<Back
								// name="Hãy liên hệ với chúng tôi"
								// title="Cần được tư vấn?"
								cover={userInfo.cover ? userInfo.cover : noImage}
							/>

							<Grid
								container
								style={{
									padding: "30px 60px",
									alignItems: "end",
									backgroundColor: "#1f394d",
									borderTop: "10px solid #fff",
									borderBottom: "10px solid #fff",
								}}
							>
								<Grid>
									<img
										src={userInfo?.avatar ? userInfo?.avatar : noImage}
										style={{ width: 200, height: 200, borderRadius: "100%", border: "10px solid #fff" }}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={8}
									style={{ padding: "0 20px", fontWeight: "bolder", fontSize: 40, color: "#fff" }}
								>
									{userInfo?.lastName}
								</Grid>
							</Grid>
							{/* <div className="action_heart">
										<div>
											<p> Theo dõi</p>
											<HeartOutlined />
										</div>
									</div> */}
						</section>
						<Introduce user={userInfo} />
						<RealEstateInfomation post={userInfo?.properties} />
						{/* <NewForRent /> */}

						{/* <Review /> */}
					</>
				)}
			</Spin>
		</>
	);
};

export default Business;
