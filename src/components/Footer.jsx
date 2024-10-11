import React, { Suspense, lazy } from "react";
import FooterNavLink from "./FooterNavLink";

// Lazy load YMaps
const LazyYMaps = lazy(() =>
  import("@pbe/react-yandex-maps").then((module) => ({
    default: module.YMaps,
  }))
);
const LazyMap = lazy(() =>
  import("@pbe/react-yandex-maps").then((module) => ({
    default: module.Map,
  }))
);
const LazyPlacemark = lazy(() =>
  import("@pbe/react-yandex-maps").then((module) => ({
    default: module.Placemark,
  }))
);

export default () => {
  return (
    <>
      <footer className="flex flex-row justify-between flex-wrap mt-20 gap-5 max-w-[1250px] m-auto">
        <div className="flex flex-col gap-5 w-fit">
          <a
            href="mailto:info@garant-bg.ru"
            className="text-white text-s lg:text-xl w-fit text-white hover:text-white"
          >
            info@garant-bg.ru
          </a>
          <div className="flex flex-col justify-start w-fit">
            <a
              href="tel:88006004592"
              className="text-xl lg:text-6xl text-white font-semibold w-fit text-white hover:text-white"
            >
              8 (800) 600-45-92
            </a>
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
            <FooterNavLink to="/contacts">Контакты</FooterNavLink>
            <FooterNavLink to="/calc">Калькулятор БГ</FooterNavLink>
          </div>
          <div className="flex flex-row gap-5">
            <a
              href="https://api.whatsapp.com/send?phone=79035129685"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img
                title="WhatsApp"
                src="/images/wa.svg"
                width="50"
                height="50"
              />
            </a>
            <a
              href="https://instagram.com/garant_bg?utm_medium=copy_link"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img src="/images/inst.svg" width="50" height="50" />
            </a>
            <a
              href="https://www.facebook.com/BGgarant/"
              className="bg-white rounded-full w-[50px] h-[50px]"
            >
              <img src="/images/facebook.svg" width="50" height="50" />
            </a>
          </div>
        </div>
        <div className="map-container">
          {/* Suspense to handle lazy-loaded components */}
          <Suspense fallback={<div className="text-white">Loading map...</div>}>
            <LazyYMaps>
              <LazyMap
                defaultState={{ center: [55.763255, 37.586652], zoom: 15 }}
                style={{ width: "100vw", maxWidth: "370px", height: "270px" }}
              >
                <LazyPlacemark geometry={[55.763255, 37.586652]} />
              </LazyMap>
            </LazyYMaps>
          </Suspense>
        </div>
      </footer>
    </>
  );
};
