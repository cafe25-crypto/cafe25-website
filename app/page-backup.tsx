const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
} as const;

export default function Home() {
  return (
    <main
      id="home"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 6%",
          backgroundColor: "rgba(20, 20, 20, 0.75)",
        }}
      >
        <strong style={{ fontSize: "26px" }}>Cafe 25</strong>

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <a href="#home" style={linkStyle}>
            Home
          </a>

          <a href="#menu" style={linkStyle}>
            Menu
          </a>

          <a href="#gallery" style={linkStyle}>
            Gallery
          </a>

          <a href="#contact" style={linkStyle}>
            Contact
          </a>
        </div>
      </nav>

      <section
        style={{
          minHeight: "calc(100vh - 75px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(20, 20, 20, 0.65)",
            padding: "45px",
            borderRadius: "18px",
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              margin: "0 0 12px",
            }}
          >
            Cafe 25
          </h1>

          <p style={{ fontSize: "22px", marginBottom: "12px" }}>
            Taste That Stays
          </p>

          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            Breakfast • Lunch • Dinner | Open 8:00am–8:00pm
          </p>

          <a
            href="#menu"
            style={{
              display: "inline-block",
              backgroundColor: "#e98a45",
              color: "white",
              padding: "16px 34px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            View Menu
          </a>
        </div>
      </section>

      <section
        id="menu"
        style={{
          padding: "80px 20px",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
          color: "#222",
        }}
      >
        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Our Menu
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            marginTop:"50px",
          }}
        >
          <div style={cardStyle}>
            <h3>☕ Coffee</h3>
            <p>Freshly brewed espresso and cappuccino.</p>
          </div>

          <div style={cardStyle}>
            <h3>🥞 Breakfast</h3>
            <p>Pancakes, eggs, toast and more.</p>
          </div>

          <div style={cardStyle}>
            <h3>🍔 Lunch</h3>
            <p>Burgers, sandwiches and fresh salads.</p>
          </div>

          <div style={cardStyle}>
            <h3>🍽️ Dinner</h3>
            <p>Indian favourites, grilled dishes and evening meals.</p>
          </div>

          <div style={cardStyle}>
            <h3>🍰 Desserts</h3>
            <p>Cakes, waffles, brownies and ice cream.</p>
          </div>
        </div>
      </section>
  <section
  id="gallery"
  style={{
    padding: "80px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: "36px", marginBottom: "40px", color: "#222" }}>
    Gallery
  </h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "25px",
    }}
  >
    <img
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
      alt="Breakfast"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <img
      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
      alt="Pizza"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <img
      src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
      alt="Burger"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <img
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"
      alt="Restaurant"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <img
      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
      alt="Coffee"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <img
      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500"
      alt="Dessert"
      style={{
        width: "300px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />
  </div>
</section>
<section
  id="contact"
  style={{
    padding: "80px 20px",
    background: "#222",
    color: "white",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
    Contact Us
  </h2>

  <p>📍 Cafe 25, Kerikeri, New Zealand</p>
  <p>📞 +64 XX XXX XXXX</p>
  <p>✉️ cafe25@email.com</p>

  <p style={{ marginTop: "20px" }}>
    Open Daily: 8:00 AM – 8:00 PM
  </p>
</section>
    </main>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "280px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
} as const;