"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  orderNumber: string;
  createdAt: string;
  updatedAt?: string;
  status: string;
  orderType: "collection" | "delivery";
  paymentMethod: string;
  collectionTime?: string;
  total: number;
  items: OrderItem[];
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrder() {
    if (!orderNumber) {
      setError("Order number is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/track-order?order=${encodeURIComponent(orderNumber)}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to find order.");
        setOrder(null);
        return;
      }

      setOrder(data.order);
      setError("");
    } catch {
      setError("Unable to load order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();

    const timer = setInterval(loadOrder, 10000);

    return () => clearInterval(timer);
  }, [orderNumber]);

  if (loading) {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={{ marginTop: 0 }}>Tracking your order...</h1>
          <p>Please wait.</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={{ marginTop: 0 }}>Order not found</h1>

          <p>{error || "We could not find this order."}</p>

          <Link
            href="/menu"
            style={{
              display: "inline-block",
              marginTop: "14px",
              padding: "12px 18px",
              background: "#342318",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const steps =
    order.orderType === "delivery"
      ? [
          "new",
          "accepted",
          "preparing",
          "ready",
          "out_for_delivery",
          "completed",
        ]
      : ["new", "accepted", "preparing", "ready", "completed"];

  const currentIndex = steps.indexOf(order.status);

  return (
    <main style={pageStyle}>
      <div style={{ ...cardStyle, maxWidth: "760px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#eef8ef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              fontSize: "30px",
            }}
          >
            ✓
          </div>

          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 700,
              color: "#b86200",
              fontSize: "14px",
            }}
          >
            Live Order Tracking
          </div>

          <h1
            style={{
              margin: "10px 0 8px",
              color: "#342318",
            }}
          >
            {order.orderNumber}
          </h1>

          <p style={{ margin: 0 }}>
            {order.orderType === "delivery"
              ? "Delivery order"
              : "Collection order"}
          </p>
        </div>

        {order.status === "cancelled" ? (
          <div
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <strong style={{ color: "#b91c1c" }}>
              This order has been cancelled.
            </strong>
          </div>
        ) : (
          <div style={{ marginBottom: "30px" }}>
            {steps.map((step, index) => {
              const active = currentIndex >= index;

              return (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: active ? "#342318" : "#eee",
                      color: active ? "white" : "#777",
                      fontWeight: 800,
                    }}
                  >
                    {active ? "✓" : index + 1}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: active ? 800 : 600,
                        color: active ? "#342318" : "#777",
                        fontSize: "17px",
                      }}
                    >
                      {getStatusLabel(step, order.orderType)}
                    </div>

                    {order.status === step && (
                      <div
                        style={{
                          marginTop: "4px",
                          color: "#b86200",
                          fontWeight: 700,
                        }}
                      >
                        Current status
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          style={{
            background: "#fff7ed",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "22px",
          }}
        >
          <div>
            <strong>Requested time:</strong>{" "}
            {order.collectionTime || "ASAP"}
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Payment:</strong>{" "}
            {order.paymentMethod === "cash"
              ? order.orderType === "delivery"
                ? "Cash on Delivery"
                : "Cash on Collection"
              : "Paid Online"}
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Total:</strong> £
            {Number(order.total).toFixed(2)}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "20px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#342318",
            }}
          >
            Your items
          </h2>

          <div style={{ display: "grid", gap: "8px" }}>
            {order.items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <span>
                  {item.quantity} × {item.name}
                </span>

                <strong>
                  £{(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "28px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={loadOrder}
            style={{
              padding: "12px 18px",
              borderRadius: "8px",
              border: "1px solid #b59b87",
              background: "white",
              color: "#342318",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Refresh Status
          </button>

          <Link
            href="/menu"
            style={{
              padding: "12px 18px",
              borderRadius: "8px",
              background: "#342318",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Order Again
          </Link>
        </div>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#777",
          }}
        >
          This page updates automatically every 10 seconds.
        </p>
      </div>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <main style={pageStyle}>
          <div style={cardStyle}>
            <h1 style={{ marginTop: 0 }}>Tracking your order...</h1>
            <p>Please wait.</p>
          </div>
        </main>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}

function getStatusLabel(
  status: string,
  orderType: "collection" | "delivery"
) {
  const labels: Record<string, string> = {
    new: "Order received",
    accepted: "Order accepted",
    preparing: "Preparing your order",
    ready:
      orderType === "delivery"
        ? "Ready for driver"
        : "Ready for collection",
    out_for_delivery: "Out for delivery",
    completed:
      orderType === "delivery"
        ? "Delivered"
        : "Collected",
  };

  return labels[status] || status;
}

const pageStyle = {
  minHeight: "100vh",
  background: "#fffaf0",
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "white",
  borderRadius: "18px",
  padding: "34px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};