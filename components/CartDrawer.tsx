"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const router = useRouter();

  const {
    cart,
    addToCart,
    decreaseCartItem,
    cartTotal,
    cartOpen,
    setCartOpen,
    setCheckoutOpen,
  } = useCart();

  if (!cartOpen) return null;

  const goToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
    router.push("/menu");
  };

  return (
    <div
      onClick={() => setCartOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 9998,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "100%",
          background: "#fffaf0",
          padding: "24px",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "28px" }}>Your Order</h2>

          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "28px",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    marginBottom: "12px",
                  }}
                >
                  <strong>{item.name}</strong>

                  <strong>
                    {"\u00A3"}
                    {(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => decreaseCartItem(item.name)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      background: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    -
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    type="button"
                    onClick={() => addToCart(item.name, item.price)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#f47f35",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
                fontSize: "22px",
              }}
            >
              <strong>Total</strong>

              <strong>
                {"\u00A3"}
                {cartTotal.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              onClick={goToCheckout}
              style={{
                width: "100%",
                marginTop: "28px",
                padding: "16px 20px",
                border: "none",
                borderRadius: "999px",
                background: "#342318",
                color: "white",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}