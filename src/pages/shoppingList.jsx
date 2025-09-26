import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchShoppingList,
  fetchShoppingDates,
  fetchShoppingShops,
  updateShoppingItem,
  deleteShoppingItem,
  saveShoppingSummary,
} from '../features/shopping/shoppingSlice';

const ShoppingListPage = () => {
  const dispatch = useDispatch();
  const { list, dates, shops, status, error } = useSelector((state) => state.shopping);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  const [editData, setEditData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(fetchShoppingList(userId));
      dispatch(fetchShoppingDates(userId));
      dispatch(fetchShoppingShops(userId));
    }
  }, [dispatch, userId]);

  const handleChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id) => {
    const { quantity, price } = editData[id] || {};
    dispatch(updateShoppingItem({ id, quantity: Number(quantity), price: Number(price) }));
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteShoppingItem(id));
    }
  };

  // ✅ Filter list using only the date part
  const filteredList = list.filter((item) => {
    const itemDate = item.createdAt.split("T")[0]; // extract YYYY-MM-DD
    return (!selectedDate || itemDate === selectedDate) &&
           (!selectedShop || item.shopName === selectedShop);
  });

  const handleShowTotal = () => {
    if (!selectedDate || !selectedShop) {
      alert('Please select both date and shop');
      return;
    }
    const total = filteredList.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(total);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveSummary = () => {
    if (!selectedDate || !selectedShop) return;
    dispatch(
      saveShoppingSummary({
        shoppingDate: selectedDate,
        shopName: selectedShop,
        totalAmount,
        userId,
      })
    ).then(() => alert(`Summary saved: ₹${totalAmount}`));
    setTotalAmount(0);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="container my-5 p-4 bg-white rounded shadow-lg">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🛒 Your Smart Grocery Shopping List
      </h2>

      {/* Filters Section */}
      <div className="card shadow-sm mb-4 border-0" style={{ background: 'linear-gradient(90deg, #ffecd2, #fcb69f)' }}>
        <div className="card-body d-flex flex-wrap align-items-center gap-3">
          <div>
            <label className="fw-bold me-2">📅 Date:</label>
            <select
              className="form-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">-- All Dates --</option>
              {dates.map((d, idx) => (
                <option key={idx} value={d.split("T")[0]}>
                  {d.split("T")[0]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="fw-bold me-2">🏪 Shop:</label>
            <select
              className="form-select"
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
            >
              <option value="">-- All Shops --</option>
              {shops.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-warning" onClick={handleBack}>
              🔙 Back
            </button>
            <button className="btn btn-primary" onClick={handleShowTotal}>
              💰 Gross Amount
            </button>
            {totalAmount > 0 && (
              <button className="btn btn-success" onClick={handleSaveSummary}>
                ✅ Save Shopping
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Total Amount */}
      {totalAmount > 0 && (
        <div className="alert alert-info text-center fw-bold fs-5">
          🎉 Total Amount: <span className="text-success">₹ {totalAmount.toFixed(2)}</span>
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Shop</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.userName}</td>
                <td>{s.shopName}</td>
                <td>{s.itemName}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={editData[s.id]?.quantity ?? s.quantity}
                    onChange={(e) => handleChange(s.id, 'quantity', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={editData[s.id]?.price ?? s.price}
                    onChange={(e) => handleChange(s.id, 'price', e.target.value)}
                  />
                </td>
                <td className="fw-bold text-success">₹ {s.total}</td>
                <td>
                  {new Date(s.createdAt + "Z").toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleSave(s.id)}
                  >
                    💵 Total
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(s.id)}
                  >
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No items found for this selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingListPage;
