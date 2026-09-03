"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "../../components/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const payment = searchParams.get("payment");
  const orderType = searchParams.get("type");

  const isCash = payment === "cash";
  const isDelivery = orderType === "delivery";

  useEffect(() => {
  clearCart();
  // Clear the basket only once when the confirmation page opens.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        color: "#302016",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "white",
          borderRadius: "28px",
          padding: "48px 34px",
          textAlign: "center",
          boxShadow: "0 18px 60px rgba(53,35,24,0.15)",
          border: "1px solid #ead9c7",
        }}
      >
        <div
          style={{
            width: "76px",
            height: "76px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "#eef8ef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "38px",
            color: "#267d36",
            fontWeight: 700,
          }}
        >
          ✓
        </div>

        <p
          style={{
            margin: "0 0 8px",
            color: "#b26c26",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "13px",
          }}
        >
          {isCash ? "Order placed" : "Payment successful"}
        </p>

        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(34px, 7vw, 52px)",
          }}
        >
          Thank you for your order
        </h1>

        <p
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#6f5b4d",
          }}
        >
          {isCash
            ? isDelivery
              ? "Your order has been placed. Please pay the driver in cash when your order is delivered."
              : "Your order has been placed. Please pay in cash when you collect your order."
            : "Your payment has been received successfully and your Cafe 25 order has been placed."}
        </p>

        <div
          style={{
            margin: "30px 0",
            padding: "22px",
            borderRadius: "18px",
            background: "#fff7ed",
            textAlign: "left",
          }}
        >
          <strong style={{ display: "block", marginBottom: "8px" }}>
            What happens next?
          </strong>

          <p style={{ margin: 0, lineHeight: 1.7, color: "#6f5b4d" }}>
            {isDelivery
              ? "We will prepare your order for delivery. Please keep your phone nearby in case Cafe 25 needs to contact you."
              : "We will prepare your order for collection. Please keep your phone nearby in case Cafe 25 needs to contact you."}
          </p>
        </div>

        {isCash && (
          <div
            style={{
              marginBottom: "28px",
              padding: "16px",
              borderRadius: "14px",
              background: "#f5f5f5",
              fontWeight: 700,
            }}
          >
            Payment due: {isDelivery ? "Cash on Delivery" : "Cash on Collection"}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "999px",
              background: "#342318",
              color: "white",
              fontWeight: 700,
            }}
          >
            Back to Home
          </Link>

          <Link
            href="/menu"
            style={{
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "999px",
              border: "1px solid #d8b06a",
              color: "#342318",
              fontWeight: 700,
            }}
          >
            Order Again
          </Link>
        </div>
      </div>
    </main>
  );
}