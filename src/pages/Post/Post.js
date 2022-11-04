import { Divider, Input, Select, Space, Button, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import React, { useState, useRef } from "react";
import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	padding: theme.spacing(2),
	textAlign: "left",
	color: theme.palette.text.secondary,
	margin: 10,
}));

const kindOfPost = ["sell", "lend"];
const kindOfBDS = ["sell", "lend"];
const kindOfCity = ["sell", "lend"];
const kindOfDistrict = ["sell", "lend"];
const kindOfWard = ["sell", "lend"];
const kindOfRoad = ["sell", "lend"];
const kindOfProject = ["sell", "lend"];

const Post = () => {
	const classes = {
		root: css({
			padding: 30,
			backgroundColor: "#ccc",
		}),
		title: css({
			fontSize: 20,
		}),
		selected: css({
			paddingBottom: 20,
		}),
		selectedBox: css({
			marginTop: 10,
			marginBottom: 10,
			padding: 10,
		}),
		textField: css({
			marginTop: 10,
			marginBottom: 10,
			padding: 10,
		}),
	};
	const [kindOfPostValueSelected, setKindOfPostValueSelected] = useState("lend");
	const [kindOfBDSValueSelected, setKindOfBDSValueSelected] = useState("lend");
	const [kindOfCityValueSelected, setKindOfCityValueSelected] = useState("lend");
	const [kindOfDistrictValueSelected, setKindOfDistrictValueSelected] = useState("lend");
	const [kindOfWardValueSelected, setKindOfWardValueSelected] = useState("lend");
	const [kindOfRoadValueSelected, setKindOfRoadValueSelected] = useState("lend");
	const [kindOfProjectValueSelected, setKindOProjectValueSelected] = useState("lend");

	const [items, setItems] = useState(["jack", "lucy"]);
	const [name, setName] = useState("");
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);
	const inputRef = useRef(null);
	const onNameChange = (event) => {
		setName(event.target.value);
	};
	let index = 0;
	const addItem = (e) => {
		e.preventDefault();
		setItems([...items, name || `New item ${index++}`]);
		setName("");
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
	};
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<Grid container className={classes.root} spacing={3}>
			<Grid item xs={8}>
				<Item>
					<h1 className={classes.title}> Đăng tin </h1>
				</Item>
				<Item>
					<h1 className={classes.title}> Thông tin cơ bản </h1>
					<div className={classes.selectedBox}>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfPost"
							options={kindOfPost}
							value={kindOfPostValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Loại tin" />}
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfBDS"
							options={kindOfBDS}
							value={kindOfBDSValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Loại Bất Động Sản" />}
						/>

						<Autocomplete
							size="small"
							disablePortal
							id="city"
							options={kindOfCity}
							value={kindOfCityValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Tỉnh/ Thành Phố" />}
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfDistrict"
							options={kindOfDistrict}
							value={kindOfDistrictValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Quận/ Huyện" />}
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfWard"
							options={kindOfWard}
							value={kindOfWardValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Phường/ Xã" />}
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfRoad"
							options={kindOfRoad}
							value={kindOfRoadValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Đường/ Phố" />}
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfProject"
							options={kindOfProject}
							value={kindOfProjectValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Dự án" />}
						/>
						<TextField
							size="small"
							className={classes.textField}
							style={{ width: "100%" }}
							id="standard-basic"
							label="Địa chỉ đầy đủ"
							variant="outlined"
						/>
					</div>
				</Item>
				<Item>
					<h1 className={classes.title}> Thông tin bài viết </h1>
					<div className={classes.selectedBox}>
						<TextField
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Tiêu đề"
							variant="outlined"
						/>
						<TextField
							multiline
							size="small"
							className={classes.textField}
							style={{ width: "100%" }}
							id="standard-basic"
							label="Mô tả"
							variant="outlined"
							rows={8}
							maxRows={12}
						/>
					</div>
				</Item>
				<Item>
					<h1 className={classes.title}> Thông tin bất động sản </h1>
					<div className={classes.selectedBox}>
						<TextField
							type="number"
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Diện tích"
							fullWidth
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										m<sup>2</sup>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							type="number"
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Mức giá"
							fullWidth
							variant="outlined"
						/>
						<Autocomplete
							size="small"
							disablePortal
							id="kindOfProject"
							options={kindOfProject}
							value={kindOfProjectValueSelected}
							className={classes.selected}
							renderInput={(params) => <TextField {...params} label="Đơn vị" />}
						/>
						<p> Giấy tờ pháp lý</p>
						<Select
							mode="multiple"
							allowClear
							style={{
								width: "100%",
							}}
							placeholder="Giấy tờ pháp lý"
							dropdownRender={(menu) => (
								<>
									{menu}
									<Divider
										style={{
											margin: "8px 0",
										}}
									/>
									<Space
										style={{
											padding: "0 8px 4px",
										}}
									>
										<Input
											placeholder="Please enter item"
											ref={inputRef}
											value={name}
											onChange={onNameChange}
										/>
										<Button type="text" icon={<PlusOutlined />} onClick={addItem}>
											Add item
										</Button>
									</Space>
								</>
							)}
							options={items.map((item) => ({
								label: item,
								value: item,
							}))}
						/>
						<div style={{ paddingTop: 10 }}>
							<span>Số phòng ngủ: </span>
							<InputNumber min={0} />
						</div>
						<div style={{ paddingTop: 10 }}>
							<span>Số phòng tắm, vệ sinh: </span>
							<InputNumber min={0} />
						</div>
						<div style={{ paddingTop: 10 }}>
							<span>Số tầng: </span>
							<InputNumber min={0} />
						</div>
					</div>
					<p>Thông tin thêm</p>
					<Autocomplete
						size="small"
						disablePortal
						id="kindOfRoad"
						options={kindOfRoad}
						value={kindOfRoadValueSelected}
						className={classes.selected}
						renderInput={(params) => <TextField {...params} label="Hướng nhà" />}
					/>
					<Autocomplete
						size="small"
						disablePortal
						id="kindOfProject"
						options={kindOfProject}
						value={kindOfProjectValueSelected}
						className={classes.selected}
						renderInput={(params) => <TextField {...params} label="Hướng ban công" />}
					/>
					<TextField
						type="number"
						size="small"
						className={classes.textField}
						style={{ width: "100%", paddingBottom: 20 }}
						id="standard-basic"
						label="Đường vào"
						fullWidth
						variant="outlined"
						InputProps={{
							endAdornment: <InputAdornment position="end">m</InputAdornment>,
						}}
					/>
					<TextField
						type="number"
						size="small"
						className={classes.textField}
						style={{ width: "100%", paddingBottom: 20 }}
						id="standard-basic"
						label="Mặt tiền"
						fullWidth
						variant="outlined"
						InputProps={{
							endAdornment: <InputAdornment position="end">m</InputAdornment>,
						}}
					/>
				</Item>
				<Item>
					<h1 className={classes.title}> Hình ảnh và Video </h1>
					<Upload
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						listType="picture-card"
						fileList={fileList}
						onPreview={handlePreview}
						onChange={handleChange}
					>
						{fileList.length >= 8 ? null : uploadButton}
					</Upload>
					<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
						<img
							alt="example"
							style={{
								width: "100%",
							}}
							src={previewImage}
						/>
					</Modal>
				</Item>
			</Grid>
		</Grid>
	);
};

export default Post;
