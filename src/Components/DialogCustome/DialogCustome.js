import { Button, Modal, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
const DialogCustome = ({openDialog}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(openDialog);
    },[openDialog])
    
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="/login"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Đăng Nhập
                    </Button>,
                ]}
            >
                <Result
                    icon={<SmileOutlined />}
                    title="Great, we have done all the operations!"
                />
            </Modal>
        </>
    );
};
export default DialogCustome;