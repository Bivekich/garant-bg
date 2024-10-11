import React, { useRef, useEffect, useState } from "react";

const Form = () => {
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
  };
  return (
    <>
      <section>
        <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[100px] w-fit">
            Остались <span className="text-[#FF6402]">Вопросы?</span>
          </h1>
        </div>
        <div className="flex flex-row flex-wrap gap-10 mt-10 justify-between max-w-[1000px] mx-auto">
          <p className="max-w-[460px] text-2xl text-start mx-auto">
            Оставьте заявку, мы свяжемся с вами в течении нескольких минут и
            обсудим вашу проблему
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 min-w-[200px] w-full max-w-[500px] mx-auto"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-row flex-nowrap gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={tgformData.name}
                  onChange={handleChange}
                  className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Фамилия"
                  value={tgformData.surname}
                  onChange={handleChange}
                  className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                />
              </div>
              <div className="flex flex-row flex-nowrap gap-5">
                <input
                  type="text"
                  name="phone"
                  placeholder="Телефон"
                  value={tgformData.phone}
                  onChange={handleChange}
                  className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={tgformData.email}
                  onChange={handleChange}
                  className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                />
              </div>
            </div>
            <textarea
              name="additionalInfo"
              placeholder="Дополнительная информация"
              value={tgformData.additionalInfo}
              onChange={handleChange}
              className="rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
            ></textarea>
            <button
              type="submit"
              className="text-[#222222] bg-[#FF6402] rounded-[30px] font-bold py-[15px]"
            >
              Отправить
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Form;
