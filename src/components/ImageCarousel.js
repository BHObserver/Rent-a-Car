// // ImageCarousel.js
// import React, { useState } from 'react';

// const ImageCarousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextImage = () => {
//     setCurrentIndex((currentIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((currentIndex - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="carousel">
//       <div className="image-container">
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Image ${index + 1}`}
//             style={{ display: index === currentIndex ? 'block' : 'none' }}
//           />
//         ))}
//       </div>
//       <button id="prevBtn" className="nav-btn" onClick={prevImage}>&lt;</button>
//       <button id="nextBtn" className="nav-btn" onClick={nextImage}>&gt;</button>
//     </div>
//   );
// };

// export default ImageCarousel;

// ImageCarousel.js

import React, { useState } from 'react';
// import './ImageCarousel.css'; // Import CSS file for styles

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
      <button id="prevBtn" className="nav-btn" onClick={prevImage}>&lt;</button>
      <button id="nextBtn" className="nav-btn" onClick={nextImage}>&gt;</button>
    </div>
  );
};

export default ImageCarousel;
