"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../components/CartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

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
          Payment successful
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
            maxWidth: "500px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#6f5b4d",
          }}
        >
          Your payment has been received successfully. We are preparing your
          Cafe 25 order.
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
            Please keep your phone nearby in case we need to contact you about
            your order. Collection and delivery orders will be prepared
            according to the details provided during checkout.
          </p>
        </div>

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