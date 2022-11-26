import React from "react";
import { blogData } from "../../../Components/data/blogData";
import "./Blog.css";
const Blog = () => {
	return (
		<>
			<div className="BlogSection" id="/Blog">
				<h4 className="BlogHeading">Blog</h4>
				<div className=" BlogWrap">
					{blogData.map((blog) => {
						return (
							<div className=" Col">
								<img style={{ width: "100%", height: "41vh" }} src={blog.image} alt="#" />
								<div className="BlogContent">
									<h3>{blog.why}</h3>
									<p className="subtitle">{blog.time}</p>
									<p>{blog.decription}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Blog;
