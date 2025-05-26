import { Suspense, lazy } from "react";
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

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1a1a1a] py-12 mt-20">
        <div className="max-w-[1250px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Колонка 1: Контактная информация */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#FF6402] font-bold text-xl mb-2">Контакты</h3>
              <a
                href="mailto:info@garant-bg.ru"
                className="text-white hover:text-[#FF6402] transition-colors"
              >
                info@garant-bg.ru
              </a>
              <div>
                <a
                  href="tel:88006004592"
                  className="text-2xl md:text-3xl text-white font-semibold hover:text-[#FF6402] transition-colors block"
                >
                  8 (800) 600-45-92
                </a>
                <span className="text-gray-400 text-sm">
                  Звонок по России бесплатный
                </span>
              </div>
              <div>
                <p className="text-gray-400 font-semibold">
                  ежедневно 10:00-19:00
                </p>
                <address className="text-white not-italic">
                  123242, г. Москва, ул. Садовая-Кудринская, д. 11, стр. 1, офис 101
                </address>
              </div>
            </div>

            {/* Колонка 2: Навигация */}
            <div className="flex flex-col">
              <h3 className="text-[#FF6402] font-bold text-xl mb-4">Навигация</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <FooterNavLink to="/">Главная</FooterNavLink>
                <FooterNavLink to="/about">О нас</FooterNavLink>
                <FooterNavLink to="/contacts">Контакты</FooterNavLink>
                <FooterNavLink to="/calc">Калькулятор БГ</FooterNavLink>
              </div>
              
              <h3 className="text-[#FF6402] font-bold text-xl mt-8 mb-4">Документы</h3>
              <div className="flex flex-col space-y-2">
                <a href="/documents/privacy-policy.html" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm">Политика конфиденциальности</a>
                <a href="/documents/terms-of-use.html" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm">Пользовательское соглашение</a>
                <a href="/documents/personal-data-agreement.html" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm">Согласие на обработку персональных данных</a>
              </div>
            </div>

            {/* Колонка 3: Карта и соцсети */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h3 className="text-[#FF6402] font-bold text-xl mb-4">Мы на карте</h3>
                <div className="rounded-lg overflow-hidden">
                  <Suspense fallback={<div className="bg-gray-800 text-white p-4 h-[200px] flex items-center justify-center">Загрузка карты...</div>}>
                    <LazyYMaps>
                      <LazyMap
                        defaultState={{ center: [55.763255, 37.586652], zoom: 15 }}
                        style={{ width: "100%", height: "200px" }}
                      >
                        <LazyPlacemark geometry={[55.763255, 37.586652]} />
                      </LazyMap>
                    </LazyYMaps>
                  </Suspense>
                </div>
              </div>
              
              <h3 className="text-[#FF6402] font-bold text-xl mb-4">Мы в соцсетях</h3>
              <div className="flex space-x-4">
                <a
                  href="https://api.whatsapp.com/send?phone=79035129685"
                  className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <img
                    src="/images/wa.svg"
                    width="30"
                    height="30"
                    alt="WhatsApp"
                  />
                </a>
                <a
                  href="https://instagram.com/garant_bg?utm_medium=copy_link"
                  className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <img 
                    src="/images/inst.svg" 
                    width="30" 
                    height="30" 
                    alt="Instagram"
                  />
                </a>
                <a
                  href="https://www.facebook.com/BGgarant/"
                  className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <img 
                    src="/images/facebook.svg" 
                    width="30" 
                    height="30" 
                    alt="Facebook"
                  />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
            © 2024 Гарант-БГ. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
