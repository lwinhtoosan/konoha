import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { items, amount } = await req.json();
    const orderData = await prisma.order.create({
      data: {
        userId: session.user?.id,
        amount: amount,
        orderItems: {
          create: items.map((item) => ({
            bookId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });
    return NextResponse.json(orderData, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
