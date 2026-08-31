import Stripe from "stripe";
import { NextResponse } from "next/server";

const MENU_PRICES: Record<string, number> = {
  "English Breakfast Tea": 2.0,
  "Flavoured Tea": 2.25,
  "Royal Karak Chai": 2.5,
  "Masala Tea": 2.75,
  "Large Mug Tea": 2.75,
  "Latte": 3.0,
  "Cappuccino": 3.0,
  "Flat White": 3.0,
  "Americano": 2.8,
  "Mocha": 3.25,
  "Instant Coffee": 2.5,
  "Hot Chocolate": 3.0,
  "Deluxe Hot Chocolate": 3.95,
  "Extra Shot": 0.6,
  "Whipped Cream": 0.6,
  "Mango Lassi": 3.5,

  "Iced Latte": 3.25,
  "Iced Mocha": 3.5,
  "Flavoured Iced Coffee": 3.5,

  "Full English Breakfast": 9.5,
  "Mini English Breakfast": 7.5,
  "Full Scottish Breakfast": 9.5,
  "Vegetarian Breakfast": 9.5,
  "Gluten-Free Breakfast": 8.95,

  "Cafe 25 Special": 5.95,
  "The Specialty Barm": 5.25,
  "The Morning Glory Muffin": 5.5,
  "The Vegan Barm": 5.25,
  "Bacon, Sausage or Lorne Sausage Barm": 4.5,
  "Egg Barm": 3.95,
  "Bacon & Egg or Sausage & Egg Barm": 5.25,
  "Poached Eggs (3) or Scrambled Eggs on Toast": 5.5,
  "Cheese on Toast (2) or Beans on Toast (2)": 5.5,

  "Cheese": 4.95,
  "Ham & Cheese": 5.5,
  "Tuna Mayo": 5.5,
  "Chicken Mayo": 5.95,
  "Egg Mayo": 4.95,
  "Coronation Chicken": 5.95,
  "BLT": 5.95,

  "Cheese Toastie": 5.5,
  "Ham & Cheese Toastie": 5.95,
  "Tuna Melt Toastie": 5.95,
  "Chicken Mayo Toastie": 6.5,
  "Coronation Chicken Toastie": 6.5,
  "BLT Toastie": 6.5,

  "Lentil - Daal": 4.95,
  "Cream of Mushroom": 4.95,
  "Cream of Chicken": 4.95,
  "Minestrone": 4.95,
  "Chicken Broth": 4.95,
  "French Onion": 4.95,
  "Cream of Cauliflower": 4.95,
  "Tomato Soup": 4.95,

  "Scampi & Chips": 8.95,
  "Sausage, Egg & Chips": 8.95,
  "Pie of the Day & Chips": 9.95,
  "Omelette & Chips": 8.95,
  "Mac 'n' Cheese": 8.95,
  "Beef Lasagne": 9.95,
  "Sausage & Mash": 8.95,

  "Puri Bhaji": 6.95,
  "Gorkha Omelette Roll": 5.95,
  "Aloo Paratha": 6.5,
  "Bombay Masala Cheese Melt": 5.5,
  "Samosa Duo": 4.5,
  "Pakora & Onion Bhaji Basket - 6 pieces": 5.5,
  "Golden Mile Hash Brown Bowl": 5.95,
  "Samosa Chaat": 6.5,
  "Chicken Pakora": 6.95,

  "Butter Chicken": 8.95,
  "Chicken Tikka Masala": 8.95,
  "Chicken Jalfrezi": 8.95,
  "Chicken Balti": 8.95,
  "Beef Madras": 9.5,
  "Vegetable Curry": 7.95,
  "Lentil Curry - Daal": 7.5,
  "Chicken Biryani": 9.95,
  "Lamb Biryani": 10.95,

  "Poppadoms": 1.0,
  "Garlic Naan": 2.0,

  "Halloumi Burger (V)": 7.5,
  "Cafe 25 Biggy": 7.95,

  "Chicken Mayo Wrap": 5.95,
  "Southern Fried Chicken Wrap": 6.5,
  "Spicy Chicken Wrap": 6.5,
  "Chicken Tikka Wrap": 6.95,
  "BBQ Chicken Wrap": 6.95,
  "Halloumi Wrap (V)": 6.95,
  "Tuna Mayo Wrap": 5.95,
  "Ham Salad Wrap": 5.95,
  "Cheese Salad Wrap (V)": 5.5,

  "Buttered": 4.95,
  "With Melted Cheese": 5.5,
  "With Cheese & Bacon": 7.95,
  "Warm Stuffed Croissants - 2": 7.95,

  "Chicken Tikka Loaded Fries": 7.95,
  "Mild Beef Chilli Loaded Fries": 7.95,
  "Cheesy Garlic Fries": 6.5,
  "Loaded Bacon & Cheese Fries": 6.95,
  "Dirty Fries": 7.5,

  "Chips": 3.25,
  "Cheesy Chips": 4.95,
  "Spicy Wedges": 5.25,
  "Onion Rings": 3.95,
  "Garlic Mushrooms": 5.5,
  "Chicken Strips - 4 pieces": 4.95,
  "Chicken Nuggets - 8 pieces": 4.95,
  "Popcorn Chicken - 12 pieces": 5.95,
  "Hot Wings - 8 pieces": 5.95,
};

type CheckoutItem = {
  name: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const body = await request.json();

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      body.items.map((item: CheckoutItem) => {
        const trustedPrice = MENU_PRICES[item.name];

        if (trustedPrice === undefined) {
          throw new Error(`Unknown menu item: ${item.name}`);
        }

        const quantity = Math.max(
          1,
          Math.min(20, Math.floor(Number(item.quantity) || 1))
        );

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(trustedPrice * 100),
          },
          quantity,
        };
      });

    const orderType =
      body.orderType === "delivery" ? "Delivery" : "Collection";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      customer_creation: "always",

      billing_address_collection: "auto",

      phone_number_collection: {
        enabled: true,
      },

      metadata: {
        orderType,
        customerName: String(body.customerName || "").slice(0, 200),
        customerPhone: String(body.customerPhone || "").slice(0, 100),
        collectionTime: String(body.collectionTime || "ASAP").slice(0, 100),
        addressLine1: String(body.addressLine1 || "").slice(0, 300),
        addressLine2: String(body.addressLine2 || "").slice(0, 300),
        postcode: String(body.postcode || "").slice(0, 30),
        orderNote: String(body.orderNote || "").slice(0, 400),
      },

      success_url:
  `${new URL(request.url).origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,

cancel_url:
  `${new URL(request.url).origin}/menu`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}