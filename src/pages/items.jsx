import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, addItem, updateItem } from "../features/items/itemsSlice";
import { fetchShops } from "../features/shops/shopSlice";
import { useNavigate } from "react-router-dom";
import { addShoppingItem } from "../features/shopping/shoppingSlice";
import { Container, Row, Col } from "react-bootstrap";

const ItemList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.items);
  const shop = useSelector((state) => state.shops.list);
  const navigate = useNavigate();

  const [newItem, setNewItem] = useState({ brand: "", name: "", shopId: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const selectedShopId = editingItem ? editingItem.shopId : newItem.shopId;

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchShops());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleAdd = () => {
    if (!newItem.brand || !newItem.name) {
      alert("Please fill all fields");
      return;
    }
    dispatch(addItem(newItem));
    setNewItem({ brand: "", name: "", shopId: "" });
  };

  const handleUpdate = (item) => {
    if (!item.brand || !item.name) {
      alert("Please fill all fields");
      return;
    }
    dispatch(updateItem({ id: item.id, item })).then((action) => {
      if (action.payload) setEditingItem(null);
    });
  };

  const handleBack = () => navigate("/home");
  const handleMyList = () => navigate("/ShoppingList");

  const handleAddToCart = (item) => {
    if (!userId || !selectedShopId) {
      alert("User or Shop not selected");
      return;
    }
    const payload = {
      userId,
      shopId: selectedShopId,
      itemId: item.id,
      quantity: 0,
      price: 0,
      total: 0,
    };
    dispatch(addShoppingItem(payload));
    setCartCount((prev) => prev + 1);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #f8d7ff, #d0eaff, #d4f8d4)",
      }}
    >
      <Container>
        {/* Header with Cart Counter */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 p-3 bg-primary text-white rounded shadow">
          <h2 className="m-0 mb-3 mb-md-0">🛍️ Smart Grocery Items</h2>
          <div className="position-relative">
            <button
              className="btn btn-light position-relative fw-bold"
              onClick={handleMyList}
            >
              🛒 My List
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Shop Selector */}
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-body">
            <h5 className="mb-3 text-primary">Select a Shop 🏪</h5>
            <select
              className="form-select"
              value={selectedShopId}
              onChange={(e) =>
                editingItem
                  ? setEditingItem({ ...editingItem, shopId: e.target.value })
                  : setNewItem({ ...newItem, shopId: e.target.value })
              }
            >
              <option value="">Choose a Shop...</option>
              {shop.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add / Update Item Form */}
        <div className="card shadow-lg mb-5 border-0">
          <div className="card-body">
            <h5 className="mb-3 text-success">
              {editingItem ? "✏️ Update Item" : "➕ Add New Item"}
            </h5>
            <Row className="g-3">
              <Col xs={12} md={4}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand"
                  value={editingItem ? editingItem.brand : newItem.brand}
                  onChange={(e) =>
                    editingItem
                      ? setEditingItem({ ...editingItem, brand: e.target.value })
                      : setNewItem({ ...newItem, brand: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} md={4}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={editingItem ? editingItem.name : newItem.name}
                  onChange={(e) =>
                    editingItem
                      ? setEditingItem({ ...editingItem, name: e.target.value })
                      : setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} md={4}>
                {editingItem ? (
                  <button
                    className="btn btn-warning w-100 fw-bold"
                    onClick={() => handleUpdate(editingItem)}
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
              </Col>
            </Row>
          </div>
        </div>

        {/* Items Table */}
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h5 className="mb-3 text-dark">📦 Available Items</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Name</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item.id} className="table-light">
                      <td>{item.id}</td>
                      <td>{item.brand}</td>
                      <td>{item.name}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => setEditingItem(item)}
                        >
                          ✏️ Update
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAddToCart(item)}
                        >
                          📃 Add to List
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-4">
          <button className="btn btn-outline-dark btn-lg" onClick={handleBack}>
            🔙 Back to Home
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ItemList;
