import { Suspense, useState } from "react";
import { Carousel } from "../../pkg/Carousel";
import Image from "./Image";

const ImageCarousel = ({ images = [""] }: { images?: string[] }) => {
  const [imgs] = useState(images);
  return (
    <Carousel
      className="!min-w-[120px] !min-h-[120px]"
      items={imgs?.map((img) => (
        <Suspense>
          <Image src={img} />
        </Suspense>
      ))}
    />
  );
};

export default ImageCarousel;
