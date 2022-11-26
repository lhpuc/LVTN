import { Divider, Input, Select, Space, InputNumber, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import moment from "moment";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";

import axios from "axios";

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

const Post = () => {
	const FilterInfoOfPostService = FilterInfoOfPostApi();

	const { auth } = useContext(AuthContext);
	const { RangePicker } = DatePicker;
	const classes = {
		root: css({
			padding: 30,
			backgroundColor: "#ccc",
		}),
		title: css({
			fontSize: 25,
			fontWeight: "bold",
			paddingBottom: 10,
			borderBottom: "1px solid #ccc",
		}),
		subtitle: css({
			fontSize: 18,
			fontWeight: "regular",
		}),
		total: css({
			fontSize: 20,
			fontWeight: "bold",
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
	const [kindOfPostValueSelected, setKindOfPostValueSelected] = useState("");
	const [kindOfBDSValueSelected, setKindOfBDSValueSelected] = useState("lend");
	const [kindOfCityValueSelected, setKindOfCityValueSelected] = useState("lend");
	const [kindOfDistrictValueSelected, setKindOfDistrictValueSelected] = useState("lend");
	const [kindOfWardValueSelected, setKindOfWardValueSelected] = useState("lend");
	const [kindOfRoadValueSelected, setKindOfRoadValueSelected] = useState("lend");
	const [kindOfProjectValueSelected, setKindOProjectValueSelected] = useState("lend");
	const [fullAddress, setFullAddress] = useState("");

	const [numberOfRoom, setNumberOfRoom] = useState(0);
	const [numberOfBath, setNumberOfBath] = useState(0);
	const [numberOfFloor, setNumberOfFloor] = useState(0);
	const [titleOfPost, setTitleOfPost] = useState("");
	const [desOfPost, setDesOfPost] = useState("");
	const [priceOfBDS, setPriceOfBDS] = useState(0);
	const [areaOfBDS, setAreaOfBDS] = useState(0);
	const [paperOfBDS, setPaperOfBDS] = useState([]);

	const [nameContact, setNameContact] = useState("");
	const [phoneContact, setPhoneContact] = useState("");
	const [addressContact, setAddressContact] = useState("");
	const [emailContact, setEmailContact] = useState("");

	const [kindOfInfo, setKindOfInfo] = useState("");
	const [startDateOfPost, setStartDateOfPost] = useState(moment());
	const [endDateOfPost, setEndDateOfPost] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);

	const [items, setItems] = useState(["Sổ đỏ", "sao kê"]);
	const [name, setName] = useState("");
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);
	const inputRef = useRef(null);

	const [kindOfPost, setKindOfPost] = useState(["Bán", "Cho thuê", "Ghép"]);

	const [positionData, setPositionData] = useState([]);
	const [kindOfCity, setKindOfCity] = useState([]);
	const [kindOfDistrict, setKindOfDistrict] = useState([]);
	const [kindOfWard, setKindOfWard] = useState([]);
	const [kindOfBDS, setKindOfBDS] = useState([]);

	const kindOfRoad = ["sell", "lend"];
	const kindOfProject = ["sell", "lend"];

	useEffect(() => {
		FilterInfoOfPostService.getOptionFilter().then((value) => {
			console.log(value, "value");
			const cityData = [];
			value.data.cityList.forEach((item) => {
				cityData.push(item.name);
			});
			setPositionData(value.data.cityList);
			setKindOfCity(cityData);
		});
	}, []);

	useEffect(() => {
		setKindOfDistrictValueSelected("");
		if (kindOfCityValueSelected !== "") {
			const cityDataSearch = positionData.find((value) => value.name === kindOfCityValueSelected);
			const nameOfDistricts = [];
			if (cityDataSearch) {
				cityDataSearch.districts.forEach((value) => {
					nameOfDistricts.push(value.name);
				});
			}
			setKindOfDistrict(nameOfDistricts);
		} else {
			setKindOfDistrict([]);
		}
	}, [kindOfCityValueSelected]);
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
	const handleChange = ({ fileList: newFileList }) => {
		console.log(newFileList, "new file");
		setFileList(newFileList);
	};

	const uploadImage = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;

		const formData = new FormData();
		const config = {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress: (event) => {
				onProgress({ percent: (event.loaded / event.total) * 100 });
			},
		};
		formData.append("img", file);
		try {
			const res = await axios.post("https://lvtn2022real.herokuapp.com/image", formData, config);

			onSuccess("Ok");
			console.log("server res: ", res);
		} catch (err) {
			console.log("Eroor: ", err);
			const error = new Error("Some error");
			onError({ err });
		}
	};
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
	const dateFormat = "DD/MM/YYYY hh:ss:mm";

	return (
		<Grid container className={classes.root} spacing={3}>
			<Grid item md={8} xs={12}>
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
						<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
							<Grid item xs={6} style={{ paddingRight: 5 }}>
								<Autocomplete
									size="small"
									disablePortal
									id="city"
									options={kindOfCity}
									value={kindOfCityValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="Tỉnh/ Thành Phố" />}
								/>
							</Grid>
							<Grid item xs={6} style={{ paddingLeft: 5 }}>
								<Autocomplete
									size="small"
									disablePortal
									id="kindOfDistrict"
									options={kindOfDistrict}
									value={kindOfDistrictValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="Quận/ Huyện" />}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
							<Grid item xs={6} style={{ paddingRight: 5 }}>
								<Autocomplete
									size="small"
									disablePortal
									id="kindOfWard"
									options={kindOfWard}
									value={kindOfWardValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="Phường/ Xã" />}
								/>
							</Grid>
							<Grid item xs={6} style={{ paddingLeft: 5 }}>
								<Autocomplete
									size="small"
									disablePortal
									id="kindOfRoad"
									options={kindOfRoad}
									value={kindOfRoadValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="Đường/ Phố" />}
								/>
							</Grid>
						</Grid>
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
							<InputNumber
								min={0}
								onChange={(e) => {
									console.log(e);
								}}
							/>
						</div>
						<div style={{ paddingTop: 10 }}>
							<span>Số phòng tắm, vệ sinh: </span>
							<InputNumber
								min={0}
								onChange={(e) => {
									console.log(e);
								}}
							/>
						</div>
						<div style={{ paddingTop: 10 }}>
							<span>Số tầng: </span>
							<InputNumber
								min={0}
								onChange={(e) => {
									console.log(e);
								}}
							/>
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
						accept="image/pnp, image/jpeg, image/jpg"
						customRequest={uploadImage}
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
				<Item>
					<h1 className={classes.title}> Thông tin liên hệ</h1>
					<div className={classes.selectedBox}>
						<TextField
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Tên liên hệ"
							fullWidth
							variant="outlined"
						/>
						<TextField
							type="number"
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Số điện thoại"
							fullWidth
							variant="outlined"
							required
						/>
						<TextField
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Địa chỉ liên hệ"
							fullWidth
							variant="outlined"
						/>
						<TextField
							size="small"
							className={classes.textField}
							style={{ width: "100%", paddingBottom: 20 }}
							id="standard-basic"
							label="Email"
							fullWidth
							variant="outlined"
						/>
					</div>
				</Item>
			</Grid>
			<Grid item md={4} xs={12}>
				<Item>
					<h1 className={classes.title}> Thanh toán </h1>

					<div>
						<div style={{ padding: "10px 0" }}>
							<Autocomplete
								size="small"
								disablePortal
								id="kindOfProject"
								options={kindOfProject}
								value={kindOfProjectValueSelected}
								className={classes.selected}
								renderInput={(params) => <TextField {...params} label="Thêm vào" />}
							/>
						</div>
						<h2 className={classes.subtitle}> Chọn thời hạn tin: </h2>
						<div style={{ padding: "10px 0" }}>
							<RangePicker showTime required style={{ width: "100%" }} format={dateFormat} />
						</div>
						<p className={classes.total}>
							<span style={{ color: "#329fcf" }}>Tổng tiền:</span> <span>10000</span> <b>VND</b>
						</p>
					</div>
					<div style={{ textAlign: "right" }}>
						<Button color="secondary" variant="outlined">
							Tiếp tục
						</Button>
					</div>
				</Item>
			</Grid>
		</Grid>
	);
};

export default Post;
