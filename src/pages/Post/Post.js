import { Divider, Input, Select, Space, InputNumber, DatePicker, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";
import { Button, setRef, useStepContext } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import moment from "moment";
import { FilterInfoOfPostApi } from "../../api/home/InfoOfFilter";
import AlertDialog from "../../Components/Dialog/AleartDialog";
import DialogCustome from "../../Components/DialogCustome/DialogCustome";
import { SearchFilterPostContext } from "../../context/searchFilterContext";

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
		}),
	};
	const { user } = useContext(SearchFilterPostContext);
	const [kindOfPostValueSelected, setKindOfPostValueSelected] = useState("");
	const [kindOfBDSValueSelected, setKindOfBDSValueSelected] = useState("");
	const [kindOfCityValueSelected, setKindOfCityValueSelected] = useState("");
	const [kindOfDistrictValueSelected, setKindOfDistrictValueSelected] = useState("");
	const [kindOfWardValueSelected, setKindOfWardValueSelected] = useState("");
	const [kindOfRoadValueSelected, setKindOfRoadValueSelected] = useState("");
	const [kindOfProjectValueSelected, setKindOProjectValueSelected] = useState("");
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
	const [imageUpload, setImageUpload] = useState([]);

	const [kindOfInfo, setKindOfInfo] = useState("");
	const [startDateOfPost, setStartDateOfPost] = useState(moment());
	const [endDateOfPost, setEndDateOfPost] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);

	const [items, setItems] = useState(["S??? ?????", "sao k??"]);
	const [name, setName] = useState("");
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);
	const inputRef = useRef(null);

	const [kindOfPost, setKindOfPost] = useState(["B??n", "Cho thu??"]);
	const [kindOfUnitSelected, setKindOfUnitSelected] = useState("VND");

	const [linkMapAddress, setLinkMapAddress] = useState("");

	const [positionData, setPositionData] = useState([]);
	const [kindOfCity, setKindOfCity] = useState([]);
	const [kindOfDistrict, setKindOfDistrict] = useState([]);
	const [kindOfWard, setKindOfWard] = useState([]);
	const [kindOfBDS, setKindOfBDS] = useState([]);

	const [openSubmit, setOpenSubmit] = useState(false);
	const [titleDialog, setTitleDialog] = useState("");
	const [contentDialog, setContentDialog] = useState("");

	const [typeAlert, setTypeAlert] = useState("error");
	const [openAlert, setOpenAlert] = useState(false);
	const [messageAlert, setMessageAlert] = useState("");

	const [totalBDS, setTotalBDS] = useState(0);
	const [remainBDS, setRemainBDS] = useState(0);

	const kindOfUnit = ["VND", "Th????ng l?????ng"];

	useEffect(() => {
		if (user) {
			setNameContact(user.lastName);
			setPhoneContact(user.phone);
			setAddressContact(user.address);
			setEmailContact(user.email);
		}
	}, [user]);
	const [codeOfPosition, setCodeOfPosition] = useState({ city: "", district: "", ward: "" });
	useEffect(() => {
		FilterInfoOfPostService.getOptionFilter()
			.then((value) => {
				console.log(value, "value");
				const cityData = [];
				value.data.cityList.forEach((item) => {
					cityData.push(item.name);
				});
				setPositionData(value.data.cityList);
				setKindOfCity(cityData);
			})
			.catch(() => {
				setKindOfCity([]);
			});

		FilterInfoOfPostService.getAllPropertiesType()
			.then((value) => {
				console.log(value, "lo???i");
				if (value.data.success) {
					setKindOfBDS(value.data.list);
				} else {
					setKindOfBDS([]);
				}
			})
			.catch(() => {
				setKindOfBDS([]);
			});
	}, []);

	useEffect(() => {
		setKindOfDistrictValueSelected("");
		if (kindOfCityValueSelected !== "") {
			const cityDataSearch = positionData.find((value) => value.name === kindOfCityValueSelected);
			const nameOfDistricts = [];
			if (cityDataSearch) {
				setCodeOfPosition({ ...codeOfPosition, ["city"]: cityDataSearch.code });
				cityDataSearch.districts.forEach((value) => {
					nameOfDistricts.push(value.name);
				});
			}
			setKindOfDistrict(nameOfDistricts);
		} else {
			setKindOfDistrict([]);
		}
	}, [kindOfCityValueSelected]);

	useEffect(() => {
		setKindOfWardValueSelected("");
		if (kindOfCityValueSelected !== "" && kindOfDistrictValueSelected !== "") {
			const cityDataSearch = positionData.find((value) => value.name === kindOfCityValueSelected);
			if (cityDataSearch) {
				setCodeOfPosition({ ...codeOfPosition, ["city"]: cityDataSearch.code });
				const districtDataSearch = cityDataSearch.districts.find(
					(value) => value.name === kindOfDistrictValueSelected,
				);
				const nameOfWards = [];
				if (districtDataSearch) {
					setCodeOfPosition({ ...codeOfPosition, ["district"]: districtDataSearch.code });
					districtDataSearch.wards.forEach((value) => {
						nameOfWards.push(value.name);
					});
				}
				setKindOfWard(nameOfWards);
			} else {
				setKindOfDistrict([]);
			}
		} else {
			setKindOfDistrict([]);
		}
	}, [kindOfDistrictValueSelected]);

	useEffect(() => {
		if (kindOfCityValueSelected !== "" && kindOfDistrictValueSelected !== "") {
			const cityDataSearch = positionData.find((value) => value.name === kindOfCityValueSelected);
			if (cityDataSearch) {
				setCodeOfPosition({ ...codeOfPosition, ["city"]: cityDataSearch.code });
				const districtDataSearch = cityDataSearch.districts.find(
					(value) => value.name === kindOfDistrictValueSelected,
				);
				if (districtDataSearch) {
					setCodeOfPosition({ ...codeOfPosition, ["district"]: districtDataSearch.code });
					const wardDataSearch = districtDataSearch.wards.find(
						(value) => value.name === kindOfWardValueSelected,
					);

					if (wardDataSearch) {
						setCodeOfPosition({ ...codeOfPosition, ["ward"]: wardDataSearch.code });
					}
				}
			} else {
				setKindOfWard([]);
			}
		} else {
			setKindOfWard([]);
		}
	}, [kindOfWardValueSelected]);

	const onNameChange = (event) => {
		setName(event.target.value);
	};
	const addItem = (e) => {
		e.preventDefault();
		if (name !== "") {
			const checkName = items.find((item) => item === name);

			if (!checkName) {
				setItems([...items, name]);
			}

			setName("");
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
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
		const imageToUpload = [];
		newFileList.forEach((item) => {
			if (item.status === "done") {
				imageToUpload.push(item.response.data.result.Location);
			}
		});
		setImageUpload(imageToUpload);
	};

	useEffect(() => {
		if (kindOfUnitSelected == "Th????ng l?????ng") {
			setPriceOfBDS(0);
		}
	}, [kindOfUnitSelected]);

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

			onSuccess({ ...res });
		} catch (err) {
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
	const moneyFormat = (money) => {
		// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
			.format(money)
			.slice(0, -1);
	};
	const dateFormat = "DD/MM/YYYY";

	const handlePostBDS = () => {
		const dataRequest = {
			totalRoom: totalBDS,
			remainRoom: remainBDS,
			bussinessType: kindOfPostValueSelected == "B??n" ? 2 : 1,
			propertyType: kindOfBDSValueSelected,
			city: kindOfCityValueSelected,
			district: kindOfDistrictValueSelected,
			ward: kindOfWardValueSelected,
			cityCode: codeOfPosition.city,
			districtCode: codeOfPosition.district,
			wardCode: codeOfPosition.ward,
			address: fullAddress,

			title: titleOfPost,
			desc: desOfPost,
			area: areaOfBDS,
			price: priceOfBDS,
			isNegotiate: kindOfUnitSelected == "Th????ng l?????ng",
			license: paperOfBDS,
			nOfBedroom: numberOfRoom,
			nOfBathRoom: numberOfBath,
			nOfFloor: numberOfFloor,
			img: imageUpload,
			contactName: nameContact,
			contactPhone: phoneContact,
			contactAddress: addressContact,
			contactEmail: emailContact,
			startDate: null,
			expireDate: null,
			startDateWaiting: startDateOfPost,
			expireDateWaiting: endDateOfPost,
			amount: totalPrice,
			mapAddress: linkMapAddress,
		};
		console.log(dataRequest, "data request");
		FilterInfoOfPostService.addPostBDS(dataRequest, localStorage.getItem("token"))
			.then((value) => {
				console.log(value, "value return");

				const data = value.data;
				if (data.success) {
					console.log(data);
					window.location = `${data.link}`;
				} else {
					setOpenAlert(true);
					setMessageAlert("C?? l???i x???y ra.");
					setTypeAlert("error");
				}
			})
			.catch(() => {
				setOpenAlert(true);
				setMessageAlert("C?? l???i x???y ra.");
				setTypeAlert("error");
			});
	};

	return (
		<>
			<Grid container className={classes.root} spacing={3}>
				<Grid item md={8} xs={12}>
					<Item>
						<h1 className={classes.title}> Th??ng tin c?? b???n </h1>
						<div className={classes.selectedBox}>
							<Autocomplete
								size="small"
								disablePortal
								id="kindOfPost"
								options={kindOfPost}
								value={kindOfPostValueSelected}
								onChange={(e, value) => {
									setKindOfPostValueSelected(value);
								}}
								className={classes.selected}
								renderInput={(params) => <TextField {...params} label="Lo???i tin" />}
							/>
							<Autocomplete
								size="small"
								disablePortal
								id="kindOfBDS"
								options={kindOfBDS}
								value={kindOfBDSValueSelected}
								onChange={(e, value) => {
									setKindOfBDSValueSelected(value);
								}}
								className={classes.selected}
								renderInput={(params) => <TextField {...params} label="Lo???i B???t ?????ng S???n" />}
							/>
							<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
								<Grid item xs={6} style={{ paddingRight: 5 }}>
									<Autocomplete
										size="small"
										disablePortal
										id="city"
										options={kindOfCity}
										value={kindOfCityValueSelected}
										onChange={(e, value) => {
											setKindOfCityValueSelected(value);
										}}
										isOptionEqualToValue={(option, value) => option === value}
										className={classes.selected}
										renderInput={(params) => <TextField {...params} label="T???nh/ Th??nh Ph???" />}
									/>
								</Grid>
								<Grid item xs={6} style={{ paddingLeft: 5 }}>
									<Autocomplete
										size="small"
										disablePortal
										id="kindOfDistrict"
										options={kindOfDistrict}
										value={kindOfDistrictValueSelected}
										onChange={(e, value) => {
											setKindOfDistrictValueSelected(value);
										}}
										isOptionEqualToValue={(option, value) => option === value}
										className={classes.selected}
										renderInput={(params) => <TextField {...params} label="Qu???n/ Huy???n" />}
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
										onChange={(e, value) => {
											setKindOfWardValueSelected(value);
										}}
										isOptionEqualToValue={(option, value) => option === value}
										className={classes.selected}
										renderInput={(params) => <TextField {...params} label="Ph?????ng/ X??" />}
									/>
								</Grid>
								{/* <Grid item xs={6} style={{ paddingLeft: 5 }}>
								<Autocomplete
									size="small"
									disablePortal
									id="kindOfRoad"
									options={kindOfRoad}
									value={kindOfRoadValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="???????ng/ Ph???" />}
								/>
							</Grid> */}
							</Grid>

							<TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%" }}
								id="standard-basic"
								label="?????a ch??? ?????y ?????"
								value={fullAddress}
								onChange={(e) => {
									setFullAddress(e.target.value);
								}}
								variant="outlined"
							/>
							{/* <TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%" }}
								id="standard-basic"
								label="Link b???n ?????"
								value={linkMapAddress}
								onChange={(e) => {
									setLinkMapAddress(e.target.value);
								}}
								variant="outlined"
							/> */}
						</div>
					</Item>
					<Item>
						<h1 className={classes.title}> Th??ng tin b??i vi???t </h1>
						<div className={classes.selectedBox}>
							<TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="Ti??u ?????"
								variant="outlined"
								value={titleOfPost}
								onChange={(e) => {
									setTitleOfPost(e.target.value);
								}}
							/>
							<TextField
								multiline
								size="small"
								className={classes.textField}
								style={{ width: "100%" }}
								id="standard-basic"
								label="M?? t???"
								variant="outlined"
								rows={8}
								maxRows={12}
								value={desOfPost}
								onChange={(e) => {
									setDesOfPost(e.target.value);
								}}
							/>
						</div>
					</Item>
					<Item>
						<h1 className={classes.title}> Th??ng tin b???t ?????ng s???n </h1>
						<div className={classes.selectedBox}>
							<TextField
								type="number"
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="Di???n t??ch"
								fullWidth
								variant="outlined"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											m<sup>2</sup>
										</InputAdornment>
									),
								}}
								value={areaOfBDS}
								onChange={(e) => {
									setAreaOfBDS(Number(e.target.value));
								}}
							/>
							<TextField
								type="number"
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="M???c gi??"
								fullWidth
								variant="outlined"
								value={priceOfBDS}
								onChange={(e) => {
									setPriceOfBDS(Number(e.target.value));
								}}
								disabled={kindOfUnitSelected == "Th????ng l?????ng"}
							/>
							<Autocomplete
								size="small"
								disablePortal
								id="kindOfProject"
								options={kindOfUnit}
								value={kindOfUnitSelected}
								className={classes.selected}
								renderInput={(params) => <TextField {...params} label="????n v???" />}
								onChange={(e, value) => {
									setKindOfUnitSelected(value);
								}}
							/>
							<p> Gi???y t??? ph??p l??</p>
							<Select
								mode="multiple"
								allowClear
								style={{
									width: "100%",
								}}
								onChange={(e) => {
									setPaperOfBDS(e);
								}}
								placeholder="Gi???y t??? ph??p l??"
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
								<span>S??? ph??ng ng???: </span>
								<InputNumber
									min={0}
									value={numberOfRoom}
									onChange={(e) => {
										setNumberOfRoom(Number(e));
									}}
								/>
							</div>
							<div style={{ paddingTop: 10 }}>
								<span>S??? ph??ng t???m, v??? sinh: </span>
								<InputNumber
									min={0}
									value={numberOfBath}
									onChange={(e) => {
										setNumberOfBath(Number(e));
									}}
								/>
							</div>
							<div style={{ paddingTop: 10 }}>
								<span>S??? t???ng: </span>
								<InputNumber
									min={0}
									value={numberOfFloor}
									onChange={(e) => {
										setNumberOfFloor(Number(e));
									}}
								/>
							</div>
							<div style={{ paddingTop: 20 }}>
								<TextField
									type="number"
									size="small"
									className={classes.textField}
									style={{ width: "100%", paddingBottom: 20 }}
									id="standard-basic"
									label="S??? l?????ng t???ng"
									fullWidth
									variant="outlined"
									required
									value={totalBDS}
									onChange={(e) => {
										setTotalBDS(Number(e.target.value));
									}}
								/>
								<TextField
									type="number"
									size="small"
									className={classes.textField}
									style={{ width: "100%", paddingBottom: 20 }}
									id="standard-basic"
									label="c??n l???i"
									fullWidth
									variant="outlined"
									required
									value={remainBDS}
									onChange={(e) => {
										setRemainBDS(Number(e.target.value));
									}}
								/>
							</div>
						</div>
						{/* <p>Th??ng tin th??m</p>
					<Autocomplete
						size="small"
						disablePortal
						id="kindOfRoad"
						options={kindOfRoad}
						value={kindOfRoadValueSelected}
						className={classes.selected}
						renderInput={(params) => <TextField {...params} label="H?????ng nh??" />}
					/>
					<Autocomplete
						size="small"
						disablePortal
						id="kindOfProject"
						options={kindOfProject}
						value={kindOfProjectValueSelected}
						className={classes.selected}
						renderInput={(params) => <TextField {...params} label="H?????ng ban c??ng" />}
					/>
					<TextField
						type="number"
						size="small"
						className={classes.textField}
						style={{ width: "100%", paddingBottom: 20 }}
						id="standard-basic"
						label="???????ng v??o"
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
						label="M???t ti???n"
						fullWidth
						variant="outlined"
						InputProps={{
							endAdornment: <InputAdornment position="end">m</InputAdornment>,
						}}
					/> */}
					</Item>
					<Item>
						<h1 className={classes.title}> H??nh ???nh v?? Video </h1>
						<Upload
							accept=".png, .jpg, .jpeg"
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
						<h1 className={classes.title}> Th??ng tin li??n h???</h1>
						<div className={classes.selectedBox}>
							<TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="T??n li??n h???"
								fullWidth
								variant="outlined"
								value={nameContact}
								onChange={(e) => {
									setNameContact(e.target.value);
								}}
							/>
							<TextField
								type="number"
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="S??? ??i???n tho???i"
								fullWidth
								variant="outlined"
								required
								value={phoneContact}
								onChange={(e) => {
									setPhoneContact(e.target.value);
								}}
							/>
							<TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="?????a ch??? li??n h???"
								fullWidth
								variant="outlined"
								value={addressContact}
								onChange={(e) => {
									setAddressContact(e.target.value);
								}}
							/>
							<TextField
								size="small"
								className={classes.textField}
								style={{ width: "100%", paddingBottom: 20 }}
								id="standard-basic"
								label="Email"
								fullWidth
								variant="outlined"
								value={emailContact}
								onChange={(e) => {
									setEmailContact(e.target.value);
								}}
							/>
						</div>
					</Item>
				</Grid>
				<Grid item md={4} xs={12}>
					<Item>
						<h1 className={classes.title}> Thanh to??n </h1>

						<div>
							{/* <div style={{ padding: "10px 0" }}>
								<Autocomplete
									size="small"
									disablePortal
									id="kindOfProject"
									options={kindOfProject}
									value={kindOfProjectValueSelected}
									className={classes.selected}
									renderInput={(params) => <TextField {...params} label="Th??m v??o" />}
								/>
							</div> */}
							<h2 className={classes.subtitle}> Ch???n th???i h???n tin: </h2>
							<div style={{ padding: "10px 0" }}>
								<RangePicker
									placeholder={["B???t ?????u", "K???t th??c"]}
									onChange={(e) => {
										console.log(e);
										setStartDateOfPost(moment(e[0]));
										setEndDateOfPost(moment(e[1]));
										let AmountDate = 0;
										if (moment(e[0]).diff(moment(), "days") <= 0) {
											AmountDate =
												Math.abs(
													moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(
														moment(e[1], "DD/MM/YYYY HH:mm:ss"),
														"days",
													),
												) + 1;
										} else {
											AmountDate =
												Math.abs(
													moment(e[0], "DD/MM/YYYY HH:mm:ss").diff(moment(e[1], "DD/MM/YYYY HH:mm:ss"), "days"),
												) + 1;
										}

										setTotalPrice(2000 * AmountDate);
									}}
									required
									style={{ width: "100%" }}
									format={dateFormat}
								/>
							</div>
							<p className={classes.total}>
								<span style={{ color: "#329fcf" }}>T???ng ti???n:</span> <span>{moneyFormat(totalPrice)}</span>
								<b>VND</b>
							</p>
						</div>
						<div>
							<AlertDialog
								isOpen={openAlert}
								onClose={() => {
									setOpenAlert(false);
								}}
								closable="false"
								type={typeAlert}
								message={messageAlert}
							/>
						</div>
						<div style={{ textAlign: "right" }}>
							<Button
								onClick={() => {
									console.log("Cdsvdsv");
									setTitleDialog("Th??ng b??o");
									setContentDialog("X??c nh???n thanh to??n");
									setOpenSubmit(true);
								}}
								color="secondary"
								variant="outlined"
							>
								Thanh to??n
							</Button>
						</div>
					</Item>
				</Grid>
			</Grid>
			<DialogCustome
				open={openSubmit}
				handleSubmit={() => {
					setOpenSubmit(false);
					handlePostBDS();
				}}
				handleClose={() => {
					setOpenSubmit(false);
				}}
				title={titleDialog}
				content={contentDialog}
			/>
		</>
	);
};

export default Post;
