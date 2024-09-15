import FooterNavLink from "./FooterNavLink";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default () => {
  return (
    <>
      <footer className="flex flex-row justify-between flex-wrap mt-20 gap-5 max-w-[1250px] m-auto">
        <div className="flex flex-col gap-5 w-fit">
          <span className="text-white text-s lg:text-xl w-fit">
            info@garant-bg.ru
          </span>
          <div className="flex flex-col justify-start w-fit">
            <span className="text-xl lg:text-6xl text-white font-semibold w-fit ">
              8 (800) 600-45-92
            </span>
            <span className="text-s lg:text-xl text-gray-400 w-fit">
              Звонок по России бесплатный
            </span>
          </div>
          <div className="flex flex-col justify-start w-fit">
            <span className="text-s lg:text-xl text-gray-400 font-semibold w-fit">
              ежедневно 10:00-19:00
            </span>
            <span className="text-white text-s lg:text-xl w-fit text-start">
              123242,г.Москва, ул.Садовая-Кудринская, д. 11, стр. 1, офис 101
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-3">
            <FooterNavLink to="/">Главная</FooterNavLink>
            <FooterNavLink to="/about">О нас</FooterNavLink>
            <FooterNavLink to="/calc">Калькулятор БГ</FooterNavLink>
          </div>
          <div className="flex flex-row gap-5">
            <a
              href="https://api.whatsapp.com/send?phone=79035129685"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img src="/images/wa.svg" />
            </a>
            <a
              href="https://instagram.com/garant_bg?utm_medium=copy_link"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img src="/images/inst.svg" />
            </a>
            <a
              href="https://www.facebook.com/BGgarant/"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img src="/images/facebook.svg" />
            </a>
          </div>
        </div>
        <div className="map-container">
          <YMaps>
            <Map
              defaultState={{ center: [55.763255, 37.586652], zoom: 15 }}
              style={{ width: "100vw", maxWidth: "370px", height: "270px" }} // Set explicit styles for width and height
            >
              <Placemark geometry={[55.763255, 37.586652]} />
            </Map>
          </YMaps>
        </div>
      </footer>
    </>
  );
};
