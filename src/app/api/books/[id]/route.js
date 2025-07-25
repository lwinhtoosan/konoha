import prisma from "@/app/lib/prisma";

import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(req, { params }) {
  try {
    const { id: bookId } = await params;
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      return NextResponse.json(
        {
          message: "This book not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(book);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      {
        message: "Server errror",
      },
      { status: 500 }
    );
  }
}

//Validation
const schema = yup.object().shape({
  title: yup.string().required("Book title is required."),
  author: yup.string().required("Author is required."),
  price: yup.number().required("Price is required."),
  published_year: yup.number().required("Published year is required."),
  destribution: yup.string().required("Destribution company is required."),
  inStock: yup.boolean(),
  imageUrl: yup.string().required("Image is required."),
});

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id: bookId } = await params;
    const validatedData = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const book = await prisma.book.update({
      where: { id: bookId },
      data: validatedData,
    });
    return NextResponse.json(book);
  } catch (error) {
    if (error.name === "ValidationError")
      return NextResponse.json(
        {
          message: "Validation error.",
          errors: error.inner.map((e) => ({
            path: e.path,
            error: e.message,
          })),
        },
        {
          status: 400,
        }
      );
  }
  return NextResponse.json(
    {
      message: "Internal server error.",
    },
    {
      status: 500,
    }
  );
}

export async function DELETE(req, { params }) {
  try {
    const { id: bookId } = await params;
    const book = await prisma.book.delete({
      where: { id: bookId },
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      {
        message: "This book not found or already deleted.",
      },
      {
        status: 404,
      }
    );
  }
}
