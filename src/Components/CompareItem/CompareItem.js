import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Badge } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SearchFilterPostContext } from "../../context/searchFilterContext";
import { Grid } from "@mui/material";
import { noImage } from "../../models/images";
import ClearIcon from "@mui/icons-material/Clear";
import { Button as ButtonUi } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
export const CompareItem = () => {
	const navigate = useNavigate();
	const { comparePropertyItem, setComparePropertyItem } = useContext(SearchFilterPostContext);
	const [propertyLength, setPropertyLength] = useState(0);

	useEffect(() => {
		// Load the todos on mount
		const todosString = localStorage.getItem("property");
		if (todosString) {
			const todos = JSON.parse(todosString);
			setComparePropertyItem(todos);
			setPropertyLength(comparePropertyItem.length);
		}
	}, []);
	const content = () => {
		return (
			<div style={{ width: "100%" }}>
				{comparePropertyItem &&
					comparePropertyItem.map((item) => (
						<Grid
							container
							style={{
								alignItems: "center",
								padding: "10px 20px 10px 10px",
								margin: "10px auto",
								backgroundColor: "#f7edfa",
								width: "100%",
							}}
						>
							<Grid item xs={5}>
								<img
									src={item.img.length > 0 ? item.img[0] : noImage}
									style={{ width: "200px", height: "auto" }}
								/>
							</Grid>

							<Grid item xs={5} style={{ padding: 10 }}>
								<span>{item.title}</span>
							</Grid>
							<Grid item xs={1}>
								<ButtonUi
									onClick={() => {
										const deleteItem = comparePropertyItem.filter((value) => value._id !== item._id);

										setComparePropertyItem(deleteItem);
										localStorage.setItem("property", JSON.stringify(deleteItem));
									}}
								>
									<ClearIcon />
								</ButtonUi>
							</Grid>
						</Grid>
					))}
			</div>
		);
	};
	return (
		<>
			{comparePropertyItem && comparePropertyItem.length > 0 && (
				<div style={{ position: "fixed", bottom: "20%", right: 60, zIndex: 999 }}>
					<Badge count={comparePropertyItem.length}>
						<Popover
							content={content}
							title={() => <strong>Các mục so sánh</strong>}
							placement="leftBottom"
						>
							<Button
								type="primary"
								onClick={() => {
									navigate("/compare", { replace: true });
								}}
							>
								<CompareArrowsIcon />
							</Button>
						</Popover>
					</Badge>
				</div>
			)}
		</>
	);
};
