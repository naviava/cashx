import express from "express";
import db from "@cashx/db/client";

const app = express();
app.use(express.json());

app.post("/hdfcbank", async (req, res) => {
  // TODO: Add zod validation.
  // TODO: Check if the request came from bank, use a webhook secret here.
  const paymentInfo = {
    token: req.body.token as string,
    userId: req.body.user_identifier,
    amount: Number(req.body.amount),
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: { userId: paymentInfo.userId },
        data: {
          amount: { increment: Number(paymentInfo.amount) },
        },
      }),
      db.onRampTransaction.update({
        where: { token: paymentInfo.token },
        data: { status: "Success" },
      }),
    ]);

    return res.status(200).json({
      message: "Captured transaction successfully.",
    });
  } catch (err) {
    console.error(err);
    await db.onRampTransaction.update({
      where: { token: paymentInfo.token },
      data: { status: "Failure" },
    });
    return res.status(411).json({
      message: "Failed to capture transaction.",
    });
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
