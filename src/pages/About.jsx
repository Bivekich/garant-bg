import { useState, useEffect } from "react";
import { getFAQ } from "../sanityclient";

export default () => {
  // Выданные гарантии
  const [faqElements, setFAQElements] = useState([]);

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
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit">
            О нас
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between max-w-[1200px]">
          <p className="max-w-[1000px] text-3xl text-start">
            <b>Финансовая Компания Гарант-БГ</b> постоянно развивается и растет,
            наши специалисты ежегодно проходят обучение и семинары по повышению
            квалификации. В финансовой сфере работаем более 10 лет, со многими
            банками партнёрские взаимоотношения. Мы предоставляем широкий спектр
            финансовых услуг обеспечивающий прекрасный результат и положительное
            влияние на вашу деятельность, экономим ваше время и деньги. В
            кратчайшие сроки поможем вам получить банковские гарантии: на
            участие в закупках, на обеспечения исполнения контракта, на возврат
            аванса, на гарантийное обслуживание таможенные, налоговые и т.д. от
            наших банков партнеров, без всяких проблем и подводных камней. Если
            вам где-то даже и отказали в выдаче банковской гарантии не
            расстраивайтесь, наши специалисты обязательно разберутся в вашей
            ситуации и помогут в получении. Мы обладаем всеми необходимыми
            ресурсами (залогами, поручителями, контактами) для положительного
            решения вашей финансовой задачи. Если вы хотите узнать большее о
            нас, то заполните контактную форму на нашем сайте или позвоните нам
            и мы обязательно вам ответим. Рады будем сотрудничать с вами, желаем
            вам хорошего дня!
          </p>
          <img
            src="/images/garantbgphoto.png"
            className="w-1/2 h-full max-w-[580px] max-h-[580px]"
            alt=""
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex flex-col justify-between w-fit m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit mx-auto">
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
    </>
  );
};
