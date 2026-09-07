"use client";

import { useEffect, useRef, useState } from "react";

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
  paymentStatus: string;

  items: OrderItem[];

  orderType: "collection" | "delivery";
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
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [updatingOrder, setUpdatingOrder] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const previousOrderNumbers = useRef<string[]>([]);
  const firstLoad = useRef(true);

  async function loadOrders() {
    try {
      setLoading(true);

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
        setLoggedIn(false);
        return;
      }

      if (!response.ok) {
        setLoginError("Unable to load orders. Please try again.");
        return;
      }

      setLoginError("");
      setLoggedIn(true);

      const incomingOrders: Order[] = data.orders || [];

      if (!firstLoad.current) {
        const incomingNumbers = incomingOrders.map(
          (order) => order.orderNumber
        );

        const hasNewOrder = incomingNumbers.some(
          (number) =>
            !previousOrderNumbers.current.includes(number)
        );

        if (hasNewOrder) {
          playNewOrderSound();
        }
      }

      previousOrderNumbers.current = incomingOrders.map(
        (order) => order.orderNumber
      );

      firstLoad.current = false;

      setOrders(incomingOrders);
    } catch (error) {
      console.error("Unable to load orders:", error);
      setLoginError("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    orderNumber: string,
    status: string
  ) {
    try {
      setUpdatingOrder(orderNumber);

      const response = await fetch("/api/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-staff-password": password,
        },
        body: JSON.stringify({
          orderNumber,
          status,
        }),
      });

      if (response.status === 401) {
        alert("Your staff session is no longer authorised.");
        setLoggedIn(false);
        return;
      }

      if (!response.ok) {
        alert("Unable to update order status.");
        return;
      }

      await loadOrders();
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Unable to update order status.");
    } finally {
      setUpdatingOrder("");
    }
  }

  function playNewOrderSound() {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        880,
        audioContext.currentTime
      );

      gain.gain.setValueAtTime(
        0.2,
        audioContext.currentTime
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      oscillator.stop(audioContext.currentTime + 0.25);
    } catch {
      // Browser may block sound until user interaction.
    }
  }

  function logout() {
    setLoggedIn(false);
    setPassword("");
    setOrders([]);
    setLoginError("");
    previousOrderNumbers.current = [];
    firstLoad.current = true;
  }

  useEffect(() => {
    if (!loggedIn) return;

    const timer = setInterval(loadOrders, 10000);

    return () => clearInterval(timer);
  }, [loggedIn, password]);

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
          <h1
            style={{
              marginTop: 0,
              marginBottom: "8px",
              color: "#342318",
            }}
          >
            Cafe 25 Staff
          </h1>

          <p
            style={{
              marginTop: 0,
              marginBottom: "24px",
              lineHeight: 1.5,
            }}
          >
            Enter the staff password to view customer orders.
          </p>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Staff password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadOrders();
              }
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
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              background: "transparent",
              border: "none",
              padding: "0 0 14px 0",
              cursor: "pointer",
              fontWeight: 600,
              color: "#6b4a35",
            }}
          >
            {showPassword
              ? "Hide password"
              : "Show password"}
          </button>

          <button
            onClick={loadOrders}
            disabled={loading}
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
            {loading ? "Loading..." : "View Orders"}
          </button>

          {loginError && (
            <p
              style={{
                color: "crimson",
                marginTop: "14px",
              }}
            >
              {loginError}
            </p>
          )}
        </div>
      </main>
    );
  }

  const visibleOrders = orders.filter((order) => {
    if (showCompleted) return true;

    return (
      order.status !== "completed" &&
      order.status !== "cancelled"
    );
  });

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#342318",
              }}
            >
              Cafe 25 Orders
            </h1>

            <p
              style={{
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Live customer orders
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={loadOrders}
              style={topButtonStyle}
            >
              Refresh
            </button>

            <button
              onClick={() =>
                setShowCompleted(!showCompleted)
              }
              style={topButtonStyle}
            >
              {showCompleted
                ? "Hide Completed"
                : "Show Completed"}
            </button>

            <button
              onClick={logout}
              style={{
                ...topButtonStyle,
                background: "#342318",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <p style={{ marginBottom: "20px" }}>
            Refreshing orders...
          </p>
        )}

        {visibleOrders.length === 0 && (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "14px",
              border: "1px solid #ddd",
            }}
          >
            No active orders.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {visibleOrders.map((order) => {
            const isDelivery =
              order.orderType === "delivery";

            const busy =
              updatingOrder === order.orderNumber;

            return (
              <div
                key={order.orderNumber}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  border:
                    order.status === "new"
                      ? "3px solid #d97706"
                      : "1px solid #ddd",
                  boxShadow:
                    order.status === "new"
                      ? "0 6px 24px rgba(217,119,6,0.16)"
                      : "0 3px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                      }}
                    >
                      {order.orderNumber}
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        fontWeight: 800,
                        fontSize: "18px",
                      }}
                    >
                      {isDelivery
                        ? "DELIVERY"
                        : "COLLECTION"}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    £{Number(order.total).toFixed(2)}
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: "14px",
                  }}
                >
                  <StatusBadge status={order.status} />
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "7px",
                    fontSize: "17px",
                  }}
                >
                  <div>
                    <strong>Customer:</strong>{" "}
                    {order.customerName}
                  </div>

                  <div>
                    <strong>Phone:</strong>{" "}
                    {order.customerPhone}
                  </div>

                  <div>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod === "cash"
                      ? "Cash"
                      : "Paid online"}
                  </div>

                  <div>
                    <strong>Requested time:</strong>{" "}
                    {order.collectionTime || "ASAP"}
                  </div>

                  {isDelivery && (
                    <div>
                      <strong>Address:</strong>{" "}
                      {[
                        order.addressLine1,
                        order.addressLine2,
                        order.postcode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}

                  {order.orderNote && (
                    <div
                      style={{
                        background: "#fff7ed",
                        padding: "10px",
                        borderRadius: "8px",
                        marginTop: "4px",
                      }}
                    >
                      <strong>Customer note:</strong>{" "}
                      {order.orderNote}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    paddingTop: "14px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <strong>Items</strong>

                  <div
                    style={{
                      marginTop: "8px",
                      display: "grid",
                      gap: "6px",
                    }}
                  >
                    {order.items.map((item, index) => (
                      <div key={`${item.name}-${index}`}>
                        {item.quantity} × {item.name} — £
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  Ordered:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {order.status === "new" && (
                    <StatusButton
                      label="Accept Order"
                      disabled={busy}
                      onClick={() =>
                        updateStatus(
                          order.orderNumber,
                          "accepted"
                        )
                      }
                    />
                  )}

                  {order.status === "accepted" && (
                    <StatusButton
                      label="Start Preparing"
                      disabled={busy}
                      onClick={() =>
                        updateStatus(
                          order.orderNumber,
                          "preparing"
                        )
                      }
                    />
                  )}

                  {order.status === "preparing" && (
                    <StatusButton
                      label={
                        isDelivery
                          ? "Ready for Driver"
                          : "Ready for Collection"
                      }
                      disabled={busy}
                      onClick={() =>
                        updateStatus(
                          order.orderNumber,
                          "ready"
                        )
                      }
                    />
                  )}

                  {order.status === "ready" &&
                    isDelivery && (
                      <StatusButton
                        label="Out for Delivery"
                        disabled={busy}
                        onClick={() =>
                          updateStatus(
                            order.orderNumber,
                            "out_for_delivery"
                          )
                        }
                      />
                    )}

                  {order.status === "ready" &&
                    !isDelivery && (
                      <StatusButton
                        label="Complete Order"
                        disabled={busy}
                        onClick={() =>
                          updateStatus(
                            order.orderNumber,
                            "completed"
                          )
                        }
                      />
                    )}

                  {order.status ===
                    "out_for_delivery" && (
                    <StatusButton
                      label="Mark Delivered"
                      disabled={busy}
                      onClick={() =>
                        updateStatus(
                          order.orderNumber,
                          "completed"
                        )
                      }
                    />
                  )}

                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <button
                        disabled={busy}
                        onClick={() => {
                          const confirmed =
                            window.confirm(
                              "Are you sure you want to cancel this order?"
                            );

                          if (!confirmed) return;

                          updateStatus(
                            order.orderNumber,
                            "cancelled"
                          );
                        }}
                        style={{
                          padding: "12px 18px",
                          borderRadius: "8px",
                          border:
                            "1px solid #b91c1c",
                          background: "white",
                          color: "#b91c1c",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function StatusButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "13px 20px",
        borderRadius: "8px",
        border: "none",
        background: "#342318",
        color: "white",
        fontWeight: 800,
        cursor: disabled
          ? "not-allowed"
          : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {disabled ? "Updating..." : label}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const labels: Record<string, string> = {
    new: "NEW ORDER",
    accepted: "ACCEPTED",
    preparing: "PREPARING",
    ready: "READY",
    out_for_delivery: "OUT FOR DELIVERY",
    completed: "COMPLETED",
    cancelled: "CANCELLED",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "7px 12px",
        borderRadius: "999px",
        background: "#f5eadf",
        color: "#342318",
        fontWeight: 800,
        fontSize: "14px",
      }}
    >
      {labels[status] || status.toUpperCase()}
    </span>
  );
}

const topButtonStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #b59b87",
  background: "white",
  color: "#342318",
  fontWeight: 700,
  cursor: "pointer",
};