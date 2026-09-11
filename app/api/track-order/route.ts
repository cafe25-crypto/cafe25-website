import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("order");

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Order number is required." },
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

    const safeOrder = order as {
      orderNumber?: string;
      createdAt?: string;
      updatedAt?: string;
      status?: string;
      orderType?: string;
      paymentMethod?: string;
      collectionTime?: string;
      total?: number;
      items?: {
        name: string;
        price: number;
        quantity: number;
      }[];
    };

    return NextResponse.json({
      order: {
        orderNumber: safeOrder.orderNumber,
        createdAt: safeOrder.createdAt,
        updatedAt: safeOrder.updatedAt,
        status: safeOrder.status,
        orderType: safeOrder.orderType,
        paymentMethod: safeOrder.paymentMethod,
        collectionTime: safeOrder.collectionTime,
        total: safeOrder.total,
        items: safeOrder.items || [],
      },
    });
  } catch (error) {
    console.error("Track order error:", error);

    return NextResponse.json(
      { error: "Unable to load order." },
      { status: 500 }
    );
  }
}