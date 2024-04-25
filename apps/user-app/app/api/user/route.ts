import { NextResponse } from "next/server";
import { PrismaClient } from "@cashx/db/client";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "asddsadas",
      name: "adsads",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
