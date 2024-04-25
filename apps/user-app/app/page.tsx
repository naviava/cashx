"use client";

import { useBalance } from "@cashx/store/useBalance";

export default function Home() {
  const balance = useBalance();

  return <main className="text-2xl font-bold">User app: {balance}</main>;
}
