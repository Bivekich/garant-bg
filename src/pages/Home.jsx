import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGivedgarantes,
  urlFor,
  getGarantes,
  getGarantTypes,
} from "../sanityclient";
import FAQ from "../components/FAQ";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Banks from "../components/Banks";
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
  const [garantes, setGarantes] = useState([]);
  const [garantTypes, setGarantTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const givedgarantes = await getGivedgarantes();

      if (givedgarantes && givedgarantes.length > 0) {
        const givedgarantesEls = givedgarantes.map((givedgarant) => ({
          image: urlFor(givedgarant.image).url(),
        }));
        setGivedgarantesElements(givedgarantesEls);
      }
      const garantes_ = await getGarantes();

      setGarantes(garantes_);

      const garantTypes_ = await getGarantTypes();

      setGarantTypes(garantTypes_);
    };

    fetchData(garantTypes);
  }, []);

  console.log(garantTypes);

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
      // coef = 0.045;
      if (formData.obesp == "yes") {
        coef = 0.0035;
      } else {
        if (formData.fin == "unsatisfactory") {
          coef = 0.0045;
        } else {
          coef = 0.004;
        }
      }
    } else {
      if (formData.obesp == "yes") {
        coef = 0.0025;
      } else {
        if (formData.fin == "unsatisfactory") {
          coef = 0.0035;
        } else {
          coef = 0.003;
        }
      }
    }

    const result = Math.round(formData.size * (formData.time * coef));

    setResult(result);
  };
  if (!result) {
    setResult("Тут будет результат вычислений");
  }

  return (
    <>
      <main>
        <section
          className="max-w-[1600px] w-full min-h-[600px] rounded-[30px] h-full md:aspect-[16/9] lg:aspect-[16/7] relative p-4 lg:mx-auto bg-gray-200"
          style={{
            backgroundImage: `url("/images/mainPhoto.webp")`, // Use template literals for dynamic values
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
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit self-center">
              Ваше доверие -
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit self-center">
              Наша <span className="text-[#FF6402]">гарантия</span>
            </h1>
          </div>
          <div className="absolute left-0 bottom-0 w-full flex-wrap">
            <a
              href="tel:88006004592"
              className="flex flex-row gap-2 text-3xl font-semibold ml-5 text-white hover:text-white"
            >
              <img src="/images/tel.svg" className="w-[35px] h-[35px]" />8 (800)
              600-45-92
            </a>
            <a
              href="mailto:info@garant-bg.ru"
              className="flex flex-row gap-2 text-3xl font-semibold ml-5 text-white hover:text-white"
            >
              <img src="/images/mail.svg" className="w-[35px] h-[35px]" />
              info@garant-bg.ru
            </a>
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
                    До 500 млн ₽
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
        <section>
          <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit self-center">
              Виды банковских
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] text-[#FF6402] w-fit self-center">
              Гарантий
            </h1>
          </div>
          <div className="flex flex-row flex-wrap gap-3 text-left text-[20px] max-w-[1000px] mx-auto">
            {garantTypes.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between min-h-40 md:w-1/2"
              >
                <div className="flex flex-col gap-3 w-full order-2 md:order-1">
                  <h2 className="text-4xl font-bold">{item.title}</h2>
                  <h3 className="text-3xl font-semibold">
                    {item.veryShortDescription}
                  </h3>
                  <p>{item.shortDescription}</p>
                  <Link
                    to={`garantType/${item._id}`}
                    className="rounded-full text-white text-center text-xl font-semibold h-fit p-3 mr-auto bg-[#FF6402] transition hover:text-white hover:scale-110"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
            {/* <p>{garantes.par1}</p>
            <div>
              <p>{garantes.par2}</p>
            </div>
            <p>{garantes.par3}</p>
            <p>{garantes.par4}</p>
            <p>{garantes.par5}</p> */}
          </div>
        </section>
        <section ref={blocks.calc}>
          <div className="flex flex-col justify-between my-10">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px]">
              Калькулятор БГ
            </h1>
          </div>
          <form
            name="myform"
            onSubmit={handleFormSubmit}
            className="flex flex-col p-10 gap-5 m-auto max-w-[600px] border-[#383838] border-4 bg-transparent rounded-[30px]"
          >
            <div className="flex flex-col justify-start">
              <label
                htmlFor=""
                className="font-semibold text-base lg:text-2xl w-fit text-start"
              >
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
              <label
                htmlFor=""
                className="font-semibold text-base lg:text-2xl w-fit text-start"
              >
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
              <label
                htmlFor=""
                className="font-semibold text-base lg:text-2xl w-fit text-start"
              >
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
              <label
                htmlFor=""
                className="font-semibold text-base lg:text-2xl w-fit text-start"
              >
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
              <label
                htmlFor=""
                className="font-semibold text-base lg:text-2xl w-fit text-start"
              >
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
          <div className="flex flex-col justify-between max-w-[300px] md:max-w-[600px] lg:max-w-[800px] m-auto my-[50px]">
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit">
              Выданные
            </h1>
            <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] text-[#FF6402] w-fit self-end">
              Гарантии
            </h1>
          </div>
          <div className="flex flex-row flex-wrap w-full max-w-[1710px] justify-center gap-[28px] m-auto">
            {givedgarantesElements.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt="Банковская гарантия"
                loading="lazy"
                className="rounded-[30px] w-[40%] min-w-[300px] max-w-[840px]"
              />
            ))}
          </div>
        </section>
        <Banks />
        <FAQ />
        <section id="form" ref={blocks.contactus}></section>
        <Form />
      </main>
    </>
  );
};

export default Home;
