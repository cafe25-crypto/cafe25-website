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
    const staffPassword = process.env.STAFF_ORDER_PASSWORD;

  if (!staffPassword) {
    return NextResponse.json(
      { error: "Staff access is not configured." },
      { status: 500 }
    );
  }

  const headersList = await import("next/headers");
  const headers = await headersList.headers();
  const suppliedPassword = headers.get("x-staff-password");

  if (suppliedPassword !== staffPassword) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
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
export async function PATCH(request: Request) {
  try {
    const staffPassword = process.env.STAFF_ORDER_PASSWORD;
    const suppliedPassword = request.headers.get("x-staff-password");

    if (!staffPassword || suppliedPassword !== staffPassword) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderNumber, status } = body;

    const allowedStatuses = [
      "new",
      "accepted",
      "preparing",
      "ready",
      "out_for_delivery",
      "completed",
      "cancelled",
    ];

    if (!orderNumber || !status) {
      return NextResponse.json(
        { error: "Missing order number or status." },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 }
      );
    }

    const store = getStore("cafe25-orders");

    const order = await store.get(orderNumber, {
      type: "json",
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const updatedOrder = {
      ...(order as Record<string, unknown>),
      status,
      updatedAt: new Date().toISOString(),
    };

    await store.setJSON(orderNumber, updatedOrder);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Order status update error:", error);

    return NextResponse.json(
      { error: "Unable to update order status." },
      { status: 500 }
    );
  }
}