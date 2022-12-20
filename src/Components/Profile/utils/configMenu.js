import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Space } from "antd";
import { noImage } from "../../../models/images";
import ClearIcon from "@mui/icons-material/Clear";

const moneyFormat = (money) => {
	// return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

	return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
		.format(money)
		.slice(0, -1);
};
export const getSidebarItem = (label, key, icon, children, type) => {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
};

export const postColumns = (deleteAction) => [
	{
		title: "Ảnh",
		dataIndex: "img",
		key: "img",

		render: (src) => <img src={src.length > 0 ? src[0] : noImage} className="table-col-cell-img" />,
	},
	{
		title: "Tiêu đề",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "Còn trống",
		dataIndex: "remainRoom",
		key: "remainRoom",
	},
	{
		title: "Số lượng",
		dataIndex: "totalRoom",
		key: "totalRoom",
	},
	{
		title: "Giá",
		dataIndex: "price",
		key: "price",
		render: (price, properties) => {
			return <>{properties.isNegotiate ? <>Thương lượng</> : <>{moneyFormat(price)} VND</>}</>;
		},
	},

	{
		title: "Xem",
		dataIndex: "_id",
		width: 50,
		key: "_id",
		render: (id) => (
			<Space>
				<a href={`/property/${id}`} className="table-col-cell-icon">
					<EyeOutlined />
				</a>
			</Space>
		),
	},

	{
		title: "Bỏ lưu",
		dataIndex: "_id",
		key: "delete",
		width: 100,
		render: (id, record) => (
			<Space size="middle">
				<a onClick={() => deleteAction(id)} className="table-col-cell-icon error">
					<ClearIcon />
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

		render: (src) => <img src={src.length > 0 ? src[0] : noImage} className="table-col-cell-img" />,
	},
	{
		title: "Tiêu đề",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "Còn trống",
		dataIndex: "remainRoom",
		key: "remainRoom",
	},
	{
		title: "Số lượng",
		dataIndex: "totalRoom",
		key: "totalRoom",
	},
	{
		title: "Giá",
		dataIndex: "price",
		key: "price",
		render: (price, properties) => {
			return <>{properties.isNegotiate ? <>Thương lượng</> : <>{moneyFormat(price)} VND</>}</>;
		},
	},

	{
		title: "Xem",
		dataIndex: "_id",
		width: 50,
		key: "_id",
		render: (id) => (
			<Space>
				<a href={`/property/${id}`} className="table-col-cell-icon">
					<EyeOutlined />
				</a>
			</Space>
		),
	},
	{
		title: "Sửa",
		dataIndex: "_id",
		key: "edit",
		width: 50,
		render: (id, record) => (
			<Space size="middle">
				<a onClick={() => editAction(id)} className="table-col-cell-icon success">
					<EditOutlined />
				</a>
			</Space>
		),
	},
	{
		title: "Xóa",
		dataIndex: "_id",
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
