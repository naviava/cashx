"use server";

import prisma from "@cashx/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return { message: "Sender ID not found" };
  }

  const from = session.user.id;
  const toUser = await prisma.user.findUnique({
    where: { number: to },
  });
  if (!toUser) {
    return { message: "Receiver not found" };
  }

  await prisma.$transaction(async (db) => {
    await db.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = $1 FOR UPDATE`,
      [Number(from)];

    const fromBalance = await db.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance");
    }

    await db.balance.update({
      where: { userId: Number(from) },
      data: {
        amount: { decrement: amount },
      },
    });
    await db.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: { increment: amount },
      },
    });
    await db.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
