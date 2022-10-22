import React from 'react'
import { Typography, Input, Button, Form } from 'antd'

const { Title } = Typography

const ChangePassword = () => {
  return (
    <div className='container-section change-password'>
      <Title className='title-section'>Đổi mật khẩu</Title>

      <div className='content-section'>
        <Form
          className='section-form'
          name="complex-form"
          style={{margin: '0 auto'}}
        >
          <Form.Item
            name="oldPassword"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input.Password
              placeholder="Mật khẩu cũ"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{
              display: 'inline-block',
              width: '100%',
            }}
          >
            <Input.Password
              placeholder="Mật khẩu mới"
              className='form-input'
            />
          </Form.Item>
          <Form.Item
            name="cfNewPassword"
            rules={[{
              required: true,
              message: 'Không được bỏ trống mục này',
            }]}
            style={{width: '100%'}}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              className='form-input'
            />
          </Form.Item>
          <Form.Item colon={false}>
            <Button htmlType="button" className='btn-section-form'>
              Lưu thông tin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
