import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import ItemsPage from './pages/items';
import ShopPage from './pages/shop';
import IndexPage from './pages/index';
import ShoppingList from './pages/shoppingList';
import Info from './pages/info';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/home" element={<IndexPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/info" element={<Info />} />

        {/* After login, redirect here */}
        <Route path="/items" element={<ItemsPage />} />

        <Route path="/shoppingList" element={<ShoppingList />} />

        <Route path="/shops" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
