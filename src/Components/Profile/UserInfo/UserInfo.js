import React, { useState } from 'react'
import { Typography, Input, Button, Form, Select , DatePicker } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import ReactImageUploading from 'react-images-uploading';
import avatar from '../../../assets/images/location/banner4.jpg'


const { Title } = Typography
const { Option } = Select

const UserInfo = () => {
  const [avt, setAvt] = useState([]);

  const handleFilesChange = (f) => {setAvt(f)};

  return (
    <div className='container-section user-info'>
      <Title className='title-section'>Thông tin cá nhân</Title>
      <div className='content-section user-info'>
        <Form
          className='section-form'
          name="complex-form"
        >
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="firstName"
              rules={[{
                required: true,
                message: 'Không được bỏ trống mục này',
              }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Input placeholder="Họ" className='form-input' />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{
                required: true,
                message: 'Không được bỏ trống mục này',
              }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                marginLeft: 16
              }}
            >
              <Input placeholder="Tên" className='form-input' />
            </Form.Item>
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="gender"
              rules={[{
                required: true,
                message: 'Không được bỏ trống mục này',
              }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Select placeholder="Giới tính" className='form-input'>
                <Option value="1">Nam</Option>
                <Option value="0">Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="identifyNumber"
              rules={[{
                required: true,
                message: 'Không được bỏ trống mục này',
              }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                marginLeft: 16
              }}
            >
              <Input placeholder="CMND/CCCD/Hộ chiếu" className='form-input' />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input
              placeholder="Username"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="birthday"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{
              display: 'inline-block',
              width: '100%',
            }}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input
              placeholder="Số điện thoại"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input
              placeholder="Email"
              className='form-input'
            />
          </Form.Item>
          <Form.Item colon={false}>
            <Button htmlType="button" className='btn-section-form'>
              Lưu thông tin
            </Button>
          </Form.Item>
        </Form>
        
        <div className='avatar'>
          <ReactImageUploading
            value={avt}
            onChange={handleFilesChange}
            acceptType={['jpg', 'jpeg', 'gif', 'png', 'svg']}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              dragProps
            }) => (
            <div className="upload__image--wrapper">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" onClick={() => onImageUpdate(index)} />
                  <button onClick={onImageRemoveAll} className='btn-edit-img'>X</button>
                </div>
              ))}
                {avt.length
                ? undefined
                : <div
                  className='image-item'
                  {...dragProps}
                >
                  <img src={avatar} onClick={onImageUpload} alt="" />
                </div>}
              </div>
            )}
          </ReactImageUploading>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
