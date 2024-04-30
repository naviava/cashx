"use client";
import { Button } from "@cashx/ui/button";
import { Card } from "@cashx/ui/card";
import { Center } from "@cashx/ui/center";
import { TextInput } from "@cashx/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "~/lib/actions/p2p-transfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(number, Number(amount) * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
