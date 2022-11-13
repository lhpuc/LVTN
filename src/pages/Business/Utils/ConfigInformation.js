import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Space } from "antd";

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
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: 180,
    render: (price) => <>{price} VND</>,
  },
  {
    title: "Diện tích",
    dataIndex: "area",
    width: 150,
    key: "area",
    render: (area) => (
      <>
        {area} m <sup>2</sup>
      </>
    ),
  },

  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, { status }) => (
      <Tag color={status === "Cần bán" ? "green" : "blue"} key={status}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Phòng trống",
    dataIndex: "empty",
    key: "empty",
    width: 250,
    render: (empty) => (
      <>
        <>
          {empty[0]} / {empty[1]}
        </>
      </>
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
    render: (price) => <>{price} VND</>,
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
        <a
          onClick={() => editAction(record)}
          className="table-col-cell-icon success"
        >
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
        <a
          onClick={() => deleteAction(id)}
          className="table-col-cell-icon error"
        >
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];
