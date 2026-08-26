"use client";

import Link from "next/link";
import { useState } from "react";

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "16px",
} as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(22, 18, 15, 0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "14px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Link
          href="/#home"
          onClick={closeMenu}
          style={{
            color: "#f4b756",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "28px",
            letterSpacing: "1px",
          }}
        >
          CAFE 25
        </Link>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="mobile-menu-button"
          style={{
            width: "46px",
            height: "42px",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "10px",
            background: "transparent",
            color: "white",
            fontSize: "25px",
            cursor: "pointer",
          }}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <div
          className={`navigation-links ${menuOpen ? "navigation-open" : ""}`}
        >
          <Link href="/#home" onClick={closeMenu} style={linkStyle}>
            Home
          </Link>

          <Link href="/menu" onClick={closeMenu} style={linkStyle}>
            Menu
          </Link>

          <Link href="/#gallery" onClick={closeMenu} style={linkStyle}>
            Gallery
          </Link>

          <Link href="/#about" onClick={closeMenu} style={linkStyle}>
            About
          </Link>

          <Link href="/#contact" onClick={closeMenu} style={linkStyle}>
            Contact
          </Link>

          <Link
            href="/#order"
            onClick={closeMenu}
            style={{
              ...linkStyle,
              padding: "11px 18px",
              borderRadius: "999px",
              background: "#e9813f",
            }}
          >
            Order Online
          </Link>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-button {
          display: none;
        }

        .navigation-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 760px) {
          .mobile-menu-button {
            display: block;
          }

          .navigation-links {
            display: none;
            position: absolute;
            top: calc(100% + 1px);
            left: 0;
            right: 0;
            padding: 24px 6%;
            background: rgba(22, 18, 15, 0.98);
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.3);
          }

          .navigation-links.navigation-open {
            display: flex;
          }

          .navigation-links a {
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
}