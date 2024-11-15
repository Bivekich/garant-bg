import { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

const Header = () => {
  // Состояние для отображения мобильного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция для переключения состояния мобильного меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full max-w-[1700px] mx-auto p-4">
        <div className="w-fit">
          <span className="font-bold text-[45px] text-white transition-transform hover:scale-125">
            Гарант-БГ
          </span>
        </div>
        <nav className="hidden lg:flex justify-between max-w-[330px] w-full">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/about">О нас</NavLink>
          <NavLink to="/info">Инфо</NavLink>
        </nav>
        <div className="hidden lg:flex justify-between w-full max-w-[390px]">
          <div className="flex flex-col m-auto">
            <a href="tel:88006004592" className="text-white hover:text-white">
              8 (800) 600-45-92
            </a>
            <Link
              to="/contactus"
              className="text-[#A0A0A0] hover:text-white transition-colors hover:scale-110"
            >
              заказать обратный звонок
            </Link>
          </div>
          <Link
            to="/calc"
            className="rounded-full text-black text-center font-bold h-fit p-3 m-auto bg-white transition-transform hover:text-black hover:scale-110"
          >
            Калькулятор БГ
          </Link>
        </div>
        <button
          id="menuButton"
          className="lg:hidden text-white focus:outline-none bg-transparent border-0 hover:border-0 hover:scale-110"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </header>
      <div
        id="mobileMenu"
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} p-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          <nav className="flex flex-col space-y-4 text-center">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/info">Инфо</NavLink>

            <div className="flex flex-col justify-between gap-5 w-full max-w-[390px]">
              <Link
                to="/calc"
                className="rounded-full text-black text-center font-bold h-fit p-3 m-auto bg-white transition-transform hover:text-black hover:scale-110"
              >
                Калькулятор БГ
              </Link>
              <div className="flex flex-col m-auto">
                <a
                  href="tel:88006004592"
                  className="text-white hover:text-white"
                >
                  8 (800) 600-45-92
                </a>
                <Link
                  to="/contactus"
                  className="text-[#A0A0A0] hover:text-white transition-colors hover:scale-110"
                >
                  заказать обратный звонок
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
