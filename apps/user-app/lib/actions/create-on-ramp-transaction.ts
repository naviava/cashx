"use server";

import prisma from "@cashx/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return { message: "User not found" };
  }

  const token = (Math.random() * 1000000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
      userId: Number(session.user.id),
      amount: amount * 100,
    },
  });

  return { message: "Transaction created successfully." };
}
