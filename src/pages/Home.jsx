import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGivedgarantes, urlFor } from "../sanityclient";

export const Home = () => {
  // Скролл до калькулятора
  const { anchor } = useParams();
  const blocks = {
    calc: useRef(null),
    contactus: useRef(null),
  };

  const scrollToBlock = (anchor_ = "") => {
    if (anchor_ && blocks[anchor_]) {
      blocks[anchor_].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBlock(anchor);
  }, [anchor]);

  // Выданные гарантии
  const [givedgarantesElements, setGivedgarantesElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const givedgarantes = await getGivedgarantes();

      if (givedgarantes && givedgarantes.length > 0) {
        const givedgarantesEls = givedgarantes.map((givedgarant) => ({
          image: urlFor(givedgarant.image).url(),
        }));
        setGivedgarantesElements(givedgarantesEls);
      }
    };

    fetchData();
  }, []);

  // Логика калькулятор
  const [formData, setFormData] = useState({
    size: "",
    time: "",
    benef: "",
    fin: "",
    obesp: "",
  });
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would calculate the result based on formData
    console.log(formData);
    let coef;
    if (formData.benef == "commercial") {
      coef = 0.045;
    } else {
      coef = 0.03;
    }

    const result = formData.size * (formData.time * coef);

    setResult(result);
  };
  if (!result) {
    setResult("Тут будет результат вычислений");
  }

  return (
    <>
      <main>
        <section
          className="max-w-[1600px] w-full min-h-[600px] rounded-[30px] h-full md:aspect-[16/9] lg:aspect-[16/7] relative p-4 lg:mx-auto"
          style={{
            backgroundImage: `url("/images/mainPhoto.png")`, // Use template literals for dynamic values
            backgroundSize: "cover", // Optionally, add size, position, and other properties
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute left-0 top-0 w-full h-full"
            style={{ backgroundColor: "rgba(0, 0, 0, .17)" }}
          ></div>
          <div className="flex flex-col justify-between max-w-[950px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit">
              Ваше доверие -
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit self-end">
              Наша <span className="text-[#FF6402]">гарантия</span>
            </h1>
          </div>
          <div className="flex flex-row gap-2 text-3xl font-semibold">
            <img src="/images/tel.svg" className="w-[35px] h-[35px]" />8 (800)
            600-45-92
          </div>
          <div className="absolute left-0 bottom-0 w-full flex-wrap">
            <div className="m-5 border-t-2 border-white flex flex-col lg:flex-row">
              <div className="flex flex-row justify-between w-full lg:w-1/2">
                <div className="flex flex-col justify-start p-5 max-w-[325px]">
                  <span className="text-xl lg:text-3xl font-semibold w-fit text-start ">
                    До 1млрд ₽
                  </span>
                  <span className="text-m lg:text-2xl font-base w-fit text-start">
                    Максимальный лимит на гарантии
                  </span>
                </div>
                <span className="hidden lg:block h-full w-[1px] bg-white my-3"></span>
                <div className="flex flex-col justify-start p-5 max-w-[325px]">
                  <span className="text-xl lg:text-3xl font-semibold w-fit text-start ">
                    До 300млн ₽
                  </span>
                  <span className="text-m lg:text-2xl font-base w-fit text-start">
                    Максимальный размер гарантии
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full lg:w-1/2">
                <span className="hidden lg:block h-full w-[1px] bg-white my-3"></span>
                <div className="flex flex-col justify-start p-5 max-w-[325px]">
                  <span className="text-xl lg:text-3xl font-semibold w-fit text-start ">
                    До 120 месяцев
                  </span>
                  <span className="text-m lg:text-2xl font-base w-fit text-start">
                    Длительность гарантии
                  </span>
                </div>
                <span className="hidden lg:block h-full w-[1px] bg-white my-3"></span>
                <div className="flex flex-col justify-start p-5 max-w-[325px]">
                  <span className="text-xl lg:text-3xl font-semibold w-fit text-start ">
                    От 1000₽
                  </span>
                  <span className="text-m lg:text-2xl font-base w-fit text-start">
                    Комиссия за оформление
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={blocks.calc}>
          <div className="flex flex-col justify-between my-10">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px]">
              Калькулятор БГ
            </h1>
          </div>
          <form
            name="myform"
            onSubmit={handleFormSubmit}
            className="flex flex-col p-10 gap-5 m-auto max-w-[600px] border-[#383838] border-4 bg-transparent rounded-[30px]"
          >
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="font-semibold text-2xl w-fit">
                Размер банковской гарантии, ₽
              </label>
              <input
                type="number"
                name="size"
                onChange={handleInputChange}
                className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
              />
            </div>
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="font-semibold text-2xl w-fit">
                Срок банковской гарантии, мес
              </label>
              <input
                type="number"
                name="time"
                onChange={handleInputChange}
                className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
              />
            </div>
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="font-semibold text-2xl w-fit">
                Бенецифиар по банковской гарантии
              </label>
              <div className="select">
                <select
                  name="benef"
                  onChange={handleInputChange}
                  className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                >
                  <option value=""></option>
                  <option value="state">Государственный заказчик</option>
                  <option value="commercial">Коммерческая</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="font-semibold text-2xl w-fit">
                Финансовая устойчивость
              </label>
              <div className="select">
                <select
                  name="fin"
                  onChange={handleInputChange}
                  className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                >
                  <option value=""></option>
                  <option value="unsatisfactory">Неудовлетворительное</option>
                  <option value="satisfactory">Удовлетворительное</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="font-semibold text-2xl w-fit">
                Обеспечение
              </label>
              <div className="select">
                <select
                  name="obesp"
                  onChange={handleInputChange}
                  className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                >
                  <option value=""></option>
                  <option value="no">Нет</option>
                  <option value="yes">Да</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-[#FF6402] rounded-[15px] font-bold py-[15px]"
            >
              Рассчитать
            </button>
            <div className="w-full rounded-[15px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent">
              {result}
            </div>
          </form>
        </section>
        <section>
          <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit">
              Виды банковских
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] text-[#FF6402] w-fit self-end">
              Гарантий
            </h1>
          </div>
          <div className="flex flex-col gap-3 text-left text-[20px] max-w-[1000px] mx-auto">
            <p>Банковские гарантии бывают в основном четырех видов:</p>
            <div>
              <p>
                <b>Тендерная гарантия</b> - необходима в госзакупках по 44-ФЗ.,
                223-ФЗ., 615-ПП.РФ., если исполнитель не может внести
                собственные денежные средства на р/счёт заказчика.
              </p>
              <p>Применима:</p>
              <ul className="list-none">
                <li>
                  На обеспечение заявки в тендере - (гарантирует что победитель
                  аукциона не откажется от заключения договора).
                </li>
                <li>
                  На обеспечение исполнения контракта - (гарантирует что
                  контракт будет выполнен).
                </li>
                <li>
                  На возврат аванса - (гарантирует что поставщик выполнит свои
                  договорные обязательства).
                </li>
                <li>
                  На гарантийное обслуживание - (гарантирует качество
                  выполненных работ).
                </li>
              </ul>
            </div>
            <p>
              <b>Коммерческая гарантия</b> - применяется в основном в
              коммерческих контрактах, которые заключаются вне закупок, за
              исключением 223-ФЗ,. - (гарантирует выполнение поставки,
              исполнения по контракту, возврат аванса, возврат инвестиций).
            </p>
            <p>
              <b>Таможенная гарантия</b> - как правило, необходима тем кто
              занимается перевозкой товаров через границу - (гарантирует оплату,
              либо отсрочку таможенных пошлин).
            </p>
            <p>
              <b>Налоговая гарантия</b> - применяется при отсрочке от уплаты
              налогов - (гарантирует что налогоплательщик выплатит налог), для
              освобождения от уплаты авансового платежа акциза - (только для
              организации производителя алкогольной продукции).
            </p>
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-between max-w-[800px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit">
              Выданные
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] text-[#FF6402] w-fit self-end">
              Гарантии
            </h1>
          </div>
          <div className="flex flex-row flex-wrap w-full max-w-[1710px] justify-center gap-[28px] m-auto">
            {givedgarantesElements.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt="Банковская гарантия"
                className="rounded-[30px] w-[40%] min-w-[300px] max-w-[840px]"
              />
            ))}
          </div>
        </section>
        <section id="form" ref={blocks.contactus}>
          <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[50px] lg:text-[100px] w-fit">
              Остались <span className="text-[#FF6402]">Вопросы?</span>
            </h1>
          </div>
          <div className="flex flex-row flex-wrap gap-10 mt-10 justify-between max-w-[1000px] mx-auto">
            <span className="max-w-[460px] text-3xl text-start mx-auto">
              Оставьте заявку, мы свяжемся с вами в течении нескольких минут и
              обсудим вашу проблему
            </span>
            <form
              action=""
              className="flex flex-col gap-5 min-w-[200px] w-full max-w-[500px] mx-auto"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-row flex-nowrap gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Фамилия"
                    className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                  />
                </div>
                <div className="flex flex-row flex-nowrap gap-5">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                  />
                  <input
                    type="email"
                    name="mail"
                    placeholder="E-mail"
                    className="w-full rounded-[30px] px-[15px] py-[10px] border-[#383838] border-4 bg-transparent placeholder:text-white placeholder:font-semibold"
                  />
                </div>
              </div>
              <textarea
                name="additionalinfo"
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
      </main>
    </>
  );
};

export default Home;
