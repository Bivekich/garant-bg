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
          {/* Large Header for the Document */}
          <div className="flex items-center justify-center w-full md:w-1/2 text-3xl font-bold bg-[#FF6402] rounded-2xl min-h-40 order-1 md:order-2">
            {item.title && item.title[0]}
          </div>

          {/* Content Block Display */}
          <div className="flex flex-col gap-3 w-full md:w-1/2 order-2 md:order-1">
            {item.contentBlocks &&
              item.contentBlocks.map((block, index) => {
                // Render based on the type field in each content block
                switch (block.type) {
                  case "h2":
                    return (
                      <h2 key={index} className="text-4xl font-bold">
                        {block.contentString}
                      </h2>
                    );
                  case "h3":
                    return (
                      <h3 key={index} className="text-3xl font-semibold">
                        {block.contentString}
                      </h3>
                    );
                  case "p":
                    return (
                      <p key={index} className="font-semibold">
                        {block.content}
                      </p>
                    );
                  case "text":
                    return (
                      <p key={index} className="font-semibold">
                        {block.contentString}
                      </p>
                    );
                  default:
                    return null;
                }
              })}
          </div>
        </div>

        {/* Main Document Description */}
        {item.description && (
          <p
            className="mt-5 text-start font-base"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </main>

      <Form />
    </>
  );
};

export default Garant;
