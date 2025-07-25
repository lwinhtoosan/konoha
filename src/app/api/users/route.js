import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Choose your gender."),
  user_type: yup
    .string()
    .oneOf(["admin", "customer"], "Please enter Admin or Customer")
    .required("Choose your role."),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = await schema.validate(body, { abortEarly: false });
    const existingEmail = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          message: "This email already existed.",
        },
        {
          status: 409,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    console.log("error", error)
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.inner.map((e) => ({
            path: e.path,
            error: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
