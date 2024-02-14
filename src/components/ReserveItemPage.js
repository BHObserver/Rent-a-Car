// src/components/ReserveItemPage.js
import React, { useState } from 'react';
// import './ReserveItemPage.css'; // Import CSS file for styles

const ReserveItemPage = () => {
  // Sample item details, replace with actual data
  const selectedItem = {
    name: "Sample Item",
    description: "This is a sample item description.",
    price: "$10.00",
    availability: "In stock"
  };

  const [quantity, setQuantity] = useState(1);
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const handleReserve = () => {
    // Here you can handle the reservation logic, e.g., send data to the server
    // For demonstration purposes, let's just set reserveSuccess to true
    setReserveSuccess(true);
  };

  return (
    <div className="reserve-item-page">
      <h2 className='reserve-item-header'>Reserve Item Here</h2>
      <div className="item-details">
        <h3 className='sample-item'>{selectedItem.name}</h3>
        <p className='item-desc'>Description: {selectedItem.description}</p>
        <p className='item-price'>Price: {selectedItem.price}</p>
        <p className='item-availability'>Availability: {selectedItem.availability}</p>
      </div>
      <form onSubmit={handleReserve}>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className='quantity'
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className='reserve-btn'>Reserve</button>
      </form>
      {reserveSuccess && <p className="success-message">Item reserved successfully!</p>}
    </div>
  );
};

export default ReserveItemPage;
