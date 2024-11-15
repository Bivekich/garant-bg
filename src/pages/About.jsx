import { useState, useEffect } from "react";
import { getAboutus } from "../sanityclient";
import Form from "../components/Form";

const About = () => {
  // отправка формы
  const token = "7395952644:AAHKzF7QwKD9bGTWzeyEO-HB62hwmSjj-E8";
  const chat_id = "-1002354795137"; // Replace with your Telegram chat ID
  const [tgformData, settgFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    settgFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can send the formData to an API or log it
    console.log("Form Data:", tgformData);

    // Construct the message to be sent to Telegram
    const message = `Новая заявка:\nФИО: ${tgformData.surname} ${tgformData.name}\nНомер телефона: ${tgformData.phone}\nПочта: ${tgformData.email} \nДополнительная информация: ${tgformData.additionalInfo}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodedMessage}`;

    try {
      // Send the message to the Telegram bot
      const response = await fetch(url);

      if (response.ok) {
        alert("Заявка успешно отправлена!");
      } else {
        alert("Ошибка при отправке заявки. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      alert("Ошибка при отправке заявки. Попробуйте снова.");
    }
    // Clear the form after submission (optional)
    // settgFormData({
    //   name: "",
    //   surname: "",
    //   phone: "",
    //   email: "",
    //   additionalInfo: "",
    // });
  };
  // Выданные гарантии
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const aboutus_ = await getAboutus();

      setAboutus(aboutus_);
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="flex flex-col justify-between w-fit m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold m-auto text-[40px] md:text-[75px] lg:text-[90px] w-fit">
            {aboutus.title}
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between m-auto max-w-[1200px]">
          <p className="max-w-[1000px] text-xl lg:text-3xl text-start">
            {aboutus.text}
          </p>
          <img
            src={aboutus.image}
            className="w-full lg:w-1/2 mt-5 lg:mt-0 h-full max-w-[580px] max-h-[580px]"
            alt=""
          />
        </div>
      </section>
      <section id="form"></section>
      <Form />
    </>
  );
};

export default About;
