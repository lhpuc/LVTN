import React, { useState } from 'react'
import { Typography, Table  } from 'antd'
import { postColumns } from '../utils/configMenu';

const { Title } = Typography

const data = [
  {
    id: '1',
    name: 'Nhà trọ 1',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'active',
    price: 1000000000
  },
  {
    id: '2',
    name: 'Nhà trọ 2',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'disabled',
    price: 2000000000
  },
  {
    id: '3',
    name: 'Nhà trọ 3',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'active',
    price: 10000
  },
  {
    id: '1',
    name: 'Nhà trọ 1',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'active',
    price: 1000000000
  },
  {
    id: '2',
    name: 'Nhà trọ 2',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'disabled',
    price: 2000000000
  },
  {
    id: '3',
    name: 'Nhà trọ 3',
    img: 'https://foodi.com.vn/wp-content/uploads/2019/12/website-cho-thue-phong-tro-1.png',
    address: 'New York No. 1 Lake Park',
    status: 'active',
    price: 10000
  },
];

const ManagePost = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })
  
  const deletePost = (id) => {
    console.log(id)
  }
  return (
    <div className='container-section manage-post'>
      <Title className='title-section'>Quản lý tin đăng</Title>
      <div className='content-section manage-post'>
        <Table columns={postColumns(deletePost)} dataSource={data} pagination={{
          defaultPageSize: pagination.limit,
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          position: ['topLeft']
        }}/>
      </div>
    </div>
  )
}

export default ManagePost
