import React from "react";

const Back = ({ name, title, cover }) => {
	return (
		<>
			<div className="back">
				<div className="container">
					<span className="titleName" style={{ color: "#ccc" }}>
						{name}
					</span>
					<h3 className="titleH3" style={{ color: "#ccc" }}>
						{title}
					</h3>
				</div>
				<img src={cover} alt="" />
			</div>
		</>
	);
};

export default Back;
