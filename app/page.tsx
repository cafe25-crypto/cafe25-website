import Navbar from "../components/Navbar";

const featuredItems = [
  {
    title: "Full English Breakfast",
    description: "A hearty Café 25 breakfast with classic favourites.",
    image: "/English%20Breakfast.png",
  },
  {
    title: "Puri Bhaji",
    description: "Fluffy puris served with warmly spiced potato bhaji.",
    image: "/Puri%20Bhaji.png",
  },
  {
    title: "Samosa Chaat",
    description: "Crispy samosas, chutneys, yoghurt and fresh toppings.",
    image: "/Samosa%20Chaat.png",
  },
  {
    title: "Aloo Paratha",
    description: "Golden stuffed flatbread served fresh and full of flavour.",
    image: "/Aalo%20Paratha.jpeg",
  },
  {
    title: "Cappuccino",
    description: "Freshly brewed coffee with smooth, creamy foam.",
    image: "/Cappucino.png",
  },
  {
    title: "Mango Lassi",
    description: "A refreshing and creamy mango drink.",
    image: "/Mango%20Lassi.png",
  },
];

const services = [
  {
    icon: "🍽️",
    title: "Dine In",
    description: "Relax and enjoy breakfast, lunch or dinner in our welcoming café.",
  },
  {
    icon: "🥡",
    title: "Takeaway",
    description: "Order your favourites to enjoy wherever you like.",
  },
  {
    icon: "🛵",
    title: "Delivery",
    description: "Available through Uber Eats, Deliveroo and Just Eat.",
  },
  {
    icon: "📅",
    title: "Table Reservations",
    description: "Call us to reserve a table for friends, family or special occasions.",
  },
  {
    icon: "🎉",
    title: "Catering",
    description: "Catering options are available for events and gatherings.",
  },
];

const galleryImages = [
  {
    src: "/Cafe%20Exterior%201.png",
    alt: "Front exterior of Cafe 25",
  },
  {
    src: "/Cafe%20Exterior%202.png",
    alt: "Outdoor seating at Cafe 25",
  },
  {
    src: "/Cafe%20Exterior%203.png",
    alt: "Cafe 25 entrance",
  },
  {
    src: "/Interior%201.png",
    alt: "Cafe 25 dining room",
  },
  {
    src: "/Interior%202.png",
    alt: "Customers dining inside Cafe 25",
  },
  {
    src: "/Kitchen.png",
    alt: "Cafe 25 kitchen",
  },
  {
    src: "/Food%20Spread.jpeg",
    alt: "Selection of Cafe 25 dishes",
  },
  {
    src: "/Chocolate%20Truffle.jpeg",
    alt: "Chocolate truffle cake",
  },
  {
    src: "/Carrot%20Cake.jpeg",
    alt: "Carrot cake",
  },
];

const sectionStyle = {
  padding: "90px 6%",
} as const;

const headingStyle = {
  margin: "0 0 16px",
  fontSize: "clamp(32px, 5vw, 48px)",
  color: "#2b2118",
  textAlign: "center",
} as const;

const paragraphStyle = {
  color: "#66584c",
  fontSize: "18px",
  lineHeight: 1.8,
} as const;

const buttonStyle = {
  display: "inline-block",
  padding: "15px 26px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
} as const;

export default function Home() {
  return (
    <main
      id="home"
      style={{
        margin: 0,
        background: "#fffaf2",
        color: "#2b2118",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Navbar />

      {/* HERO */}
      <section
        style={{
          minHeight: "calc(100vh - 78px)",
          padding: "60px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage:
"linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('/Cafe%20Exterior%203.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div
  style={{
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "20px",
    textAlign: "center",
  }}
>
 <div
  style={{
    width: "130px",
    height: "130px",
    margin: "0 auto 22px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
  }}
>
  <img
    src="/logo.png"
    alt="Cafe 25 Blackpool logo"
    style={{
      position: "absolute",
      width: "260px",
      height: "auto",
      maxWidth: "none",
      left: "-65px",
      top: "-6px",
    }}
  />
</div>

          <p
            style={{
              margin: "0 0 10px",
              color: "#f6b85d",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            English • Indian • American
          </p>

         <h1
  style={{
    margin: 0,
    fontSize: "clamp(52px, 7vw, 76px)",
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-1px",
    textShadow: "0 4px 18px rgba(0,0,0,0.75)",
  }}
>
  Cafe 25
</h1>

<h2
  style={{
    margin: 0,
    fontSize: "clamp(24px, 4vw, 34px)",
    fontWeight: 500,
    color: "#ffdca5",
    letterSpacing: "1px",
    textShadow: "0 3px 12px rgba(0,0,0,0.7)",
  }}
>
  Taste That Stays
</h2>

<p
  style={{
    margin: "4px auto 18px",
    maxWidth: "650px",
    fontSize: "18px",
    lineHeight: 1.65,
    textShadow: "0 2px 10px rgba(0,0,0,0.8)",
  }}
>
  Fresh breakfasts, authentic Indian favourites, British classics,
  handcrafted coffee and homemade desserts in the heart of Blackpool.
</p>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "12px",
  }}
>
  <a
    href="/menu"
    style={{
      ...buttonStyle,
      minWidth: "170px",
      textAlign: "center",
      background: "#e9813f",
      color: "white",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    }}
  >
    View Our Menu
  </a>

  <a
    href="tel:+447760732539"
    style={{
      ...buttonStyle,
      minWidth: "170px",
      textAlign: "center",
      background: "#f7e5c6",
      color: "#342318",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    }}
  >
    Book a Table
  </a>

  <a
    href="#order"
    style={{
      ...buttonStyle,
      minWidth: "170px",
      textAlign: "center",
      border: "2px solid #f7e5c6",
      color: "white",
      background: "rgba(0,0,0,0.18)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    }}
  >
    Order Online
  </a>
</div>

          <p
            style={{
              margin: "28px 0 0",
              color: "#f5d9ad",
              fontWeight: 700,
            }}
          >
            Open every day: 8:00am–8:30pm
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
<section
  style={{
    ...sectionStyle,
    background: "#fffaf2",
  }}
>
  <h2
    style={{
      ...headingStyle,
      textAlign: "center",
      marginBottom: "18px",
    }}
  >
    Why Choose Cafe 25?
  </h2>

  <p
    style={{
      ...paragraphStyle,
      textAlign: "center",
      maxWidth: "760px",
      margin: "0 auto 50px",
    }}
  >
    Fresh food, warm hospitality and a unique mix of British,
    Indian and American favourites served every day.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "24px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}
  >
    {[
      {
        icon: "🍳",
        title: "Fresh Breakfast",
        text: "Start your day with our famous English breakfasts and morning favourites.",
      },
      {
        icon: "☕",
        title: "Fresh Coffee",
        text: "Barista coffee, speciality teas, lassi and refreshing drinks.",
      },
      {
        icon: "🍛",
        title: "Indian Specialities",
        text: "Authentic curries, street food and homemade family recipes.",
      },
      {
  icon: "⭐",
  title: "Google Reviews",
  text: "Read our latest customer reviews, photos and updates on Google.",
  link: "https://maps.app.goo.gl/zVNCMMWaueC66CfM6",
},
    ].map((item) => (
      <div
        key={item.title}
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "22px",
          textAlign: "center",
          boxShadow: "0 12px 35px rgba(0,0,0,.08)",
          border: "1px solid #eee",
        }}
      >
        <div style={{ fontSize: "52px" }}>{item.icon}</div>
{item.link && (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginBottom: "12px",
      color: "#c56a31",
      fontWeight: 700,
      textDecoration: "none",
    }}
  >
    View on Google ↗
  </a>
)}
        <h3
          style={{
            marginTop: "18px",
            marginBottom: "12px",
            color: "#3b2517",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            color: "#666",
            lineHeight: 1.7,
          }}
        >
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>

{/* ABOUT */}
<section id="about" style={sectionStyle}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#c56a31",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Welcome to Cafe 25
            </p>

            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "clamp(38px, 6vw, 58px)",
                lineHeight: 1.08,
              }}
            >
              Good food, warm hospitality and something for everyone.
            </h2>

            <p style={paragraphStyle}>
              Located in the heart of Blackpool, Cafe 25 brings together
              traditional English favourites, flavourful Indian specialities
              and popular American-inspired dishes in one friendly and relaxed
              setting.
            </p>

            <p style={paragraphStyle}>
              Whether you are joining us for breakfast, meeting friends for
              coffee, enjoying a family meal or collecting dinner, our team is
              here to make every visit welcoming and memorable.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: "16px",
            }}
          >
            <img
              src="/Interior%202.png"
              alt="Cafe 25 dining room"
              style={{
                width: "100%",
                height: "470px",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              <img
                src="/Interior%201.png"
                alt="Cafe 25 interior seating"
                style={{
                  width: "100%",
                  height: "227px",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />

              <img
                src="/Kitchen.png"
                alt="Cafe 25 kitchen"
                style={{
                  width: "100%",
                  height: "227px",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CUISINES */}
     
      {/* FEATURED MENU */}
      <section id="menu" style={sectionStyle}>
        <h2 style={headingStyle}>Featured favourites</h2>

        <p
          style={{
            ...paragraphStyle,
            maxWidth: "760px",
            margin: "0 auto 44px",
            textAlign: "center",
          }}
        >
          Explore a small selection of dishes and drinks prepared at Cafe 25.
          Our full digital menu will be added in the next stage.
        </p>

        <div
          style={{
            maxWidth: "1250px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "26px",
          }}
        >
          {featuredItems.map((item) => (
            <article
              key={item.title}
              style={{
                overflow: "hidden",
                borderRadius: "22px",
                background: "white",
                boxShadow: "0 14px 38px rgba(67,43,24,0.10)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "245px",
                  display: "block",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "25px" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: "24px" }}>
                  {item.title}
                </h3>

                <p style={{ ...paragraphStyle, margin: 0, fontSize: "16px" }}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "42px" }}>
          <a
            href="tel:+447760732539"
            style={{
              ...buttonStyle,
              background: "#342318",
              color: "white",
            }}
          >
            Call About Today’s Menu
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section
        style={{
          ...sectionStyle,
          background: "#2d2119",
          color: "white",
        }}
      >
        <h2 style={{ ...headingStyle, color: "white" }}>Ways to enjoy Cafe 25</h2>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto 42px",
            textAlign: "center",
            lineHeight: 1.8,
            color: "#e8d8c4",
            fontSize: "18px",
          }}
        >
          Visit us, collect your order, arrange delivery or speak to our team
          about reservations and catering.
        </p>

        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "20px",
          }}
        >
          {services.map((service) => (
            <article
              key={service.title}
              style={{
                padding: "28px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div style={{ fontSize: "38px" }}>{service.icon}</div>
              <h3 style={{ fontSize: "22px", margin: "16px 0 10px" }}>
                {service.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#e8d8c4",
                  lineHeight: 1.7,
                }}
              >
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ORDER */}
      <section
        id="order"
        style={{
          padding: "90px 6%",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(230,126,59,0.96), rgba(179,79,32,0.96))",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "850px", margin: "auto" }}>
          <h2
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(38px, 6vw, 58px)",
            }}
          >
            Enjoy Cafe 25 at home
          </h2>

          <p
            style={{
              margin: "0 auto 30px",
              maxWidth: "700px",
              fontSize: "19px",
              lineHeight: 1.8,
            }}
          >
            Order through your preferred delivery partner. Direct collection
            and online payment will be added when your ordering system is ready.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            {[
  {
    name: "Uber Eats",
    url: "https://www.ubereats.com/store-browse-uuid/208035b5-12ee-4691-ae41-92e83b0bdce7?diningMode=DELIVERY",
  },
  {
    name: "Deliveroo",
    url: "https://deliveroo.co.uk/menu/preston/blackpool-city-centre/cafe-25-blackpool-25-29-abingdon-street",
  },
  {
    name: "Just Eat",
    url: "https://www.just-eat.co.uk/restaurants-cafe-25-blackpool-fy1-1/menu",
  },
].map((partner) => (
  <a
    key={partner.name}
    href={partner.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      ...buttonStyle,
      background: "white",
      color: "#442519",
    }}
  >
    {partner.name}
  </a>
))}

            <a
              href="tel:+447760732539"
              style={{
                ...buttonStyle,
                background: "#342318",
                color: "white",
              }}
            >
              Call for Collection
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={sectionStyle}>
        <h2 style={headingStyle}>A look inside Cafe 25</h2>

        <p
          style={{
            ...paragraphStyle,
            maxWidth: "720px",
            margin: "0 auto 44px",
            textAlign: "center",
          }}
        >
          Take a look at our café, food and relaxed dining atmosphere.
        </p>

        <div
          style={{
            maxWidth: "1250px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {galleryImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "18px",
              }}
            />
          ))}
        </div>
      </section>

     {/* GOOGLE REVIEWS */}
<section
  style={{
    padding: "78px 6%",
    background: "#fff7ef",
    textAlign: "center",
  }}
>
  <div
    style={{
      maxWidth: "760px",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        fontSize: "32px",
        letterSpacing: "5px",
        marginBottom: "16px",
      }}
    >
      ★★★★★
    </div>

    <p
      style={{
        margin: "0 0 10px",
        color: "#d56e2d",
        fontSize: "15px",
        fontWeight: 800,
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      Customer Reviews
    </p>

    <h2
      style={{
        margin: "0 0 18px",
        color: "#342318",
        fontSize: "clamp(34px, 5vw, 50px)",
        lineHeight: 1.15,
      }}
    >
      See what our customers say
    </h2>

    <p
      style={{
        maxWidth: "630px",
        margin: "0 auto 30px",
        color: "#6b594a",
        fontSize: "18px",
        lineHeight: 1.7,
      }}
    >
      Read our latest reviews, browse customer photos and find Cafe 25 on
      Google Maps.
    </p>

    <a
      href="https://www.google.com/search?q=cafe+25+blackpool&oq=&gs_lcrp=EgZjaHJvbWUqBggEEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYOzIGCAMQABhAMgYIBBBFGDsyBggFEEUYPDIGCAYQRRg9MgYIBxBFGD3SAQgzOTM4ajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "15px 28px",
        borderRadius: "999px",
        background: "#342318",
        color: "white",
        textDecoration: "none",
        fontSize: "17px",
        fontWeight: 800,
        boxShadow: "0 12px 28px rgba(52, 35, 24, 0.18)",
      }}
    >
      View Cafe 25 on Google
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          ...sectionStyle,
          background: "#fffaf2",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#c56a31",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Visit us
            </p>

            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "clamp(38px, 6vw, 58px)",
              }}
            >
              We look forward to welcoming you.
            </h2>

            <div
              style={{
                fontSize: "18px",
                lineHeight: 1.9,
                color: "#57483c",
              }}
            >
              <p>
                <strong>Address:</strong>
                <br />
                25–29 Abingdon Street
                <br />
                Blackpool, FY1 1DG
              </p>

              <p>
                <strong>Opening hours:</strong>
                <br />
                Every day, 8:00am–8:30pm
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+447760732539" style={{ color: "#b65b27" }}>
                  07760 732539
                </a>
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:cafe25team@gmail.com"
                  style={{ color: "#b65b27" }}
                >
                  cafe25team@gmail.com
                </a>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "26px",
              }}
            >
              <a
                href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x487b45bac50d1329:0xc37b78d252f2d0ff?entry=s&sa=X&ved=2ahUKEwjgicrdgdeVAxVlQkEAHUbDMjgQ4kB6BAgeEAA&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...buttonStyle,
                  background: "#342318",
                  color: "white",
                }}
              >
                Get Directions
              </a>

              <a
                href="https://wa.me/447760732539"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...buttonStyle,
                  background: "#287f4b",
                  color: "white",
                }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <iframe
  title="Cafe 25 Blackpool location"
  src="https://www.google.com/maps?q=25-29%20Abingdon%20Street,%20Blackpool,%20FY1%201DG&output=embed"
  width="100%"
  height="520"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  style={{
    display: "block",
    border: 0,
    borderRadius: "26px",
    boxShadow: "0 20px 55px rgba(59,39,24,0.16)",
  }}
/>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "55px 6% 28px",
          background: "#201812",
          color: "#eee2d2",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "35px",
          }}
        >
          <div>
            <h2 style={{ color: "#f6b85d", marginTop: 0 }}>Cafe 25</h2>
            <p style={{ lineHeight: 1.8 }}>
              English, Indian and American food served with warm hospitality in
              the heart of Blackpool.
            </p>
          </div>

          <div>
            <h3 style={{ color: "white" }}>Quick links</h3>
            <p>
              <a href="#home" style={{ color: "#eee2d2" }}>
                Home
              </a>
            </p>
            <p>
              <a href="#about" style={{ color: "#eee2d2" }}>
                About
              </a>
            </p>
            <p>
              <a href="#menu" style={{ color: "#eee2d2" }}>
                Menu
              </a>
            </p>
            <p>
              <a href="#gallery" style={{ color: "#eee2d2" }}>
                Gallery
              </a>
            </p>
          </div>

          <div>
            <h3 style={{ color: "white" }}>Follow Cafe 25</h3>

            <p>
              <a
                href="https://www.facebook.com/share/1BSyyM528v/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#eee2d2" }}
              >
                Facebook
              </a>
            </p>

            <p>
              <a
                href="https://www.instagram.com/cafe25blackpool?igsh=MTB2M2RzczMybm9ocQ=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#eee2d2" }}
              >
                Instagram
              </a>
            </p>

            <p>
              <a
                href="https://vt.tiktok.com/ZSXUtaNsj/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#eee2d2" }}
              >
                TikTok
              </a>
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "35px auto 0",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} Cafe 25 Blackpool. All rights reserved.
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/447760732539"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Cafe 25 on WhatsApp"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          width: "58px",
          height: "58px",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "#25d366",
          color: "white",
          textDecoration: "none",
          fontSize: "28px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.24)",
          zIndex: 999,
        }}
      >
        ☎
      </a>
    </main>
  );
}