import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type OrderRequest = {
  items: OrderItem[];
  orderType: "collection" | "delivery";
  paymentMethod: "cash" | "card";
  customerName: string;
  customerPhone: string;
  collectionTime: string;
  addressLine1?: string;
  addressLine2?: string;
  postcode?: string;
  orderNote?: string;
  total: number;
};

function makeOrderNumber() {
  const now = Date.now().toString().slice(-6);
  return `C25-${now}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    if (!body.customerName?.trim()) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 }
      );
    }

    if (!body.customerPhone?.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (body.orderType === "delivery") {
      if (!body.addressLine1?.trim() || !body.postcode?.trim()) {
        return NextResponse.json(
          { error: "Delivery address and postcode are required." },
          { status: 400 }
        );
      }
    }

    const orderNumber = makeOrderNumber();
    const createdAt = new Date().toISOString();

    const order = {
      orderNumber,
      createdAt,
      status: "new",
      paymentStatus:
        body.paymentMethod === "cash" ? "payment_due" : "pending",
      ...body,
    };

    const store = getStore("cafe25-orders");

    await store.setJSON(orderNumber, order);

    return NextResponse.json({
      success: true,
      orderNumber,
      order,
    });
  } catch (error) {
    console.error("Order save error:", error);

    return NextResponse.json(
      { error: "Unable to save order." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const store = getStore("cafe25-orders");

    const { blobs } = await store.list();

    const orders = await Promise.all(
      blobs.map(async (blob) => {
        return await store.get(blob.key, { type: "json" });
      })
    );

    orders.sort((a: any, b: any) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Order list error:", error);

    return NextResponse.json(
      { error: "Unable to load orders." },
      { status: 500 }
    );
  }
}