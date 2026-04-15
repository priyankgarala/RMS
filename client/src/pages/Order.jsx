import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Order() {
  const [items, setItems] = useState([{ name: "", quantity: 1 }]);
  const navigate = useNavigate();

  const handleAdd = () => {
    setItems([...items, { name: "", quantity: 1 }]);
  };

  const handleChange = (i, field, value) => {
    const newItems = [...items];
    newItems[i][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = res.data.orderId;

      // 🔥 AUTO NAVIGATE TO TRACKER
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error("Order error:", err.message);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>

      {items.map((item, i) => (
        <div key={i}>
          <input
            placeholder="Item name"
            value={item.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChange(i, "quantity", e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAdd}>Add Item</button>
      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
}