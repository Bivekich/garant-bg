import { getFAQ } from "../sanityclient";
import { useState, useEffect } from "react";

const FAQ = () => {
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
    <section>
      <div className="flex flex-col justify-between w-fit m-auto my-[50px] max-w-[97vw] px-2">
        <h1 className="uppercase font-[BebasNeueLatin] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit mx-auto">
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
              <p style={faqContentStyle(openFAQ[index])} className="text-start">
                {faqAnswers[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
