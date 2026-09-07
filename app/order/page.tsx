"use client";

import { useEffect, useState } from "react";

type Order = {
  orderNumber: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  orderType: string;
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
  collectionTime?: string;
  addressLine1?: string;
  addressLine2?: string;
  postcode?: string;
  orderNote?: string;
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
const [password, setPassword] = useState("");
const [loggedIn, setLoggedIn] = useState(false);
const [loginError, setLoginError] = useState("");
const [showPassword, setShowPassword] = useState(false);
  async function loadOrders() {
    try {
     const response = await fetch("/api/order", {
  cache: "no-store",
  headers: {
    "x-staff-password": password,
  },
});
      const data = await response.json();
     if (response.status === 401) {
  setLoginError("Incorrect staff password.");
  setOrders([]);
  return;
}

if (!response.ok) {
  setLoginError("Unable to load orders. Please try again.");
  setOrders([]);
  return;
}

setLoginError("");
setLoggedIn(true);
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Unable to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  if (!loggedIn) return;

  const timer = setInterval(loadOrders, 10000);

  return () => clearInterval(timer);
}, [loggedIn]);

  if (!loggedIn) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Cafe 25 Staff</h1>
        <p style={{ marginBottom: "24px" }}>
          Enter the staff password to view customer orders.
        </p>

       <input
  type={showPassword ? "text" : "password"}
  placeholder="Staff password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") loadOrders();
  }}
  style={{
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "8px",
  }}
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  style={{
    background: "transparent",
    border: "none",
    padding: "0 0 14px 0",
    cursor: "pointer",
    fontWeight: 600,
    color: "#6b4a35",
  }}
>
  {showPassword ? "Hide password" : "Show password"}
</button>

<button
  onClick={loadOrders}
  style={{
    width: "100%",
    padding: "14px",
    background: "#342318",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  View Orders
</button>

        {loginError && (
          <p style={{ color: "crimson", marginTop: "14px" }}>
            {loginError}
          </p>
        )}
      </div>
    </main>
  );
}

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "5px" }}>Cafe 25 Orders</h1>

        <p style={{ marginTop: 0, marginBottom: "30px" }}>
          Live customer orders
        </p>

        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && <p>No orders yet.</p>}

        {orders.map((order) => (
          <div
            key={order.orderNumber}
            style={{
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "16px",
              padding: "22px",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>{order.orderNumber}</h2>

                <p>
                  <strong>
                    {order.orderType === "delivery"
                      ? "DELIVERY"
                      : "COLLECTION"}
                  </strong>
                </p>
              </div>

              <div>
                <strong>£{Number(order.total).toFixed(2)}</strong>
              </div>
            </div>

            <hr />

            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>

            <p>
              <strong>Phone:</strong> {order.customerPhone}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod === "cash" ? "Cash" : order.paymentMethod}
            </p>

            {order.collectionTime && (
              <p>
                <strong>Requested time:</strong> {order.collectionTime}
              </p>
            )}

            {order.orderType === "delivery" && (
              <p>
                <strong>Address:</strong>{" "}
                {[
                  order.addressLine1,
                  order.addressLine2,
                  order.postcode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}

            <h3>Items</h3>

            {order.items?.map((item, index) => (
              <p key={index}>
                {item.quantity} × {item.name} — £
                {(item.price * item.quantity).toFixed(2)}
              </p>
            ))}

            {order.orderNote && (
              <p>
                <strong>Order note:</strong> {order.orderNote}
              </p>
            )}

            <p>
              <strong>Placed:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}