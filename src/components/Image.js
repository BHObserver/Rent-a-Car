// // Image.js
// import React from 'react';
// import ImageCarousel from './ImageCarousel';

// const Image = () => {
//   const images = ["default.png", "food.png", "game.png", "home.png", "log.png", "school.png", "transport.png"];

//   return (
//     <div className="my-images">
//       <h1>Image Carousel</h1>
//       <ImageCarousel images={images.map(image => `/assets/images/${image}`)} />
//     </div>
//   );
// };

// export default Image;

// Image.js

import React from 'react';
import ImageCarousel from './ImageCarousel';
import myImage from '../assets/images/food.png';
import myImage1 from '../assets/images/home.png';
import myImage2 from '../assets/images/school.png';

const Image = () => {
  const images = [myImage, myImage1, myImage2];

  // Construct the paths to the images
  const imagePaths = images.map(image => `${image}`);

  return (
    <div className="my-images">
      <h1>Image Carousel</h1>
      <ImageCarousel images={imagePaths} />
    </div>
  );
};

export default Image;
