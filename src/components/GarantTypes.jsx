import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGarantTypes, gettitlegarantes } from "../sanityclient";

const GarantTypes = () => {
  const [garantTypes, setGarantTypes] = useState([]);
  const [titlegarantes, setTitleGarantes] = useState({ title: "", title1: "" });

  useEffect(() => {
    const fetchGarantTypes = async () => {
      try {
        const garantTypes_ = await getGarantTypes();
        setGarantTypes(garantTypes_);

        const titlegarantes_ = await gettitlegarantes();
        setTitleGarantes(titlegarantes_);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGarantTypes();
  }, []);

  // Group garantTypes into chunks of 2
  const groupedGarantTypes = [];
  for (let i = 0; i < garantTypes.length; i += 2) {
    groupedGarantTypes.push(garantTypes.slice(i, i + 2));
  }

  return (
    <section>
      <div className="flex flex-col justify-between max-w-[1000px] m-auto my-[50px]">
        <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] w-fit self-center">
          {titlegarantes.title}
        </h1>
        <h1 className="uppercase font-[BebasNeuee] font-bold text-[40px] md:text-[75px] lg:text-[90px] text-[#FF6402] w-fit self-center">
          {titlegarantes.title1}
        </h1>
      </div>
      <div className="flex flex-col gap-5 m-auto">
        {groupedGarantTypes.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="flex flex-col lg:flex-row lg:flex-nowrap justify-between gap-5 m-auto w-full max-w-[1000px] w-fit"
          >
            {group.map((item, index) => (
              <div
                key={item._id}
                className="flex h-[345px] mx-auto justify-between flex-col rounded-[15px] px-[20px] py-[15px] border-[#383838] border-4 bg-transparent max-w-[530px] w-fit overflow-hidden"
              >
                <div className="flex flex-col gap-3 w-full">
                  <div className="overflow-hidden h-[240px]">
                    {item.contentBlocks &&
                      item.contentBlocks.map((block, idx) => {
                        switch (block.type) {
                          case "h2":
                            return (
                              <h2
                                key={idx}
                                className="text-4xl font-bold truncate"
                                title={block.contentString} // Add tooltip for truncated content
                              >
                                {block.contentString}
                              </h2>
                            );
                          case "h3":
                            return (
                              <h3
                                key={idx}
                                className="text-3xl font-semibold truncate"
                                title={block.contentString}
                              >
                                {block.contentString.length > 50
                                  ? `${block.contentString.slice(0, 50)}...`
                                  : block.contentString}
                              </h3>
                            );
                          case "p":
                            return (
                              <p
                                key={idx}
                                className="overflow-hidden text-ellipsis whitespace-nowrap"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    block.content.length > 100
                                      ? `${block.content.slice(0, 100)}...`
                                      : block.content,
                                }}
                              />
                            );
                          case "text":
                            return (
                              <div
                                key={idx}
                                className="text-lg leading-7 overflow-hidden text-ellipsis whitespace-nowrap"
                              >
                                {block.contentString}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                  </div>
                  <Link
                    to={`garantType/${item._id}`}
                    className="rounded-full text-white text-center text-xl font-semibold h-fit p-3 mr-auto bg-[#FF6402] transition hover:text-white hover:scale-110"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GarantTypes;
