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

const Image = () => {
  const images = ["default.png", "food.png", "game.png", "home.png", "log.png", "school.png", "transport.png"];

  // Construct the paths to the images
  const imagePaths = images.map(image => `/assets/images/${image}`);

  return (
    <div className="my-images">
      <h1>Image Carousel</h1>
      <ImageCarousel images={imagePaths} />
    </div>
  );
};

export default Image;
