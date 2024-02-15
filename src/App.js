// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ReserveItemPage from './components/ReserveItemPage'; // Import ReserveItemPage component
import AddItemPage from './components/AddItemPage'; // Import AddItemPage component
import './App.css'; // Import CSS file for styles

const Reserve = () => <h2>Reserve For Page</h2>;
const MyReservations = () => <h2>My Reservations Page</h2>;
const AddItem = () => <h2>Add Item Page</h2>;
const DeleteItem = () => <h2>Deleted Items Page</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="contents">
          <Routes>
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/reserve-item" element={<ReserveItemPage />} /> {/* Link to ReserveItemPage */}
            <Route path="/my-reservations" element={<MyReservations />} />
            <Route path="/add-item" element={<AddItemPage />} /> {/* Link to AddItemPage */}
            <Route path="/add-item1" element={<AddItem />} />
            <Route path="/delete-item" element={<DeleteItem />} />
            <Route path="/" element={<h2>Home Page</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
