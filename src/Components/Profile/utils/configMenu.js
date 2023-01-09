import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Space, Rate } from "antd";
import { noImage } from "../../../models/images";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";

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
		title: "Giá",
		dataIndex: "price",
		key: "price",
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
		title: "Còn trống",
		dataIndex: "remainRoom",
		key: "remainRoom",
		width: 50,
		render: (endDate, properties) => {
			return (
				<>
					{properties.remainRoom} / {properties.totalRoom}
				</>
			);
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
		title: "Đánh giá",
		dataIndex: "rating",
		key: "rating",
		width: 180,
		render: (rate, properties) => {
			return (
				<>
					<Rate style={{ fontSize: 12 }} disabled allowHalf value={rate} />
				</>
			);
		},
	},
	{
		title: "Còn trống",
		dataIndex: "remainRoom",
		key: "remainRoom",
		width: 50,
		render: (endDate, properties) => {
			return (
				<>
					{properties.remainRoom} / {properties.totalRoom}
				</>
			);
		},
	},
	{
		title: "Trạng thái",
		dataIndex: "expireWaitingDate",
		key: "expireWaitingDate",
		render: (endDate, properties) => {
			const dateStart = moment(properties.startDate).diff(moment(), "days");
			const dateEnd = moment(properties.expireDate).diff(moment(), "days");

			if (dateStart <= 0 && dateEnd > 0) return <Tag color="green">Hoạt động</Tag>;
			else if (dateStart >= 0) return <Tag color="blue">Đang đợi</Tag>;
			else if (dateEnd <= 0) return <Tag color="red">Hết hạn</Tag>;
			else return <Tag color="red">Hết hạn</Tag>;
		},
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
