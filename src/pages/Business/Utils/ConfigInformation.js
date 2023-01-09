import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Space, Rate } from "antd";
import { noImage } from "../../../models/images";
import Slider from "react-slick";

export const getSidebarItem = (label, key, icon, children, type) => {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
};

const configSlider = {
	dots: false,
	infinite: false,
	autoplay: false,
	speed: 500,
	arrow: false,
	slidesToShow: 1,
	slidesToScroll: 1,
};

const moneyFormat = (money) => {
	// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

	return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
		.format(money)
		.slice(0, -1);
};

export const postColumns = (watchAction) => [
	{
		title: "Ảnh",
		dataIndex: "img",
		key: "img",
		width: 200,
		render: (src) => {
			return (
				<>
					{src.length > 0 ? (
						<div>
							<img src={src[0]} style={{ width: 200, height: "auto" }} className="table-col-cell-img" />
						</div>
					) : (
						<>
							<div>
								<img src={noImage} className="table-col-cell-img" />
							</div>
						</>
					)}
				</>
			);
		},
	},
	{
		title: "Tên",
		dataIndex: "title",
		key: "name",
		width: 300,
	},
	{
		title: "Giá",
		dataIndex: "price",
		key: "price",
		width: 180,
		render: (price, properties) => {
			return <>{properties.isNegotiate ? <>Thương lượng</> : <>{moneyFormat(price)} VND</>}</>;
		},
	},
	{
		title: "Đánh giá",
		dataIndex: "rating",
		key: "rating",
		width: 200,
		render: (rate, properties) => {
			return (
				<>
					<Rate disabled allowHalf value={rate} />
				</>
			);
		},
	},
	{
		title: "Diện tích",
		dataIndex: "area",
		width: 120,
		key: "area",
		render: (area) => (
			<>
				{area} m<sup>2</sup>
			</>
		),
	},

	{
		title: "Loại tin",
		dataIndex: "bussinessType",
		key: "status",
		width: 80,
		render: (bussinessType) => (
			<Tag color={bussinessType === 2 ? "green" : "blue"} key={bussinessType}>
				{bussinessType === 2 ? "Bán" : "Cho thuê"}
			</Tag>
		),
	},
	{
		title: "Còn trống",
		dataIndex: "remainRoom",
		key: "empty",
		width: 150,
		render: (remainRoom, properties) => (
			<>
				<>
					{remainRoom} / {properties.totalRoom}
				</>
			</>
		),
	},
	{
		title: "Chi tiết",
		dataIndex: "_id",
		key: "id",

		render: (id) => (
			<Space>
				<a href={`/property/${id}`} className="table-col-cell-icon">
					<EyeOutlined />
				</a>
			</Space>
		),
	},
];

export const roomColumns = (editAction, deleteAction) => [
	{
		title: "Ảnh",
		dataIndex: "img",
		key: "img",
		width: 200,
		render: (src) => <img src={src} className="table-col-cell-img" />,
	},
	{
		title: "Mã",
		dataIndex: "id",
		key: "id",
		width: 60,
	},
	{
		title: "Tên",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Đánh giá",
		dataIndex: "rating",
		key: "rating",
		width: 200,
		render: (rate, properties) => {
			return (
				<>
					<Rate disabled allowHalf value={rate} />
				</>
			);
		},
	},
	{
		title: "Số lượng",
		dataIndex: "quantity",
		key: "quantity",
		width: 60,
	},
	{
		title: "Giá",
		dataIndex: "price",
		key: "price",
		width: 180,
		render: (price, properties) => {
			return <>{properties.isNegotiate ? <>Thương lượng</> : <>{moneyFormat(price)} VND</>}</>;
		},
	},
	{
		title: "Còn trống",
		dataIndex: "available",
		key: "available",
		width: 60,
	},
	{
		title: "Xem",
		dataIndex: "id",
		width: 50,
		key: "id",
		render: (id) => (
			<Space>
				<a href="#" className="table-col-cell-icon">
					<EyeOutlined />
				</a>
			</Space>
		),
	},
	{
		title: "Sửa",
		dataIndex: "id",
		key: "edit",
		width: 50,
		render: (id, record) => (
			<Space size="middle">
				<a onClick={() => editAction(record)} className="table-col-cell-icon success">
					<EditOutlined />
				</a>
			</Space>
		),
	},
	{
		title: "Xóa",
		dataIndex: "id",
		key: "delete",
		width: 50,
		render: (id, record) => (
			<Space size="middle">
				<a onClick={() => deleteAction(id)} className="table-col-cell-icon error">
					<DeleteOutlined />
				</a>
			</Space>
		),
	},
];
