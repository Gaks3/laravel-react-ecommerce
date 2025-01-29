import { useEffect, useState } from "react";

import type { Image } from "@/types";

type CarouselProps = {
  images: Image[];
};

export default function Carousel({ images }: CarouselProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, images);

  return (
    <>
      <div className="flex items-start gap-8">
        <div className="flex flex-col items-center gap-2 py-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              className={`border-2 hover:border-blue-500 ${
                image.id === selectedImage.id && "border-blue-500"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.thumb}
                alt={`Carousel Thumb ${image.id}`}
                className="w-[50px]"
              />
            </button>
          ))}
        </div>
        <div className="w-full carousel">
          <div className="w-full carousel-item">
            <img
              src={selectedImage.large}
              alt="Carousel Image"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
