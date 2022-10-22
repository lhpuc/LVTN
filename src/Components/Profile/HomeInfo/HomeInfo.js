import React, { useState } from 'react'
import { Typography, Input, Button, Form, Select , DatePicker } from 'antd'
import ReactImageUploading from 'react-images-uploading';
import avatar from '../../../assets/images/location/banner4.jpg'


const { Title } = Typography
const { Option } = Select

const HomeInfo = () => {
  const [avt, setAvt] = useState([]);
  const [cover, setCover] = useState([]);

  const handleAvtChange = (f) => { setAvt(f) };
  const handleCoverChange = (f) => { setCover(f) };

  return (
    <div className='container-section user-info'>
      <Title className='title-section'>Quản lý trang chủ</Title>
      <div className='content-section home-info'>
        <Form
          className='section-form'
          name="complex-form"
        >
          <Form.Item
            name="homeName"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input
              placeholder="Tên trang chủ"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="typeAccommodation"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{
              display: 'inline-block',
              width: '100%',
            }}
          >
            <Select placeholder="Nhà trọ nam/nữ" className='form-input'>
              <Option value="1">Nam</Option>
              <Option value="0">Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input
              placeholder="Địa chỉ"
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
          <Form.Item
            name="giới thiệu"
            style={{width: '100%'}}
          >
            <Input.TextArea
              rows={10}
              placeholder="Giới thiệu"
              className='form-textarea'
            />
          </Form.Item>
          <Form.Item
            name="ggmap"
            style={{width: '100%'}}
          >
            <Input.TextArea
              rows={10}
              placeholder="Bản đồ chính"
              className='form-textarea'
            />
          </Form.Item>
          <Form.Item colon={false}>
            <Button htmlType="button" className='btn-section-form'>
              Lưu thông tin
            </Button>
          </Form.Item>
        </Form>
        
        <div className='upload-img'>
          <div className='avatar'>
            <Title level={3}>Ảnh trang chủ</Title>
            <ReactImageUploading
              value={avt}
              onChange={handleAvtChange}
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
          <div className='avatar'>
            <Title level={3}>Ảnh bìa</Title>
            <ReactImageUploading
              value={cover}
              onChange={handleCoverChange}
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
                  {cover.length
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
    </div>
  )
}

export default HomeInfo
