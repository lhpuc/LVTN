import React from "react";
import "../Contact.css";
import { Button, Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} là trường bắt buộc!",
  types: {
    email: "${label} không phải là một email hợp lệ!",
  },
};

const ContactForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <section class="contact">
        <div class="contact-info">
          <div class="container">
            <ul class="row con-det">
              <li class="col-lg-4 col-sm-12">
                {" "}
                <i class="fa fa-map-marker"></i>
                <p>Trường đại học Bách Khoa TP.HCM</p>
              </li>

              <li class="col-lg-4 col-sm-12">
                {" "}
                <i class="fa fa-phone"></i>
                <p>Phone : +01 123 456 78</p>
                <p>fax : +01 123 456 78</p>
              </li>

              <li class="col-lg-4 col-sm-12">
                {" "}
                <i class="fa fa-clock"></i>
                <p>Thứ 2- Thứ 6 : 9:00 Am to 5:00 PM</p>
                <p>Thứ bảy : 9:00 Am to 12:00 PM</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="contact-form">
          <div class="container">
            <div class="tittle">
              {" "}
              <h3>Cảm ơn đã liên lạc với chúng tôi</h3>
              <p>
                Theo dõi chúng tôi trên các nền tảng mạng xã hội: LinkedIn -
                Facebook - Instagram
              </p>
            </div>
            <div id="contact_message" class="success-msg">
              {" "}
              <i class="fa fa-paper-plane-o"></i>Thank You. Your Message has
              been Submitted
            </div>
            <div className="FormContainer">
              <Form
                role="form"
                id="contact_form"
                method="post"
                onSubmit="return false"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <ul class="row">
                  <li class="col-sm-6">
                    <Form.Item
                      class="font-montserrat"
                      name={["tài khoản", "tên"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <label class="font-montserrat">
                        Tên *
                        <Input
                          type="text"
                          class="form-control"
                          name="name"
                          id="name"
                          placeholder=""
                        />
                      </label>
                    </Form.Item>
                  </li>
                  <li class="col-sm-6">
                    <Form.Item
                      name={["tài khoản", "email"]}
                      rules={[
                        {
                          type: "email",
                        },
                      ]}
                    >
                      <label class="font-montserrat">
                        E-mail *
                        <Input
                          type="text"
                          class="form-control"
                          name="email"
                          id="email"
                          placeholder=""
                        />
                      </label>
                    </Form.Item>
                  </li>

                  <li class="col-sm-6">
                    <Form.Item
                      name={["tài khoản", "số điện thoại"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <label class="font-montserrat">
                        Số điện thoại *
                        <Input
                          type="text"
                          class="form-control"
                          name="company"
                          id="company"
                          placeholder=""
                        />
                      </label>
                    </Form.Item>
                  </li>
                  <li class="col-sm-6">
                    <Form.Item
                      name={["tài khoản", "chủ đề"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <label class="font-montserrat">
                        Chủ đề
                        <Input
                          type="text"
                          class="form-control"
                          name="website"
                          id="website"
                          placeholder=""
                        />
                      </label>
                    </Form.Item>
                  </li>

                  <li class="col-sm-12">
                    <Form.Item name={["tài khoản", "thông tin"]}>
                      <label class="font-montserrat">
                        Thông tin
                        <textarea
                          class="form-control"
                          name="message"
                          id="message"
                          rows="5"
                          placeholder=""
                        ></textarea>
                      </label>
                    </Form.Item>
                  </li>

                  <li class="col-sm-12">
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Gửi ngay
                      </Button>
                    </Form.Item>
                  </li>
                </ul>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
