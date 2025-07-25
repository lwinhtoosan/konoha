import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;
    const books = await prisma.book.findMany({
      skip,
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        author: true,
        price: true,
        published_year: true,
        imageUrl: true,
        destribution: true,
      },
    });
    const totalCount = await prisma.book.count();
    return NextResponse.json({ books, totalCount });
  } catch (error) {
    console.log("DataFetchingError", error.name);
    return NextResponse.json(
      {
        message: "Data Fetching Error",
      },
      {
        status: 500,
      }
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
});
export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = await schema.validate(body, { abortEarly: false });
    const book = await prisma.book.create({
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
