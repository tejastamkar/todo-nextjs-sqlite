// pages/api/users.ts
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {

    const body = req;
    console.log(body);
    
    // let users: any[] = <any[]>[];
    // if (id) {
    //   const users = await prisma.user.findUnique({
    //     where: {
    //       id,
    //     },
    //   });
    //   console.log(users);

    //   return NextResponse.json({ users });
    // } else {
      const users = await prisma.user.findMany();
      
      return NextResponse.json({ users });
    // }
  } catch (error) {
    console.error("An error occurred while fetching users:", error);
    return NextResponse.json({
      message: "something went wrong",
      data: error,
      success: false,
    });
  }
}
