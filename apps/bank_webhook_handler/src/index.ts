import express from "express";

const app = express();

app.post("/hdfcbank", (req, res) => {
  // TODO: Add zod validation
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // TODO: Update balance in database and add transaction.
});
