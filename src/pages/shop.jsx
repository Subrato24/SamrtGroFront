import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShops, addShop, updateShop } from "../features/shops/shopSlice";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.shops);
  const navigate = useNavigate();

  const [newShop, setNewShop] = useState({ name: "", address: "" });
  const [editingShop, setEditingShop] = useState(null);

  // ✅ Load shops
  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // ✅ Add new shop
  const handleAdd = () => {
    if (!newShop.name || !newShop.address) {
      alert("Please fill all fields");
      return;
    }
    dispatch(addShop(newShop));
    setNewShop({ name: "", address: "" });
  };

  // ✅ Update shop
  const handleUpdate = () => {
    if (!editingShop.name || !editingShop.address) {
      alert("Please fill all fields");
      return;
    }
    dispatch(updateShop({ id: editingShop.id, shop: editingShop }));
    setEditingShop(null);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #ffe0e9, #e0f7ff, #e4ffe0)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 p-3 bg-dark text-white rounded shadow">
          <h2 className="m-0">🏬 Shop Management</h2>
          <button className="btn btn-light fw-bold" onClick={() => navigate("/home")}>
            🔙 Back to Home
          </button>
        </div>

        {/* Add / Update Form */}
        <div className="card shadow-lg mb-5 border-0">
          <div className="card-body">
            <h5 className="mb-3 text-primary">
              {editingShop ? "✏️ Update Shop" : "➕ Add New Shop"}
            </h5>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Shop Name"
                  value={editingShop ? editingShop.name : newShop.name}
                  onChange={(e) =>
                    editingShop
                      ? setEditingShop({ ...editingShop, name: e.target.value })
                      : setNewShop({ ...newShop, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={editingShop ? editingShop.address : newShop.address}
                  onChange={(e) =>
                    editingShop
                      ? setEditingShop({ ...editingShop, address: e.target.value })
                      : setNewShop({ ...newShop, address: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                {editingShop ? (
                  <button
                    className="btn btn-warning w-100 fw-bold"
                    onClick={handleUpdate}
                  >
                    ✅ Update
                  </button>
                ) : (
                  <button
                    className="btn btn-success w-100 fw-bold"
                    onClick={handleAdd}
                  >
                    ➕ Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Shops Table */}
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h5 className="mb-3 text-dark">📋 Available Shops</h5>
            <table className="table table-hover align-middle">
              <thead className="table-info">
                <tr>
                  <th>ID</th>
                  <th>Shop Name</th>
                  <th>Address</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((shop) => (
                  <tr key={shop.id} className="table-light">
                    <td>{shop.id}</td>
                    <td>{shop.name}</td>
                    <td>{shop.address}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => setEditingShop(shop)}
                      >
                        ✏️ Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopList;
