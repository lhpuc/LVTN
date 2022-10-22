import React from 'react'
import "./Ourteam.css"
import Back from '../../Components/data/Back/Back'
import img from "../../assets/images/Ourteam/images1.jpg"

const Ourteam = () => {
  return (
    <section className='blog-out mb'>
        <Back name='Chúng tôi đến từ trường Đại Học Bách Khoa' title='Nhóm chúng tôi gồm 3 thành viên' cover={img} />
    <h1 class="title">Thành viên nhóm</h1>
    <div class="team-row">
        <div class="member">
            <img src="https://scontent.fsgn9-1.fna.fbcdn.net/v/t1.6435-9/66255631_788540521542341_2768663307731599360_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=ijPoP3li_qUAX-ckUy0&_nc_ht=scontent.fsgn9-1.fna&oh=00_AT9aEEt4srxax4M7xkcE8ukYuTT3JOFzECfAkgDsrgUEWg&oe=631EBC3F" alt="images_phuc"/>
            <h2>Lê Hoàng Phúc</h2>
            <p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
            <p> Chuyên ngành Khoa Học máy Tính</p>
        </div>
        <div class="member">
            <img src="https://scontent.fsgn9-1.fna.fbcdn.net/v/t39.30808-6/275224848_1361759357596590_2990334159167944940_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=SjEBo2npp0YAX-mmh6_&_nc_ht=scontent.fsgn9-1.fna&oh=00_AT8wqztPveqIgYh7wQ3Bg16jbWxqIYpEDtVamGnTzyKGhg&oe=62FE1EC4" alt="images_son"/>
            <h2>Hứa Thị Sơn</h2>
            <p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
            <p> Chuyên ngành Khoa Học máy Tính</p>
        </div>
        <div class="member">
            <img src="https://scontent.fsgn9-1.fna.fbcdn.net/v/t1.18169-9/1505228_231544330360300_79161763_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=6g8mp4QNSXUAX-4xMaU&_nc_oc=AQlELZKFnKpUAzlVuxEiKh0Ko6vH2u72j3MCSphRw3JGfnIEL4MJfYhWESy1iTFB8O4&_nc_ht=scontent.fsgn9-1.fna&oh=00_AT8_1Pzo00PcGG1-rEvJUzJ0KZycqAVs5CQ4acuWck-EKA&oe=631FF374" alt="images_Minh"/>
            <h2>Lê Quang Minh</h2>
            <p>Sinh viên trường đại học Bách Khoa thành phố Hồ Chí Minh</p>
            <p> Chuyên ngành Khoa Học máy Tính</p>
        </div>
    </div>
</section>
  )
}

export default Ourteam