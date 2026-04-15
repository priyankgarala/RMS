import { useEffect, useState } from "react";
import API from "../api/api";

export default function OrderTracker({ orderId }) {
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      console.error("Error fetching order:", err.message);
    }
  };

  useEffect(() => {
    fetchOrder(); // initial fetch

    const interval = setInterval(() => {
      fetchOrder();
    }, 2000); // every 2 sec

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>🍽️ Order #{order.id}</h2>

      <h3>
        Status:{" "}
        <span
          style={{
            color:
              order.status === "ready"
                ? "green"
                : order.status === "pending"
                ? "orange"
                : "blue",
          }}
        >
          {order.status}
        </span>
      </h3>
    </div>
  );
}