import React, { useState } from 'react'
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { Typography, Table, Button  } from 'antd'
import { roomColumns } from '../utils/configMenu';

const { Title } = Typography

const data = [
  {
    id: '1',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '2',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '3',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '4',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '5',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '6',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
  {
    id: '7',
    name: 'Cho thuê phòng cao cấp các kểu con đà đểu',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    quantity: 20,
    available: 10,
    price: 1000000000,
  },
];

const ManageRoom = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })
  
  const editRoom = (data) => {
    console.log(data)
  }
  const deleteRoom = (id) => {
    console.log(id)
  }
  return (
    <div className='container-section manage-room'>
      <Title className='title-section'>Quản lý phòng ở</Title>
      <Button className='btn-add-room' type='default'>
        <PlusCircleOutlined /> Thêm phòng
      </Button>
      <div className='content-section manage-room'>
        <Table columns={roomColumns(editRoom, deleteRoom)} dataSource={data} pagination={{
          defaultPageSize: pagination.limit,
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          position: ['topLeft']
        }}/>
      </div>
    </div>
  )
}

export default ManageRoom
