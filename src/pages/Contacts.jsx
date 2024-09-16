export default () => {
  return (
    <>
      <section>
        <div className="flex flex-col justify-between w-fit m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[100px] w-fit">
            Контакты
          </h1>
        </div>
        <div className="flex flex-col gap-5 m-auto">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap justify-between gap-5 m-auto w-full max-w-[1000px] w-fit">
            <div className="flex w-full h-[350px] mx-auto justify-between flex-col rounded-[15px] px-[20px] py-[15px] border-[#383838] border-4 bg-transparent max-w-[530px] w-fit">
              <span className="rounded-full bg-[#383838] font-bold text-xl w-fit px-[15px] py-[5px] flex flex-row items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#FF6402" />
                </svg>
                Способы связи
              </span>
              <div className="flex flex-col justify-start">
                <a
                  href="tel:88006004592"
                  className="flex flex-row gap-2 text-3xl font-semibold text-white hover:text-white"
                >
                  <img src="/images/tel.svg" className="w-[35px] h-[35px]" />8
                  (800) 600-45-92
                </a>
                <a
                  href="mailto:info@garant-bg.ru"
                  className="flex flex-row gap-2 text-3xl font-semibold text-white hover:text-white"
                >
                  <img src="/images/mail.svg" className="w-[35px] h-[35px]" />
                  info@garant-bg.ru
                </a>
              </div>
            </div>
            <div className="flex w-full h-[350px] mx-auto justify-between flex-col rounded-[15px] px-[20px] py-[15px] border-[#383838] border-4 bg-transparent max-w-[530px]">
              <span className="rounded-full bg-[#383838] font-bold text-xl w-fit px-[15px] py-[5px] flex flex-row items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#FF6402" />
                </svg>
                Юридический адрес
              </span>
              <div className="flex flex-col justify-start">
                <div className="flex flex-row gap-2 text-3xl font-semibold text-start">
                  <img
                    src="/images/location.svg"
                    className="w-[35px] h-[35px]"
                  />
                  Москва,ул.Садовая - Кудринская, д.11, стр.1, офис 101
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:flex-nowrap justify-between gap-5 m-auto w-full max-w-[1000px]">
            <div className="flex w-full h-[350px] mx-auto justify-between flex-col rounded-[15px] px-[20px] py-[15px] border-[#383838] border-4 bg-transparent max-w-[530px]">
              <span className="rounded-full bg-[#383838] font-bold text-xl w-fit px-[15px] py-[5px] flex flex-row items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#FF6402" />
                </svg>
                График работы
              </span>
              <div className="flex flex-col justify-start">
                <div className="flex flex-row gap-2 text-3xl font-semibold text-[#383838]">
                  ежедневно
                </div>
                <div className="flex flex-row gap-2 text-3xl font-semibold">
                  <img src="/images/time.svg" className="w-[35px] h-[35px]" />
                  10:00 - 19:00
                </div>
              </div>
            </div>
            <div className="flex w-full h-[350px] mx-auto justify-between flex-col rounded-[15px] px-[20px] py-[15px] border-[#383838] border-4 bg-transparent max-w-[530px]">
              <span className="rounded-full bg-[#383838] font-bold text-xl w-fit px-[15px] py-[5px] flex flex-row items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#FF6402" />
                </svg>
                Наши соц-сети
              </span>
              <div className="flex flex-row gap-5">
                <a
                  href="https://api.whatsapp.com/send?phone=79035129685"
                  className="bg-[#383838] rounded-full w-[50px] h-[50px]"
                >
                  <img src="/images/wa_black.svg" />
                </a>
                <a
                  href="https://instagram.com/garant_bg?utm_medium=copy_link"
                  className="bg-[#383838] rounded-full w-[50px] h-[50px]"
                >
                  <img src="/images/inst_black.svg" />
                </a>
                <a
                  href="https://www.facebook.com/BGgarant/"
                  className="bg-[#383838] rounded-full w-[50px] h-[50px]"
                >
                  <img src="/images/facebook_black.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
