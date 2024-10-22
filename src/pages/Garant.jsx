import { useEffect, useState } from "react";
import { getGarantType } from "../sanityclient";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

const Garant = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item_ = await getGarantType(id);
        setItem(item_);
      } catch (error) {
        console.error("Error fetching garant type:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(item);

  return (
    <>
      <main className="max-w-[1000px] mx-auto my-10">
        <div className="flex flex-col md:flex-row gap-5 justify-between min-h-40 text-start">
          <div className="flex flex-col gap-3 w-full md:w-1/2 order-2 md:order-1">
            <h3 className="text-4xl font-semibold">
              {item.veryShortDescription}
            </h3>
            <p className="font-semibold">{item.shortDescription}</p>
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2 text-3xl font-bold bg-[#FF6402] rounded-2xl min-h-40 order-1 md:order-2">
            {item.title}
          </div>
        </div>
        <p
          className="mt-5 text-start font-base"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </main>
      <Form />
    </>
  );
};

export default Garant;
