import React from "react";
import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faSignal,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
// import { Carousel } from "antd";
import { properties } from "../../Components/data/PropertyData";
import "./Home.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} là trường bắt buộc!",
  types: {
    email: "${label} không phải là một email hợp lệ!",
  },
};

const PropertyDetails = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const { id } = useParams();
  const property = properties.find((properties) => {
    return properties.id === parseInt(id);
  });

  return (
    <div className="container mx-auto min-h-[800px] mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{property.name}</h2>
                <h3 className="text-lg mb-4">{property.propLocation}</h3>
              </div>
              <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                <div className="bg-green-500 rounded-full text-white px-3 inline-block">
                  {property.type}
                </div>
                <div className="bg-violet-500 rounded-full text-white px-3 inline-block">
                  {property.cityName}
                </div>
              </div>
              <div className="text-3xl font-semibold text-violet-600">
                $ {property.price}
              </div>
            </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="image_items">
          <div className="mb-8">
            <img src={property.propertyImage} alt="" />
          </div>
          <div className="flex gap-x-6 text-violet-700 mb-6">
            <div className="flex1 flex-col items-center justify-center text-lg font-medium">
              <FontAwesomeIcon icon={faBed} />
              <p className="pt-1 text-xs">{property.numBeds} Phòng ngủ</p>
            </div>

            <div className="flex1 flex-col items-center justify-center text-lg font-medium">
              <FontAwesomeIcon icon={faBath} />
              <p className="pt-1 text-xs">{property.numBaths} phòng tắm</p>
            </div>

            <div className="flex1 flex-col items-center justify-center text-lg font-medium">
              <FontAwesomeIcon icon={faWarehouse} />
              <p className="pt-1 text-xs">{property.numbacony} ban công</p>
            </div>

            <div className="flex1 flex-col items-center justify-center text-lg font-medium">
              <FontAwesomeIcon icon={faSignal} />
              <p className="pt-1 text-xs">{property.numFloor}tầng </p>
            </div>
          </div>
          <p>{property.propName}</p>
          <h3>
            {" "}
            <strong> Mô tả:</strong>
          </h3>
          <p>{property.decriptiondetail}</p>
          <br />
          <h3>
            {" "}
            <strong> Đặc điểm cơ bản:</strong>
          </h3>
          <p> Số lượng phòng ngủ: {property.numBeds} </p>
          <p> Số lượng phòng tắm: {property.numBaths} </p>
          <p> Số lượng ban công: {property.numbacony}</p>
          <p> Số lượng tầng: {property.numFloor} </p>
          <p> Diện tích nhà: {property.perimeter}</p>
          <br />
          <h3>
            {" "}
            <strong> Giải pháp bố trí:</strong>
          </h3>
          <p> {property.layoutsolution}</p>
          <br />
          <h3>
            {" "}
            <strong> Thi công và trang bị căn hộ:</strong>
          </h3>
          <p> {property.construction}</p>
          <br />
          <h3>
            {" "}
            <strong> Địa điểm:</strong>
          </h3>
          <p> {property.locationdetail}</p>
          <br />
          <h3>
            {" "}
            <strong> Ý kiến:</strong>
          </h3>
          <p> {property.idea}</p>
          <br />
        </div>
        <div className="flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8">
          <div className="flex items-center gap-x-4 mb-8">
            <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
              <img src={property.agent.owner} alt="" />
            </div>
            <div>
              <div className="font-bold text-lg">{property.agent.name}</div>
              <Link to="" className="text-violet-700 text-sm">
                View listings
              </Link>
            </div>
          </div>
          {/* <form className="flex flex-col gap-y-4">
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Name*"
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Email*"
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Phone*"
            />
            <textarea
              className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
              type="text"
              placeholder="Message*"
              defaultValue="Hello, I am interested in [Modern apartment]"
            />
            <div className="flex gap-x-2">
              <button
                className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition"
                type="submit"
              >
                Send message
              </button>
              <button className="border border-violet-700 text-violet-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition">
                Call
              </button>
            </div>
          </form> */}
          <div className=" ">
            
            <Form
              className="flex flex-col gap-y-4"
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
                        className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                        type="text"
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
                        className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                        type="text"
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
                        className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                        type="text"
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
                        className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                        type="text"
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
                        className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
                        // class="form-control"
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
    </div>
  );
};

export default PropertyDetails;
