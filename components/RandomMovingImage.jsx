import React from 'react';
import Image from 'next/image';

const RandomMovingImage = ({ cols, rows, imageSrc }) => {
  const randomX = Math.random() * 0.7;
  const randomY = Math.random();

  return (
    <div
      className={`moving-image ${`col-span-${cols}`} transition-all duration-300 w-full h-full  ${`row-span-${rows}`} rounded-lg overflow-hidden`}
      style={{ '--random-x-value': randomX, '--random-y-value': randomY }}>
      <Image
        src={imageSrc}
        alt="photo"
        className=" object-cover  w-full h-full"
      />
    </div>
  );
};

export default RandomMovingImage;
