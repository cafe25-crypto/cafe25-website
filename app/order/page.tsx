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

  async function loadOrders() {
    try {
      const response = await fetch("/api/order", {
        cache: "no-store",
      });

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Unable to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();

    const timer = setInterval(loadOrders, 10000);

    return () => clearInterval(timer);
  }, []);

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