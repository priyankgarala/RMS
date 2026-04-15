import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function PlaceOrder() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders",
        {
          items: [
            {
              name: item,
              quantity: Number(quantity),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 NAVIGATE TO TRACKER
      navigate(`/track/${res.data.orderId}`);
    } catch (err) {
      console.error("Order error:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍔 Place Order</h1>

      <input
        placeholder="Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}