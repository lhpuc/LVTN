
import React, { useState } from 'react';
import { Typography, Button } from 'antd';

import { loginAPI } from '../../api/login/loginApi';
import DialogCustome from '../DialogCustome/DialogCustome';
const { Title } = Typography;


const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cfPassword: '',
  })

  const [openPopUp,setOpenPopUp] = useState(false);

  const handleChangeInput = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
  
    const dataRequest = {
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName:formData.lastName,
      password:formData.password
    }
    loginAPI.registerUser(dataRequest).then((res) =>{
      console.log(res);
      setOpenPopUp(true);
      
    })
  }

  return (
    <div className='section section-auth'>
      <form onSubmit={onSubmit} className='form-auth'>
        <Title className='form-title' level={1}>Đăng ký</Title>
        <Title className='form-sub-title' level={5}>Tạo một tài khoản để tận hưởng tất cả các dịch vụ mà không có bất kỳ quảng cáo miễn phí!</Title>
        <div className='form-group'>
          <input type='text' name='firstName' placeholder='Tên' value={formData.firstName} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <input type='text' name='lastName' placeholder='Họ' value={formData.lastName} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <input type='email' name='email' placeholder='Địa chỉ email' value={formData.email} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <input type='tel' name='phone' placeholder='Số điện thoại' value={formData.phone} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <input type='password' name='password' placeholder='Mật khẩu' value={formData.password} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <input type='password' name='cfPassword' placeholder='Nhập lại mật khẩu' value={formData.cfPassword} onChange={handleChangeInput} />
        </div>
        <div className='form-group'>
          <Button onClick ={onSubmit} type='primary' className='btn-submit'>Đăng ký</Button>
        </div>
        <a onClick={e => e.preventDefault()} className='form-link'>Về trang đăng nhập</a>
      </form>
      <DialogCustome openDialog = {openPopUp} />
    </div>
  )
}

export default SignupForm;