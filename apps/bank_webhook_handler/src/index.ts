import express from "express";
import db from "@cashx/db/client";

const app = express();

app.post("/hdfcbank", async (req, res) => {
  // TODO: Add zod validation.
  // TODO: Check if the request came from bank, use a webhook secret here.
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: { userId: paymentInfo.userId },
        data: {
          amount: { increment: paymentInfo.amount },
        },
      }),
      db.onRampTransaction.update({
        where: { token: paymentInfo.token },
        data: { status: "Success" },
      }),
    ]);

    res.status(200).json({
      message: "Captured transaction successfully.",
    });
  } catch (err) {
    console.error(err);
    await db.onRampTransaction.update({
      where: { token: paymentInfo.token },
      data: { status: "Failure" },
    });
  }

  res.status(411).json({
    message: "Failed to capture transaction.",
  });
});
