"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
  options?: string[];
};

type MenuGroup = {
  title: string;
  note?: string;
  items: MenuItem[];
};

type MenuCategory = {
  id: string;
  name: string;
  groups: MenuGroup[];
};

const menuCategories: MenuCategory[] = [
  {
    id: "drinks",
    name: "Drinks",
    groups: [
      {
        title: "Tea",
        items: [
          { name: "English Breakfast Tea", price: "£2.00" },
          { name: "Flavoured Tea", price: "£2.25" },
          { name: "Royal Karak Chai", price: "£2.50" },
          { name: "Masala Tea", price: "£2.75" },
        ],
      },
      {
        title: "Large Mug Tea",
        note: "A bigger mug for extra satisfaction.",
        items: [{ name: "Large Mug Tea", price: "£2.75" }],
      },
      {
        title: "Barista Coffee",
        items: [
          { name: "Latte", price: "£3.00" },
          { name: "Cappuccino", price: "£3.00" },
          { name: "Flat White", price: "£3.00" },
          { name: "Americano", price: "£2.80" },
          { name: "Mocha", price: "£3.25" },
          { name: "Instant Coffee", price: "£2.50" },
          { name: "Hot Chocolate", price: "£3.00" },
          { name: "Deluxe Hot Chocolate", price: "£3.95" },
          { name: "Extra Shot", price: "£0.60" },
          { name: "Whipped Cream", price: "£0.60" },
        ],
      },
      {
        title: "Flavoured Syrups",
        note: "Add a splash of flavour to your drink.",
        items: [
          {
            name: "Vanilla, Caramel, Hazelnut, Cinnamon or Gingerbread",
            price: "£0.60",
          },
        ],
      },
      {
        title: "Bollywood Lassi",
        note: "Refreshing yoghurt drink, blended to perfection.",
        items: [{ name: "Mango Lassi", price: "£3.50" }],
      },
      {
        title: "Cold Drinks",
        items: [
          { name: "Mineral Water — Still", price: "£1.20" },
          { name: "Sparkling Water", price: "£1.50" },
          {
            name: "Cans — 330ml",
            price: "£1.50",
            description: "Coke, Diet Coke, Fanta or Sprite",
          },
          { name: "Coke — 500ml", price: "£2.20" },
          {
            name: "J2O — 275ml",
            price: "£2.20",
            description: "Apple & Mango or Orange & Passion Fruit",
          },
          {
            name: "Oasis — 500ml",
            price: "£2.20",
            description: "Citrus Punch or Summer Fruits",
          },
          {
            name: "Fruit Juice — 250ml",
            price: "£2.50",
            description: "Orange, Apple, Pineapple or Cranberry",
          },
          {
            name: "Iced Tea — 500ml",
            price: "£2.20",
            description: "Lemon or Peach",
          },
          { name: "Red Bull — 250ml", price: "£2.50" },
        ],
      },
      {
        title: "Iced Specials",
        items: [
          { name: "Iced Latte", price: "£3.25" },
          { name: "Iced Mocha", price: "£3.50" },
          { name: "Flavoured Iced Coffee", price: "£3.50" },
        ],
      },
      {
        title: "Milk Options",
        items: [
          { name: "Whole Milk" },
          { name: "Semi-Skimmed Milk" },
          { name: "Soya Milk" },
          { name: "Oat Milk", price: "+£0.60" },
          { name: "Almond Milk", price: "+£0.60" },
        ],
      },
    ],
  },

  {
    id: "breakfast",
    name: "Breakfast",
    groups: [
      {
        title: "Classic Breakfasts",
        note: "Includes a mug of tea or instant coffee. Additional drinks are extra.",
        items: [
          {
            name: "Full English Breakfast",
            price: "£9.50",
            description:
              "2 sausages, 2 bacon, 1 egg, mushrooms, 2 hash browns, black pudding, tomatoes, beans and toast.",
          },
          {
            name: "Mini English Breakfast",
            price: "£7.50",
            description:
              "1 sausage, 1 bacon, 1 egg, 1 hash brown, beans and toast.",
          },
          {
            name: "Full Scottish Breakfast",
            price: "£9.50",
            description:
              "2 Lorne sausages, 2 bacon, 1 egg, 1 hash brown, 2 potato cakes, haggis, beans and toast.",
          },
          {
            name: "Vegetarian Breakfast",
            price: "£9.50",
            description:
              "2 vegetarian sausages, 1 egg, 1 hash brown, 2 potato cakes, mushrooms, vegetarian black pudding, tomatoes, beans and toast.",
          },
          {
            name: "Gluten-Free Breakfast",
            price: "£8.95",
            description:
              "2 gluten-free sausages, 1 bacon, 1 egg, 1 hash brown, mushrooms, tomatoes, beans and gluten-free toast.",
          },
        ],
      },
      {
        title: "Breakfast Extras",
        note: "£1.00 each",
        items: [
          {
            name: "Bacon, Sausage, Lorne Sausage, Hash Brown, Egg, Black Pudding, Haggis, Mushrooms, Beans, Tomatoes or Cheese",
            price: "£1.00",
          },
        ],
      },
      {
        title: "Barms, Muffins & Toast",
        items: [
          {
            name: "Cafe 25 Special",
            price: "£5.95",
            description:
              "Large barm, bacon, sausage, hash brown and fried egg.",
          },
          {
            name: "The Specialty Barm",
            price: "£5.25",
            description: "Sausage and onion, or bacon and cheese.",
          },
          {
            name: "The Morning Glory Muffin",
            price: "£5.50",
            description:
              "English muffin, bacon, Lorne sausage, hash brown, egg and cheese.",
          },
          {
            name: "The Vegan Barm",
            price: "£5.25",
            description:
              "Barm with vegetarian sausage, tomato and mushroom.",
          },
          {
            name: "Bacon, Sausage or Lorne Sausage Barm",
            price: "£4.50",
          },
          { name: "Egg Barm", price: "£3.95" },
          {
            name: "Bacon & Egg or Sausage & Egg Barm",
            price: "£5.25",
          },
          {
            name: "Poached Eggs (3) or Scrambled Eggs on Toast",
            price: "£5.50",
          },
          {
            name: "Cheese on Toast (2) or Beans on Toast (2)",
            price: "£5.50",
          },
        ],
      },
    ],
  },

  {
    id: "lunch",
    name: "Lunch",
    groups: [
      {
        title: "Sandwiches",
        note: "Choice of fresh salad available.",
        items: [
          {
            name: "Cheese",
            price: "£4.95",
            description: "Mature Cheddar cheese.",
          },
          {
            name: "Ham & Cheese",
            price: "£5.50",
            description: "Ham with mature Cheddar.",
          },
          {
            name: "Tuna Mayo",
            price: "£5.50",
            description: "Tuna bound in creamy mayonnaise.",
          },
          {
            name: "Chicken Mayo",
            price: "£5.95",
            description: "Tender chicken in mayonnaise.",
          },
          {
            name: "Egg Mayo",
            price: "£4.95",
            description: "Classic egg mayonnaise filling.",
          },
          {
            name: "Coronation Chicken",
            price: "£5.95",
            description: "Chicken with lightly spiced mayonnaise.",
          },
          {
            name: "BLT",
            price: "£5.95",
            description: "Bacon, lettuce and tomato.",
          },
        ],
      },
      {
        title: "Toasties",
        note: "Choice of fresh salad available.",
        items: [
          {
            name: "Cheese Toastie",
            price: "£5.50",
            description: "Melted mature Cheddar.",
          },
          {
            name: "Ham & Cheese Toastie",
            price: "£5.95",
            description: "Ham with melted Cheddar.",
          },
          {
            name: "Tuna Melt Toastie",
            price: "£5.95",
            description: "Tuna mayo with melted cheese.",
          },
          {
            name: "Chicken Mayo Toastie",
            price: "£6.50",
            description: "Chicken mayonnaise and cheese.",
          },
          {
            name: "Coronation Chicken Toastie",
            price: "£6.50",
            description: "Spiced chicken mayonnaise with cheese.",
          },
          {
            name: "BLT Toastie",
            price: "£6.50",
            description: "Bacon, lettuce and tomato.",
          },
        ],
      },
      {
        title: "Soup Station",
        note: "Served with crusty bread and butter.",
        items: [
          {
            name: "Lentil — Daal",
            price: "£4.95",
            description: "Traditional spiced lentil soup.",
          },
          {
            name: "Cream of Mushroom",
            price: "£4.95",
            description: "Rich and creamy mushroom soup.",
          },
          {
            name: "Cream of Chicken",
            price: "£4.95",
            description: "Smooth chicken soup.",
          },
          {
            name: "Minestrone",
            price: "£4.95",
            description: "Italian vegetable soup.",
          },
          {
            name: "Chicken Broth",
            price: "£4.95",
            description: "Traditional Scottish broth.",
          },
          {
            name: "French Onion",
            price: "£4.95",
            description: "Caramelised onions in rich stock.",
          },
          {
            name: "Cream of Cauliflower",
            price: "£4.95",
            description: "Velvety cauliflower soup.",
          },
          {
            name: "Tomato Soup",
            price: "£4.95",
            description: "Classic creamy tomato soup.",
          },
        ],
      },
      {
        title: "Classic Mains",
        items: [
          {
            name: "Scampi & Chips",
            price: "£8.95",
            description: "Breaded scampi served with chips.",
          },
          {
            name: "Sausage, Egg & Chips",
            price: "£8.95",
            description:
              "Traditional British favourite served with chips and beans.",
          },
          {
            name: "Pie of the Day & Chips",
            price: "£9.95",
            description: "Served with peas and gravy.",
          },
          {
            name: "Omelette & Chips",
            price: "£8.95",
            description: "Three-egg omelette served with chips.",
          },
          {
            name: "Mac 'n' Cheese",
            price: "£8.95",
            description:
              "Creamy macaroni pasta baked in a rich cheese sauce.",
          },
          {
            name: "Beef Lasagne",
            price: "£9.95",
            description: "Homemade beef lasagne served with chips.",
          },
          {
            name: "Sausage & Mash",
            price: "£8.95",
            description:
              "Traditional sausages with creamy mashed potatoes, peas and onion gravy.",
          },
        ],
      },
      {
        title: "Fresh Salad Bowls",
        note:
          "Freshly prepared with mixed salad, boiled egg, herb croutons, crispy onions and dressing.",
        items: [
          {
            name: "Chicken, Tuna Mayo, Ham, Roast Beef, Halloumi or Cheddar Cheese Salad",
            price: "£7.95",
          },
        ],
      },
      {
        title: "Traditional Country Lunches",
        note:
          "Served with crusty tiger bread and butter, pork pie, Cheddar cheese, Branston pickle and pickled onions.",
        items: [
          { name: "The Ploughman's — Ham", price: "£8.95" },
          { name: "The Farmer's — Chicken", price: "£8.95" },
          { name: "The Countryside — Beef", price: "£8.95" },
        ],
      },
    ],
  },

  {
    id: "indian",
    name: "Indian",
    groups: [
      {
        title: "Indian Street Food",
        items: [
          {
            name: "Puri Bhaji",
            price: "£6.95",
            description:
              "Traditional fried puri bread served with spiced potato bhaji and pickle.",
          },
          {
            name: "Gorkha Omelette Roll",
            price: "£5.95",
            description:
              "Masala omelette rolled in a soft bread roll with onions, herbs and spices.",
          },
          {
            name: "Aloo Paratha",
            price: "£6.50",
            description:
              "Stuffed flatbread filled with spiced potato, served with yoghurt and pickle.",
          },
          {
            name: "Bombay Masala Cheese Melt",
            price: "£5.50",
            description:
              "Toasted bread topped with melted cheese, green chilli, onion and Bombay spices.",
          },
          {
            name: "Samosa Duo",
            price: "£4.50",
            description: "Two vegetable samosas served with chutney.",
          },
          {
            name: "Pakora & Onion Bhaji Basket — 6 pieces",
            price: "£5.50",
            description:
              "Vegetable pakoras and onion bhajis served with mint dip.",
          },
          {
            name: "Golden Mile Hash Brown Bowl",
            price: "£5.95",
            description:
              "Hash brown bites topped with cheese and bacon bits.",
          },
          {
            name: "Samosa Chaat",
            price: "£6.50",
            description:
              "Vegetable samosa topped with chickpeas, yoghurt, chutneys and spices.",
          },
          {
            name: "Chicken Pakora",
            price: "£6.95",
            description: "Crispy chicken pakora served with mint dip.",
          },
        ],
      },
      {
        title: "Curry House",
        note: "Served with basmati rice or chips.",
        items: [
          {
            name: "Butter Chicken",
            price: "£8.95",
            description: "Tender chicken in a rich buttery tomato sauce.",
          },
          {
            name: "Chicken Tikka Masala",
            price: "£8.95",
            description: "Chargrilled chicken in a creamy tomato curry.",
          },
          {
            name: "Chicken Jalfrezi",
            price: "£8.95",
            description: "Chicken with peppers, onions and green chillies.",
          },
          {
            name: "Chicken Balti",
            price: "£8.95",
            description: "Traditional Balti curry with aromatic spices.",
          },
          {
            name: "Beef Madras",
            price: "£9.50",
            description:
              "Tender beef cooked in a classic spicy Madras sauce.",
          },
          {
            name: "Vegetable Curry",
            price: "£7.95",
            description: "Seasonal vegetables in a fragrant curry sauce.",
          },
          {
            name: "Lentil Curry — Daal",
            price: "£7.50",
            description:
              "Slow-cooked lentils with herbs and warming spices.",
          },
        ],
      },
      {
        title: "Biryani Specials",
        items: [
          {
            name: "Chicken Biryani",
            price: "£9.95",
            description:
              "Fragrant basmati rice with chicken, herbs and spices, served with cooling raita.",
          },
          {
            name: "Lamb Biryani",
            price: "£10.95",
            description:
              "Tender lamb layered with aromatic basmati rice and spices, served with cooling raita.",
          },
        ],
      },
      {
        title: "Indian Extras",
        note: "Mango chutney is complimentary with curry and biryani dishes.",
        items: [
          { name: "Poppadoms", price: "£1.00" },
          { name: "Garlic Naan", price: "£2.00" },
        ],
      },
    ],
  },

  {
    id: "burgers",
    name: "Burgers & Wraps",
    groups: [
      {
        title: "Burgers",
        note:
          "Served in a toasted bun with mixed salad and burger sauce.",
        items: [
          {
            name: "Classic Beef Burger",
            options: ["Single £5.50", "Double £6.95"],
          },
          {
            name: "Cheeseburger",
            options: ["Single £5.50", "Double £6.95"],
          },
          {
            name: "Chicken Burger",
            options: ["Single £5.50", "Double £6.95"],
          },
          {
            name: "Spicy Chicken Burger",
            options: ["Single £5.95", "Double £7.50"],
          },
          {
            name: "Halloumi Burger (V)",
            price: "£7.50",
            description: "Grilled halloumi, mixed salad and burger sauce.",
          },
          {
            name: "Cafe 25 Biggy",
            price: "£7.95",
            description:
              "Two beef burger patties, cheese, bacon, mixed salad and burger sauce.",
          },
          {
            name: "Veggie Burger (V)",
            options: ["Single £5.25", "Double £6.50"],
          },
        ],
      },
      {
        title: "Burger Extras",
        items: [
          { name: "Cheese", price: "£1.00" },
          { name: "Bacon", price: "£1.00" },
          { name: "Fried Onions", price: "£1.00" },
          {
            name: "Make It a Meal — chips and canned drink",
            price: "+£3.50",
          },
        ],
      },
      {
        title: "Wraps",
        note: "Served with fresh mixed salad and your choice of sauce.",
        items: [
          {
            name: "Chicken Mayo Wrap",
            price: "£5.95",
            description: "Chicken mayonnaise and salad.",
          },
          {
            name: "Southern Fried Chicken Wrap",
            price: "£6.50",
            description: "Southern fried chicken strips and salad.",
          },
          {
            name: "Spicy Chicken Wrap",
            price: "£6.50",
            description: "Spicy chicken strips and salad.",
          },
          {
            name: "Chicken Tikka Wrap",
            price: "£6.95",
            description: "Chicken tikka, salad and mint mayonnaise.",
          },
          {
            name: "BBQ Chicken Wrap",
            price: "£6.95",
            description: "BBQ chicken, salad and cheese.",
          },
          {
            name: "Halloumi Wrap (V)",
            price: "£6.95",
            description: "Grilled halloumi with fresh mixed salad.",
          },
          {
            name: "Tuna Mayo Wrap",
            price: "£5.95",
            description: "Tuna mayonnaise and salad.",
          },
          {
            name: "Ham Salad Wrap",
            price: "£5.95",
            description: "Ham, salad and mayonnaise.",
          },
          {
            name: "Cheese Salad Wrap (V)",
            price: "£5.50",
            description: "Cheddar cheese and fresh mixed salad.",
          },
        ],
      },
      {
        title: "Wrap Extras",
        items: [
          { name: "Cheese", price: "£1.00" },
          { name: "Bacon", price: "£1.00" },
          {
            name: "Make It a Meal — chips and canned drink",
            price: "+£3.50",
          },
        ],
      },
    ],
  },

  {
    id: "snacks",
    name: "Snacks & Sides",
    groups: [
      {
        title: "Large Seaside Crumpets",
        items: [
          { name: "Buttered", price: "£4.95" },
          { name: "With Melted Cheese", price: "£5.50" },
          { name: "With Cheese & Bacon", price: "£7.95" },
        ],
      },
      {
        title: "Warm Stuffed Croissants",
        items: [
          {
            name: "Warm Stuffed Croissants — 2",
            price: "£7.95",
            description: "Filled with bacon and melted cheese.",
          },
        ],
      },
      {
        title: "Loaded Fries",
        items: [
          {
            name: "Chicken Tikka Loaded Fries",
            price: "£7.95",
            description:
              "Fries topped with chicken tikka, cheese sauce and spring onions.",
          },
          {
            name: "Mild Beef Chilli Loaded Fries",
            price: "£7.95",
            description:
              "Fries with mild beef chilli, melted cheese and crispy onions.",
          },
          {
            name: "Cheesy Garlic Fries",
            price: "£6.50",
            description:
              "Fries tossed in garlic butter and topped with melted cheese.",
          },
          {
            name: "Loaded Bacon & Cheese Fries",
            price: "£6.95",
            description: "Fries with melted cheese and crispy bacon.",
          },
          {
            name: "Dirty Fries",
            price: "£7.50",
            description:
              "Loaded with cheese, bacon, crispy onions and house sauce.",
          },
        ],
      },
      {
        title: "Sides",
        items: [
          { name: "Chips", price: "£3.25" },
          { name: "Cheesy Chips", price: "£4.95" },
          { name: "Spicy Wedges", price: "£5.25" },
          { name: "Onion Rings", price: "£3.95" },
          { name: "Garlic Mushrooms", price: "£5.50" },
          { name: "Chicken Strips — 4 pieces", price: "£4.95" },
          { name: "Chicken Nuggets — 8 pieces", price: "£4.95" },
          { name: "Popcorn Chicken — 12 pieces", price: "£5.95" },
          { name: "Hot Wings — 8 pieces", price: "£5.95" },
        ],
      },
    ],
  },

  {
    id: "kids",
    name: "Basket Meals",
    groups: [
      {
        title: "Adult & Kids Basket Meals",
        note:
          "Includes chips and a drink. Adults: any can. Kids: Fruit Shoot.",
        items: [
          {
            name: "Chicken Strip Basket",
            options: ["Adult £8.50", "Kids £5.50"],
          },
          {
            name: "Chicken Nuggets Basket",
            options: ["Adult £8.00", "Kids £5.00"],
          },
          {
            name: "Chicken Popcorn Basket",
            options: ["Adult £8.50", "Kids £5.50"],
          },
          {
            name: "Halloumi Fries Basket (V)",
            options: ["Adult £8.50", "Kids £5.50"],
          },
          {
            name: "Fish Finger Basket",
            options: ["Adult £8.50", "Kids £5.50"],
          },
          {
            name: "Chicken Burger Meal",
            options: ["Adult £8.95", "Kids £5.95"],
          },
          {
            name: "Cheeseburger Meal",
            options: ["Adult £8.95", "Kids £5.95"],
          },
          {
            name: "Mozzarella Sticks Basket",
            options: ["Adult £7.95", "Kids £4.95"],
          },
        ],
      },
    ],
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCategory = menuCategories.find(
    (category) => category.id === activeCategory,
  );
const normalizedSearch = searchTerm.trim().toLowerCase();
const globalSearchResults = menuCategories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.items
      .filter((item) => {
        const searchableText = [
          category.name,
          group.title,
          item.name,
          item.description ?? "",
          item.price ?? "",
          ...(item.options ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      })
      .map((item) => ({
        ...item,
        categoryName: category.name,
        groupTitle: group.title,
      }))
  )
);
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        color: "#302016",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Navbar />

      <section
        style={{
          padding: "90px 6% 60px",
          textAlign: "center",
          background:
            "linear-gradient(rgba(25,15,9,0.72), rgba(25,15,9,0.82)), url('/Food%20Spread.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <p
          style={{
            color: "#f4b756",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontWeight: 700,
          }}
        >
          English • Indian • American
        </p>

        <h1
          style={{
            margin: "10px 0",
            fontSize: "clamp(48px, 8vw, 82px)",
          }}
        >
          Our Full Menu
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: 1.7,
          }}
        >
          Browse our complete food and drinks menu. All prices include VAT.
        </p>
      </section>

      <section
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "18px 4%",
          background: "#2b1d14",
          boxShadow: "0 6px 24px rgba(0,0,0,0.16)",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border:
                  activeCategory === category.id
                    ? "2px solid #f3b34f"
                    : "1px solid rgba(255,255,255,0.24)",
                background:
                  activeCategory === category.id ? "#f3b34f" : "transparent",
                color:
                  activeCategory === category.id ? "#2c1c12" : "white",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "70px 5% 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              margin: "0 0 38px",
              textAlign: "center",
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "#3b2517",
            }}
          >
          {normalizedSearch ? "Search Results" : selectedCategory?.name}
          </h2>
<input
  type="search"
  placeholder="Search drinks, breakfast, curry, burgers..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "15px 20px",
    borderRadius: "30px",
    border: "2px solid #d8b06a",
    fontSize: "16px",
    margin: "0 auto 40px",
    display: "block",
    outline: "none",
    background: "white",
    color: "#302016",
  }}
/>   
{searchTerm && (
  <button
    onClick={() => setSearchTerm("")}
    style={{
      display: "block",
      margin: "-25px auto 35px",
      border: "none",
      background: "transparent",
      color: "#ad681f",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: "15px",
    }}
  >
    Clear search
  </button>
)}
       <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "28px",
              alignItems: "start",
            }}
          >
  {(normalizedSearch
  ? menuCategories.flatMap((category) =>
      category.groups.map((group) => ({
        ...group,
        title: `${category.name} — ${group.title}`,
      }))
    )
  : (selectedCategory?.groups ?? [])
)
  .map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const searchableText = [
        item.name,
        item.description ?? "",
        item.price ?? "",
        ...(item.options ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm.toLowerCase().trim());
    }),
  }))
  .filter((group) => group.items.length > 0)
  .map((group) => (
              <article
                key={group.title}
                style={{
                  padding: "30px",
                  borderRadius: "22px",
                  background: "#fffdf7",
                  border: "2px solid #c89537",
                  boxShadow: "0 14px 42px rgba(78,51,25,0.10)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 12px",
                    paddingBottom: "14px",
                    borderBottom: "2px solid #d3a34c",
                    color: "#3a2417",
                    fontSize: "28px",
                  }}
                >
                  {group.title}
                </h3>

                {group.note && (
                  <p
                    style={{
                      margin: "0 0 20px",
                      color: "#78604c",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    {group.note}
                  </p>
                )}

                <div>
                  {group.items.map((item) => (
                    <div
                      key={`${group.title}-${item.name}`}
                      style={{
                        padding: "18px 0",
                        borderBottom: "1px dotted #ba914e",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: "18px",
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "19px",
                            lineHeight: 1.35,
                          }}
                        >
                          {item.name}
                        </h4>

                        {item.price && (
                          <strong
                            style={{
                              color: "#ad681f",
                              whiteSpace: "nowrap",
                              fontSize: "18px",
                            }}
                          >
                            {item.price}
                          </strong>
                        )}
                      </div>

                      {item.description && (
                        <p
                          style={{
                            margin: "8px 0 0",
                            color: "#746050",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      {item.options && (
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          {item.options.map((option) => (
                            <span
                              key={option}
                              style={{
                                padding: "7px 11px",
                                borderRadius: "999px",
                                background: "#f3e5c9",
                                color: "#603f24",
                                fontWeight: 700,
                                fontSize: "14px",
                              }}
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
{normalizedSearch &&
  globalSearchResults.length === 0 && (
    <p
      style={{
        textAlign: "center",
        fontSize: "18px",
        color: "#78604c",
        marginTop: "30px",
      }}
    >
      No matching menu items found.
    </p>
  )}
          <div
            style={{
              marginTop: "52px",
              padding: "26px",
              borderRadius: "18px",
              background: "#332217",
              color: "white",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Allergy information</h3>
            <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
              Please inform a member of staff about any allergies or dietary
              requirements before ordering. Menu items and availability may
              change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}