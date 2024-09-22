import { useState, useEffect } from "react";
import { getFAQ, getAboutus } from "../sanityclient";

export default () => {
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
  const [faqElements, setFAQElements] = useState([]);
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const faq = await getFAQ();

      if (faq && faq.length > 0) {
        const faqEls = faq.map((faq_el) => ({
          question: faq_el.title,
          answer: faq_el.answer,
        }));
        setFAQElements(faqEls);
      }
      const aboutus_ = await getAboutus();

      setAboutus(aboutus_);
    };

    fetchData();
  }, []);

  let faqQuestions = new Array();
  let faqAnswers = new Array();
  let state = new Array();
  faqElements.map((item) => {
    state.push(false);
    faqQuestions.push(item.question);
    faqAnswers.push(item.answer);
  });

  // Массив состояний для каждого FAQ элемента
  const [openFAQ, setOpenFAQ] = useState(state);

  // Функция для переключения конкретного FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ((prevState) => {
      const newOpenState = [...prevState];
      newOpenState[index] = !newOpenState[index];
      return newOpenState;
    });
  };

  const faqContentStyle = (isOpen) => ({
    maxHeight: isOpen ? "500px" : "0",
    opacity: isOpen ? 1 : 0,
    marginTop: isOpen ? "1.25rem" : "0",
    overflow: "hidden",
    transition: "0.4s ease-in-out",
  });
  return (
    <>
      <section>
        <div className="flex flex-col justify-between w-fit m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold m-auto text-[40px] md:text-[75px] lg:text-[100px] w-fit">
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

      {/* FAQ Section */}
      <section>
        <div className="flex flex-col justify-between w-fit m-auto my-[50px] max-w-[97vw] px-2">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[100px] w-fit mx-auto">
            FA<span className="text-[#FF6402]">Q</span>
          </h1>
          <p className="text-3xl">Ответы на часто-задаваемые вопросы</p>
          <div className="flex flex-col gap-5 my-5">
            {faqQuestions.map((faq, index) => (
              <div
                key={index}
                className="faq max-w-[530px] flex flex-col rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex flex-row flex-nowrap justify-between">
                  <span className="text-xl">{faq}</span>
                  <span className="text-xl min-w-[20px] text-[#FF6402]">
                    {openFAQ[index] ? "-" : "+"}
                  </span>
                </div>
                <p
                  style={faqContentStyle(openFAQ[index])}
                  className="text-start"
                >
                  {faqAnswers[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="form">
        <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[100px] w-fit">
            Остались <span className="text-[#FF6402]">Вопросы?</span>
          </h1>
        </div>
        <div className="flex flex-row flex-wrap gap-10 mt-10 justify-between max-w-[1000px] mx-auto">
          <span className="max-w-[460px] text-3xl text-start mx-auto">
            Оставьте заявку, мы свяжемся с вами в течении нескольких минут и
            обсудим вашу проблему
          </span>
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
