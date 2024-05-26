import validator from "@/helper/validate";
import { PrismaClient } from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { username, email, password } = body;

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email, // Fill in the email property with the desired value
      },
    });

    if (existingUser) {
      throw "Username already exists";
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password, // Replace with your password hashing logic
      },
    });

    return Response.json({
      message: "Signup successful",
      success: true,
      data: {
        userID: newUser.id,
      },
    });
  } catch (error: Error | any) {
    console.error("An error occurred in auth :", error.message);

    return Response.json({
      message: "something went wrong",
      success: false,
      data: error,
    });
  }
}

export async function GET(req: Request) {
  try {
    const searchParams = new URLSearchParams(req.url);
    const email: string | null = searchParams.get("email");
    const password: string | null = searchParams.get("password");

    const ValidatorRules = {
      email: "required|email",
      password: "required",
    };
    const { error, status } = await new Promise<{
      error: any;
      status: boolean;
    }>((resolve) => {
      validator({ email, password }, ValidatorRules, {}, (error, status) => {
        resolve({ error, status: !!status });
      });
    });

    if (!status) {
      return Response.json({
        message: "validation error",
        data: error ? error.errors : {},
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email ?? "",
      },
    });

    if (!user) {
      throw "Invalid username or password";
    }

    // Replace this with your actual password hashing and validation logic
    if (password !== user.password) {
      return { message: "Invalid username or password" };
    }

    // Successful login
    return Response.json({
      message: "Login successful",
      data: { userId: user.id },
      success: false,
    });
  } catch (error: Error | any) {
    // Return an error for unsupported request methods
    console.error(error);
    return {
      message: "something went wrong",
      success: false,
      data: error.message,
    };
  }
}
