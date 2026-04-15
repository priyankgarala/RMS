import { useParams } from "react-router-dom";
import OrderTracker from "../components/OrderTracker";

export default function OrderTrackerPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Order Tracking</h1>
      <OrderTracker orderId={id} />
    </div>
  );
}