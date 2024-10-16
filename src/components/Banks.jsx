import { useEffect, useState } from "react";
import { getBanks } from "../sanityclient";

const Banks = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const banksData = await getBanks();
        setBanks(banksData);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-fit my-10 gap-5 mx-auto">
        <div className="flex flex-col justify-between w-full max-w-[300px] md:max-w-[600px] lg:max-w-[800px] m-auto my-[50px]">
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit">
            Сотрудничаем
          </h1>
          <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] text-[#FF6402] w-fit self-end">
            с банками
          </h1>
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-7 w-full max-w-[1000px] mx-auto justify-center">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="flex flex-col border-8 border-[#FF6402] bg-white w-full md:w-1/2 lg:w-1/4 rounded-xl px-6 py-8 gap-3"
            >
              <img
                src={bank.image}
                className="mx-auto"
                width="150"
                alt={bank.title}
              />
              <p className="text-2xl font-semibold text-black">{bank.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banks;
