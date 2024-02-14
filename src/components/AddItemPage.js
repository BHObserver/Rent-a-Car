// src/components/AddItemPage.js
import React, { useState } from 'react';
// import './AddItemPage.css'; // Import CSS file for styles

const AddItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, e.g., send data to the server
    console.log('Item name:', itemName);
    console.log('Item description:', itemDescription);
    console.log('Item price:', itemPrice);
    // Reset form fields after submission
    setItemName('');
    setItemDescription('');
    setItemPrice('');
  };

  return (
    <div className="add-item-page">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDescription">Description:</label>
          <textarea
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="itemPrice">Price:</label>
          <input
            type="text"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;
