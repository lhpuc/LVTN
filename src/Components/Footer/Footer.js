import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="footer" id="footer">
      <div className="contact">
        <div className="contact-item">
          <h1>Bạn có câu hỏi?</h1>
          <p>Chúng tôi đặt chất lượng và uy tín lên hàng đầu.</p>
        </div>
        <div className="contact-item">
          <a href="/contact" className="form-link">
            <button type="button">Liên hệ ngay</button>
          </a>
        </div>
      </div>
      <div className="content">
        <div className="content-item first">
          <h1 className="content-title logo">Logo</h1>
          <h2 className="content-title">
            Bạn có cần trợ giúp về bất cứ điều gì không?
          </h2>
          <p className="content-text">
            Nhận thông tin cập nhật, ưu đãi hấp dẫn, hướng dẫn, giảm giá được
            gửi trực tiếp trong hộp thư đến của bạn hàng tháng
          </p>
          <div className="content-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="content-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ Email"
              />
              <button className="content-btn">Đăng ký</button>
            </form>
          </div>
        </div>
        <div className="content-item">
          <h2 className="content-title">Bố cục</h2>
          <ul>
            <li>
              <a className="content-link">Nhà cho thuê</a>
            </li>
            <li>
              <a className="content-link"> Giới thiệu</a>
            </li>
            <li>
              <a className="content-link">Liên hệ</a>
            </li>
            <li>
              <a className="content-link">Thành viên nhóm</a>
            </li>
            <li>
              <a className="content-link">Đăng tin</a>
            </li>
          </ul>
        </div>
        <div className="content-item">
          <h2 className="content-title">Tất cả các phần</h2>
          <ul>
            <li>
              <a className="content-link">Tiêu đề</a>
            </li>
            <li>
              <a className="content-link">Đặc trưng</a>
            </li>
            {/* <li>
              <a className="content-link">Attractive</a>
            </li>
            <li>
              <a className="content-link">Testimonials</a>
            </li>
            <li>
              <a className="content-link">Videos</a>
            </li>
            <li>
              <a className="content-link">Footers</a>
            </li> */}
          </ul>
        </div>
        <div className="content-item">
          <h2 className="content-title">Chúng tôi</h2>
          <ul>
            <li>
              <a className="content-link">Blog</a>
            </li>
            <li>
              <a className="content-link">Giá</a>
            </li>
            {/* <li>
              <a className="content-link">Pricing</a>
            </li>
            <li>
              <a className="content-link">Affiliate</a>
            </li>
            <li>
              <a className="content-link">Login</a>
            </li>
            <li>
              <a className="content-link">Changelog</a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="footnote">&copy; 2022. Designd By DODO.</div>
    </footer>
  );
};

export default Footer;
