import React from "react";
import Back from "../../Components/data/Back/Back";
import img from "../../assets/images/Contact/contact1.png";
import ContactForm from "./ContactForm/ContactForm";

const Contact = () => {
  return (
    <>
      <section className="blog-out mb">
        <Back
          name="Hãy liên hệ với chúng tôi"
          title="Cần được tư vấn?"
          cover={img}
        />
      </section>
      <ContactForm/>
    </>
  );
};

export default Contact;
